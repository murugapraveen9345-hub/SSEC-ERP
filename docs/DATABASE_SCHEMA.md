# UniCore Enterprise ERP — Multi-Tenant Database Schema

## 1. Database Design Principles

UniCore uses PostgreSQL 16 with a **Hybrid Multi-Tenant Model**:
- **Shared Database, Shared Schema with Row-Level Security (RLS)** for Starter and Growth tiers.
- **Dedicated Schema / DB** for Enterprise tier colleges requesting private VPC isolation.
- Every table includes a `tenant_id UUID NOT NULL` indexed as the leading column in composite indexes.

---

## 2. Core Relational Schema

### 2.1 Tenants & Organizations
```sql
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subdomain VARCHAR(64) UNIQUE NOT NULL,
    custom_domain VARCHAR(255) UNIQUE,
    name VARCHAR(255) NOT NULL,
    logo_url TEXT,
    primary_color VARCHAR(16) DEFAULT '#6366f1',
    plan VARCHAR(32) DEFAULT 'ENTERPRISE', -- 'STARTER', 'GROWTH', 'ENTERPRISE'
    subscription_status VARCHAR(32) DEFAULT 'ACTIVE',
    storage_limit_gb INT DEFAULT 500,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2.2 User Directory & Authentication
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(32) NOT NULL, -- 'SUPER_ADMIN', 'ADMIN', 'FACULTY', 'STUDENT', 'PARENT'
    avatar_url TEXT,
    mfa_enabled BOOLEAN DEFAULT FALSE,
    mfa_secret VARCHAR(64),
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unique_tenant_email UNIQUE (tenant_id, email)
);

CREATE INDEX idx_users_tenant_role ON users (tenant_id, role);
```

### 2.3 Academic Programs & Departments
```sql
CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    code VARCHAR(16) NOT NULL,
    name VARCHAR(255) NOT NULL,
    hod_id UUID REFERENCES users(id),
    budget NUMERIC(12, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    dept_id UUID NOT NULL REFERENCES departments(id),
    code VARCHAR(32) NOT NULL,
    title VARCHAR(255) NOT NULL,
    credits INT NOT NULL DEFAULT 4,
    syllabus_url TEXT,
    semester INT NOT NULL
);
```

### 2.4 Students & Enrollments
```sql
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reg_number VARCHAR(64) NOT NULL,
    dept_id UUID NOT NULL REFERENCES departments(id),
    batch_year INT NOT NULL,
    cgpa NUMERIC(3, 2) DEFAULT 0.00,
    attendance_pct NUMERIC(5, 2) DEFAULT 0.00,
    dropout_risk_score NUMERIC(4, 3) DEFAULT 0.05, -- AI computed: 0.000 to 1.000
    dropout_risk_level VARCHAR(16) DEFAULT 'LOW',  -- 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'
    placement_status VARCHAR(32) DEFAULT 'UNPLACED',
    parent_id UUID REFERENCES users(id),
    CONSTRAINT unique_tenant_reg_num UNIQUE (tenant_id, reg_number)
);

CREATE INDEX idx_students_tenant_dropout ON students (tenant_id, dropout_risk_level);
```

### 2.5 Attendance (Partitioned by Month)
```sql
CREATE TABLE attendance_records (
    id UUID DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES courses(id),
    date DATE NOT NULL,
    slot INT NOT NULL,
    status VARCHAR(16) NOT NULL, -- 'PRESENT', 'ABSENT', 'LATE', 'ON_DUTY'
    verification_mode VARCHAR(32) DEFAULT 'BIOMETRIC', -- 'MANUAL', 'BIOMETRIC', 'FACE_AI'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    PRIMARY KEY (date, id, tenant_id)
) PARTITION BY RANGE (date);
```

### 2.6 Blockchain Verified Credentials
```sql
CREATE TABLE blockchain_certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id),
    cert_type VARCHAR(64) NOT NULL, -- 'DEGREE', 'PROVISIONAL', 'TRANSCRIPT'
    hash_sha256 VARCHAR(64) UNIQUE NOT NULL,
    token_id VARCHAR(64),
    transaction_hash VARCHAR(128),
    contract_address VARCHAR(64),
    network VARCHAR(32) DEFAULT 'POLYGON_MAINNET',
    ipfs_metadata_uri TEXT,
    qr_verify_url TEXT,
    minted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2.7 Workflow Automations (Rule Engine)
```sql
CREATE TABLE automation_workflows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    trigger_event VARCHAR(64) NOT NULL, -- 'ATTENDANCE_DROP', 'FEE_OVERDUE', 'LEAVE_SUBMITTED'
    conditions JSONB NOT NULL,          -- e.g. {"operator": "LT", "field": "attendance", "val": 75}
    actions JSONB NOT NULL,             -- e.g. [{"action": "SEND_SMS_PARENT"}, {"action": "ALERT_HOD"}]
    is_active BOOLEAN DEFAULT TRUE,
    runs_count INT DEFAULT 0,
    last_triggered_at TIMESTAMP WITH TIME ZONE
);
```

---

## 3. High-Performance Indexing & Partitioning

1. **Composite Tenant Indices**: Every query in UniCore filters by `tenant_id`. Indices are structured as `(tenant_id, foreign_key, status)`.
2. **Table Partitioning**: Large scale tables (`attendance_records`, `audit_logs`, `access_logs`) are partitioned by date range (monthly partitions) to allow seamless query pruning and fast archiving.
3. **GIN Indexing on JSONB**: Automations, custom fields, and AI metadata columns utilize PostgreSQL GIN indexes for JSON query execution under 2 milliseconds.
