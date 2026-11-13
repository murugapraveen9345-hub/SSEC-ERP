# UniCore ERP — Complete UI/UX Wireframes & Screen Layouts

This document presents the detailed UI wireframes, grid layouts, component breakdowns, and responsive mobile adaptations for the UniCore ERP system.

---

## 1. Global Layout Wireframe (Desktop)

```
+---------------------------------------------------------------------------------------------------+
|  [LOGO] UniCore ERP  |  [Campus: Main (Chennai) v]  |  [Q Search...]  |  [Role: Student v]  [*][O] |
+----------------------+----------------------------------------------------------------------------+
|                      |                                                                            |
|  OVERVIEW            |  PAGE HEADER: Breadcrumbs / Title / Quick Action CTA                       |
|  - Dashboard         |  ------------------------------------------------------------------------  |
|  - Notifications (3) |                                                                            |
|                      |  [ STAT CARD 1 ]     [ STAT CARD 2 ]     [ STAT CARD 3 ]    [ STAT CARD 4 ]|
|  ACADEMICS           |  Attendance: 82%     CGPA: 8.7/10        Pending: ₹15,000   Exams: 3       |
|  - Attendance        |                                                                            |
|  - Timetable         |  +-------------------------------------+  +-----------------------------+  |
|  - Exams & Results   |  | CHART: 6-Week Attendance Trend      |  | CIRCLE: Subject Progress    |  |
|                      |  | [=========== Line Chart ===========]|  | - DS: 82%                   |  |
|  SERVICES            |  |                                     |  | - Algo: 91%                 |  |
|  - Fees & Payments   |  |                                     |  | - Networks: 74% [ALERT]     |  |
|  - Leave & OD        |  +-------------------------------------+  +-----------------------------+  |
|  - Placements        |                                                                            |
|  - Events & Clubs    |  +-------------------------------------+  +-----------------------------+  |
|  - Documents         |  | UPCOMING EXAMS COUNTDOWN            |  | NOTIFICATION STREAM         |  |
|                      |  | - Data Structures (Hall-A)          |  | - Exam Schedule Live        |  |
|  ADMINISTRATION      |  | - Algorithms (Hall-B)               |  | - Hostel Fee Due Reminder   |  |
|  - Reports & Analyt. |  +-------------------------------------+  +-----------------------------+  |
|  - Audit Logs        |                                                                            |
|  - Settings          |                                                                            |
|                      |                                                                            |
|  ------------------  |                                                              [ AI BOT (v)] |
|  [USER AVATAR / EXIT]|                                                              [ FLOAT FAB ] |
+----------------------+----------------------------------------------------------------------------+
```

---

## 2. Mobile Responsive Layout Wireframe (<768px)

```
+------------------------------------+
| [=] UniCore    [Campus v]   [*][O] |
+------------------------------------+
| Search students, courses...        |
+------------------------------------+
| PAGE TITLE                         |
| [Stat 1: 82%]     [Stat 2: 8.7]    |
| [Stat 3: ₹15k]    [Stat 4: 3 Exm]  |
+------------------------------------+
| ATTENDANCE TREND CHART             |
| [ ~~~~~~~~~~~~~ Line Graph ~~~~~~ ]|
+------------------------------------+
| RECENT NOTICES & ALERTS            |
| - Low Attendance Warning (CN)      |
| - TCS Campus Drive Open            |
+------------------------------------+
|                                    |
|                      [AI BOT FAB]  |
+------------------------------------+
| [Home]  [Attend]  [Exams]  [More]  |  <--- BottomNav (Fixed Mobile Bar)
+------------------------------------+
```

---

## 3. Module Wireframe: Attendance & Biometric/Face Check-in

```
+---------------------------------------------------------------------------------------------------+
| Attendance Management                      [ Send Low-Attendance Warnings ]  [ Export Report (CSV)]|
+---------------------------------------------------------------------------------------------------+
| [ 📊 Overview ]       [ ✅ Mark Attendance ]       [ 📷 Biometric & Face Check-in ]   [ 📅 Weekly ] |
+---------------------------------------------------------------------------------------------------+
|                                                                                                   |
|  +---------------------------------------------+   +-------------------------------------------+  |
|  | 👆 BIOMETRIC FINGERPRINT GATEWAY            |   | 📷 AI OPTICAL FACIAL RECOGNITION          |  |
|  | Status: ● Hardware Gateway Online           |   | Status: ● Neural Vision Active            |  |
|  | Protocol: ZKTeco / Suprema Real-Time API    |   | Anti-Spoofing: Infrared Liveness Check    |  |
|  |                                             |   |                                           |  |
|  | [ Simulate Sensor Scan Button ]             |   | [ Simulate Face Verification Button ]     |  |
|  +---------------------------------------------+   +-------------------------------------------+  |
|                                                                                                   |
|  +---------------------------------------------------------------------------------------------+  |
|  | ✅ ACCESS AUTHORIZED: Attendance Marked Present!                                             |  |
|  | Student: Arjun Sharma (CS2022001) at 10:42:15 AM (Door Gateway #04 - CS Lab 1)             |  |
|  +---------------------------------------------------------------------------------------------+  |
|                                                                                                   |
+---------------------------------------------------------------------------------------------------+
```

---

## 4. Module Wireframe: Heuristic AI Timetable Generator

```
+---------------------------------------------------------------------------------------------------+
| Timetable Management                                  [ 🤖 AI Auto-Schedule ]    [ Export PDF ]   |
+---------------------------------------------------------------------------------------------------+
| [ 📅 Day View ]   [ 🗓️ Week View ]                                                                |
| [ Mon ]  [ Tue ]  [ Wed ]  [ Thu ]  [ Fri ]                                                       |
+---------------------------------------------------------------------------------------------------+
|                                                                                                   |
|  MODAL: AI Timetable Optimization Engine                                                          |
|  +---------------------------------------------------------------------------------------------+  |
|  | Parameter Configuration:                                                                    |  |
|  | - Max Consecutive Lecture Periods: [ 2 Hours (Recommended) v ]                              |  |
|  | - Lab Session Block Length:        [ 2 Hours (Continuous) v ]                               |  |
|  | - [x] Prioritize Morning Core Lectures                                                      |  |
|  | - [x] Conflict-Free Constraint Check: 0 room clashes, 0 faculty double-bookings             |  |
|  |                                                                                             |  |
|  | [ 🚀 RUN AI SCHEDULER SOLVER (Genetic Heuristic Algorithm) ]                                |  |
|  +---------------------------------------------------------------------------------------------+  |
|                                                                                                   |
+---------------------------------------------------------------------------------------------------+
```

---

## 5. Module Wireframe: Multi-Language AI Chatbot Widget

```
+-------------------------------------------------------+
| 🤖 UniBot AI Assistant       [ EN ] [ தமிழ் ] [ हिंदी ] [X]|
| ● Multi-Language · NLP Ready                          |
+-------------------------------------------------------+
| Quick Prompts:                                        |
| [ 📊 My Attendance ]  [ 📅 Next Exam ]  [ 💰 Fee Due ] |
+-------------------------------------------------------+
| (Bot): 👋 Hi! I'm UniBot, your campus assistant.       |
|                                                       |
| (User): What is my attendance?                        |
|                                                       |
| (Bot): 📊 Overall attendance: 82%.                    |
| • Data Structures: 82.6%                              |
| • Algorithms: 90.9%                                   |
| • Computer Networks: 73.7% ⚠️ (Below 75% cutoff)      |
+-------------------------------------------------------+
| [Type in English, தமிழ், or हिंदी...]  [🎤] [ Send > ] |
+-------------------------------------------------------+
```
