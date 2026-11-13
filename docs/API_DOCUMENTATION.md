# UniCore Enterprise ERP — Full API & Microservices Documentation

## 1. Overview & Authentication
Base URL: `https://api.unicore.edu/api/v1` or `http://localhost:4000/api`
AI Microservice Base URL: `http://localhost:8000`

All protected requests require an Authorization header:
`Authorization: Bearer <jwt_access_token>`

Tenant Context Header (Multi-Tenant Routing):
`X-Tenant-ID: <tenant_uuid>` (e.g., `a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d`)

---

## 2. Authentication & Security API
### `POST /auth/login`
- **Request**:
  ```json
  {
    "email": "arjun@unicore.edu",
    "password": "studentpassword"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "token": "eyJhbGciOi...",
    "refreshToken": "dGhpcy1pcy1h...",
    "user": {
      "id": "USR-9481",
      "name": "Arjun Sharma",
      "email": "arjun@unicore.edu",
      "role": "STUDENT",
      "tenantId": "TENANT-001"
    }
  }
  ```

### `POST /auth/mfa/verify`
- **Request**: `{ "mfaCode": "582910", "sessionToken": "..." }`
- **Response**: `{ "verified": true, "accessToken": "..." }`

---

## 3. Academic & Student Management
### `GET /students`
Query Parameters: `?page=1&limit=20&dept=CSE&search=Sharma`
- **Response**: Array of students with CGPA, attendance %, and dropout risk tier.

### `GET /students/{id}/digital-pass`
- **Response**:
  ```json
  {
    "studentId": "CS22B042",
    "qrAntiScreenshotToken": "UNI-9841-SEC-391",
    "expiresInSeconds": 30,
    "nfcPayload": "04A1B2C3D4E5F6",
    "status": "ACTIVE"
  }
  ```

---

## 4. Attendance & IoT Edge Sync
### `POST /attendance/batch-sync`
Receives aggregated clock-ins from facial recognition cameras & RFID turnstiles.
- **Request**:
  ```json
  {
    "deviceId": "TURNSTILE-GATE-03",
    "timestamp": "2026-09-09T08:30:00Z",
    "records": [
      { "studentId": "CS22B042", "mode": "NFC_TAP", "status": "PRESENT" },
      { "studentId": "CS22B043", "mode": "FACE_AI", "status": "PRESENT" }
    ]
  }
  ```

---

## 5. AI Microservice API (`ai_service:8000`)
### `POST /predict/dropout`
- **Request**:
  ```json
  {
    "student_id": "CS22B042",
    "attendance_pct": 71.5,
    "cgpa": 6.8,
    "failed_subjects_count": 1,
    "fee_pending_days": 50,
    "lms_weekly_hours": 2.4
  }
  ```
- **Response**:
  ```json
  {
    "student_id": "CS22B042",
    "dropout_risk_score": 0.485,
    "risk_tier": "HIGH",
    "confidence": 0.94,
    "primary_factors": [
      "Sub-75% attendance (71.5%)",
      "1 active backlogs / arrear courses",
      "Fee clearance delay of 50 days"
    ],
    "recommended_interventions": [
      "Schedule 1:1 counselor session with Faculty Advisor",
      "Fast-track exam re-registration & revision planner"
    ]
  }
  ```

### `POST /grade/assignment`
- **Request**:
  ```json
  {
    "assignment_id": "ASG-CS701-01",
    "submission_text": "In distributed systems, the Raft consensus protocol achieves leader election via randomized election timers...",
    "rubric_keywords": ["consensus", "leader election", "heartbeat", "quorum", "log replication"]
  }
  ```
- **Response**:
  ```json
  {
    "assignment_id": "ASG-CS701-01",
    "predicted_score": 92.5,
    "max_score": 100.0,
    "rubric_breakdown": {
      "Conceptual Coverage": 50.0,
      "Technical Vocabulary": 22.5,
      "Logical Organization": 20.0
    },
    "plagiarism_similarity_pct": 3.4,
    "ai_feedback": "Strong conceptual coverage with clear articulation of Raft states."
  }
  ```

### `POST /analyze/resume`
- **Request**: `{ "resume_text": "...", "target_role": "Software Engineer" }`
- **Response**: `{ "ats_score": 85, "matched_skills": [...], "missing_skills": [...], "actionable_revisions": [...] }`

---

## 6. Blockchain Credential Minting & Verification
### `POST /blockchain/mint`
- **Request**:
  ```json
  {
    "studentId": "CS22B042",
    "degree": "B.Tech Computer Science",
    "cgpa": 8.92,
    "graduationYear": 2026
  }
  ```
- **Response**:
  ```json
  {
    "certId": "CERT-2026-CS-042",
    "polygonTxHash": "0x4a7f3c8d2e1b...",
    "ipfsMetadataUri": "ipfs://QmX9yZ2a3b4c5...",
    "publicVerificationUrl": "https://verify.unicore.edu/cert/CERT-2026-CS-042"
  }
  ```

---

## 7. Webhook Subscriptions (Third-Party Integrations)
Supported outgoing webhook event types:
- `student.enrolled`
- `attendance.critical_drop`
- `fee.payment_received`
- `grade.published`
- `automation.triggered`
