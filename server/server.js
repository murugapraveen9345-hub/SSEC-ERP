import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { verifyToken, requireRole } from './middleware/auth.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'unicore-super-secret-jwt-key-2026';

app.use(cors());
app.use(express.json());

// Mount Modular API Routes
app.use('/api/admin', adminRoutes);

// In-memory demo data store for standalone testing
const users = [
  { id: 'S001', email: 'arjun@unicore.edu', password: 'student123', name: 'Arjun Sharma', role: 'STUDENT', dept: 'CSE' },
  { id: 'F001', email: 'priya@unicore.edu', password: 'faculty123', name: 'Dr. Priya Lakshmi', role: 'FACULTY', dept: 'CSE' },
  { id: 'A001', email: 'admin@unicore.edu', password: 'admin123', name: 'Rajesh Kumar', role: 'ADMIN', dept: 'Admin' },
];

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', system: 'UniCore ERP API', timestamp: new Date().toISOString() });
});

// Authentication Endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials.' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  const { password: _, ...safeUser } = user;
  res.json({ success: true, token, user: safeUser });
});

// Current User Profile
app.get('/api/auth/me', verifyToken, (req, res) => {
  res.json({ success: true, user: req.user });
});

// AI Chatbot NLP Endpoint
app.post('/api/ai/chat', async (req, res) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ success: false, message: 'Query message is required.' });
  }

  const query = message.toLowerCase();
  let reply = "I'm your UniCore AI Campus Assistant. You can ask me about your current attendance, upcoming exams, fee balances, placement drives, or campus club activities!";

  if (query.includes('attendance')) {
    reply = "📊 **Attendance Summary**: Your current aggregate attendance is **82%**. Subjects: Data Structures (82.6%), Algorithms (90.9%), Database Systems (76.2%), Operating Systems (77.8%), Computer Networks (73.7%). ⚠️ Notice: Computer Networks is approaching the 75% minimum threshold.";
  } else if (query.includes('exam') || query.includes('test')) {
    reply = "📅 **Upcoming Examination**: Data Structures on **September 20, 2026** at 10:00 AM (Hall-A, 3 hours). Followed by Algorithms on Sep 22 and Database Systems on Sep 25.";
  } else if (query.includes('fee') || query.includes('pay')) {
    reply = "💰 **Fee Account**: Outstanding balance is **₹15,000** (Hostel: ₹6,000, Exam: ₹3,000, Library: ₹1,500). Due by October 15, 2026. Online UPI and Net Banking payments are enabled.";
  } else if (query.includes('placement') || query.includes('job') || query.includes('drive')) {
    reply = "🚀 **Placement Drives**: TCS Digital (Apply by Sep 25) and Google Cloud (Apply by Sep 30) are currently accepting applications. Your application to Cognizant has been selected for an offer!";
  } else if (query.includes('cgpa') || query.includes('grade')) {
    reply = "🎓 **Academic Standing**: Your cumulative CGPA is **8.7 / 10**. Highest grade secured this semester: A+ in Algorithms.";
  }

  res.json({ success: true, reply });
});

// Students List (Admin & Faculty)
app.get('/api/students', verifyToken, (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 'CS2022001', name: 'Arjun Sharma', dept: 'CSE', year: 3, cgpa: 8.7, attendance: 82 },
      { id: 'CS2022002', name: 'Ananya Krishnan', dept: 'CSE', year: 3, cgpa: 9.1, attendance: 91 },
      { id: 'CS2022003', name: 'Vikram Patel', dept: 'CSE', year: 3, cgpa: 7.8, attendance: 75 },
    ],
  });
});

// Start Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`UniCore ERP Backend running on port ${PORT}`);
  });
}

export default app;
