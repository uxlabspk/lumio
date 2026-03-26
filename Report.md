# School Management System Requirements

## Purpose

This document translates market research into a practical feature blueprint for building a modern School Management System (SMS). It is intended to guide product planning, MVP scoping, UX decisions, and technical architecture.

## Market Research Summary

Across leading school platforms such as PowerSchool, Blackbaud, FACTS, Gradelink, Fedena, and OpenEduCat, the market consistently expects an SMS to combine these domains in one platform:

- Student Information System (SIS)
- Academic operations and teacher workflows
- Admissions and enrollment management
- Parent/student communication and self-service portals
- Billing, payments, and financial operations
- Reporting, analytics, and compliance
- Security, auditability, and role-based access
- Integrations with external education and business tools

### 2026 Market Expectations

A competitive school management system should be:

- Mobile-first for parents, students, and teachers
- Real-time and notification-driven
- Automation-heavy for routine school operations
- Data-rich with dashboards and analytics
- Integration-ready with APIs and SSO
- Secure, privacy-aware, and audit-friendly
- Modular enough for both small schools and multi-campus institutions
- AI-ready for future assistant and productivity features

## Product Vision

Build a unified platform that helps a school manage its academic, administrative, financial, and communication workflows from one system.

## Target User Roles

The system should support these roles:

- Super Admin / System Owner
- School Admin / Registrar
- Principal / Head of School
- Admissions Officer
- Teacher
- Student
- Parent / Guardian
- Accountant / Finance Officer
- Librarian
- Transport Manager / Driver Coordinator
- Nurse / Medical Staff
- HR / Staff Manager

---

# Core Required Features

## 1. Authentication, Authorization, and Security

These are mandatory foundation features.

### Required

- Secure login and logout
- Role-based access control (RBAC)
- Fine-grained permissions by module and action
- Multi-user support with isolated permissions
- Password reset and account recovery
- Email/OTP-based verification
- Session management
- Audit logs for sensitive actions
- Activity history for admins
- Data backup and restore strategy
- Secure document access
- Privacy and consent controls

### Recommended Advanced

- Single sign-on (Google, Microsoft, SAML)
- Multi-factor authentication
- IP/device login monitoring
- Security alerts for suspicious activity
- Data retention policies

## 2. School Setup and Master Data

The platform should allow the school to configure its own structure.

### Required

- School profile setup
- Academic year / term / semester management
- Grade / class / section setup
- Subject and curriculum setup
- Campus / branch setup
- Staff role definitions
- School calendar configuration
- Working days / holiday configuration
- Timetable periods and bell schedule setup

### Recommended Advanced

- Multi-campus management from one dashboard
- District/network-level configuration
- Custom fields builder for school-specific data

## 3. Student Information System (SIS)

This is the heart of the platform.

### Required

- Student registration and admission records
- Unique student ID generation
- Student profile management
- Demographic data
- Parent/guardian details
- Emergency contact details
- Student documents and attachments
- Class/section assignment
- Enrollment status tracking
- Student transfer, withdrawal, graduation workflows
- Attendance profile
- Medical information (allergies, immunizations, conditions)
- Behavior/discipline records
- Transcript and academic history
- Student promotion history
- Student photo/profile media

### Recommended Advanced

- Household/family record linking
- Special education / IEP support
- Scholarship / sponsorship tracking
- Hostel/residence assignment
- Alumni conversion and records

## 4. Admissions and Enrollment Management

This is critical for private schools and growing institutions.

### Required

- Online admission inquiry form
- Application submission workflow
- Admission status pipeline
- Document collection and verification
- Entrance exam/interview scheduling
- Admission decision recording
- Enrollment confirmation flow
- Waitlist handling
- Automated reminders for incomplete applications
- Admissions dashboard and funnel reporting

### Recommended Advanced

- Lead nurturing / CRM features
- Self-scheduling for visits and interviews
- Offer letter generation
- E-signature support
- Registration fee collection during application

## 5. Attendance Management

A must-have for every school.

### Required

- Daily attendance
- Subject/class-wise attendance
- Attendance statuses (present, absent, late, excused)
- Teacher attendance entry
- Admin override/correction workflow
- Attendance reports by student/class/date range
- Parent notifications for absences or lateness
- Student attendance history view

### Recommended Advanced

- Biometric attendance integration
- RFID / QR attendance scanning
- Bus boarding attendance
- Geo-tagged attendance for remote programs
- Automated escalation for low attendance

## 6. Class Scheduling and Timetable

### Required

- Class timetable creation
- Teacher timetable creation
- Room assignment
- Subject-period allocation
- Conflict detection for teacher/classroom usage
- Student schedule view
- Teacher schedule view
- Calendar-based timetable publishing

### Recommended Advanced

- Auto timetable generation
- Substitute teacher scheduling
- Event/exam schedule conflict detection
- Multi-campus timetable logic

## 7. Teacher Gradebook and Assessment Management

### Required

- Assignment creation
- Homework and project tracking
- Quiz/test/exam score entry
- Grade calculation rules
- Weighted grading support
- Grade scales and grading schemes
- Report card generation
- Progress report generation
- Student performance history
- Teacher comments and feedback
- Publish/unpublish grades

### Recommended Advanced

- Standards-based grading
- Rubrics
- Question banks
- Online assessments
- Auto grading for objective questions
- Assessment analytics
- Competency/mastery tracking

## 8. Exams, Results, and Report Cards

### Required

- Exam planning and scheduling
- Exam type setup
- Marks entry
- Result publishing
- Report card templates
- Cumulative term/annual reports
- Rank, GPA, averages, and merit calculations
- Transcript generation

### Recommended Advanced

- Printable and branded report cards
- Recheck/regrade workflows
- Promotion recommendations
- Board exam integration/export

## 9. Parent Portal and Student Portal

Modern SMS products require self-service access.

### Required

- Parent dashboard
- Student dashboard
- Attendance view
- Grades and results view
- Class schedule view
- Homework and assignment view
- School notices and announcements
- Fee balance and payment history
- Downloadable report cards and documents
- Profile update requests
- Multi-child parent view

### Recommended Advanced

- Native mobile app
- Push notifications
- Parent-teacher meeting booking
- In-app chat or secure messaging
- Consent/form submission workflows

## 10. Communication and Notifications

Communication is one of the strongest market expectations.

### Required

- School-wide announcements
- Class/group messaging
- Email notifications
- SMS notifications
- In-app notifications
- Event reminders
- Attendance alerts
- Grade alerts
- Fee due reminders
- Admission reminders

### Recommended Advanced

- Message templates
- Two-way parent communication
- Broadcast segmentation by class/role/campus
- Voice call integration
- WhatsApp integration where regionally relevant

## 11. Fees, Billing, and Payments

Strongly expected in the market, especially for private schools.

### Required

- Fee structure setup
- Invoice generation
- Student fee ledger
- Discount/scholarship/concession handling
- Fine/penalty management
- Payment receipt generation
- Partial payment support
- Outstanding balance tracking
- Payment reports
- Parent payment history

### Recommended Advanced

- Online payment gateway integration
- Auto-pay and recurring billing
- Installment plans
- Refund workflows
- Financial aging reports
- Revenue dashboards
- Integration with accounting software

## 12. Staff Management

### Required

- Staff profile management
- Employment details
- Role and department assignment
- Staff attendance
- Staff timetable view
- Leave requests and approvals
- Document storage for staff records

### Recommended Advanced

- Payroll integration
- Performance review tracking
- Recruitment workflow
- Contract renewal reminders

## 13. Reporting and Analytics

Every serious school product needs reporting.

### Required

- Dashboard for admins
- Dashboard for principal/head of school
- Admissions reports
- Attendance reports
- Academic performance reports
- Fee collection reports
- Student demographic reports
- Staff reports
- Export to CSV/PDF/Excel

### Recommended Advanced

- Custom report builder
- Early-warning indicators for at-risk students
- Trend analysis across terms
- Enrollment forecasting
- Comparative campus/class analytics
- Executive KPI dashboard

## 14. Document Management

### Required

- Upload and store documents by student, staff, and admission application
- Download and preview documents
- Categorize documents
- Expiry/renewal reminders for required documents

### Recommended Advanced

- E-signature
- Version history
- Approval workflow for submitted documents

## 15. Compliance, Audit, and Data Governance

### Required

- Action audit trail
- Change history for important records
- Record export capability
- Consent and privacy handling
- Configurable retention considerations

### Recommended Advanced

- Government/state reporting templates
- Funding/compliance exports
- Region-specific policy packs

---

# Operational Modules Often Expected

These may be phase-2 modules depending on school type.

## 16. Library Management

### Required

- Book catalog
- Book issue/return workflow
- Fine tracking
- Member history

## 17. Transport Management

### Required

- Route setup
- Vehicle assignment
- Student transport assignment
- Driver/attendant records
- Transport fee tracking

### Recommended Advanced

- GPS/live route integration
- Stop arrival notifications
- Boarding attendance

## 18. Hostel / Boarding Management

### Required

- Room allocation
- Bed occupancy tracking
- Warden records
- Hostel fee handling

## 19. Cafeteria / Meal Management

### Required

- Meal plan setup
- Student meal records
- Billing linkage

## 20. Inventory / Assets

### Required

- Asset register
- Issue/return logs
- Category-based inventory

---

# Integration Requirements

A modern product should be integration-ready from the beginning.

## Required

- Email service integration
- SMS gateway integration
- Payment gateway integration
- File storage integration
- CSV import/export

## Recommended Advanced

- Google Workspace integration
- Microsoft 365 integration
- Single sign-on providers
- LMS integration
- Video conferencing integration
- API for third-party systems
- Webhooks for external automation
- Biometric device integration

---

# AI and Future-Ready Features

These are not MVP blockers, but the market is increasingly moving in this direction.

## Recommended

- AI assistant for admin data lookup
- AI-generated draft announcements/messages
- AI-supported report summaries
- AI-based risk alerts for attendance/performance issues
- AI question generation for assessments
- AI search across records and documents

## Important Guardrails

- Human review before sending or publishing AI-generated content
- Permission-aware data access
- Audit trail for AI actions
- Privacy-safe model usage

---

# Non-Functional Requirements

These are as important as feature modules.

## Required

- Responsive design across mobile, tablet, and desktop
- Fast page loads for common workflows
- Scalable architecture
- Reliable backups
- High availability approach
- Search across core records
- Accessible UI
- Localization/internationalization readiness
- Timezone and date-format support
- Clean role-based navigation

## Recommended Advanced

- Native mobile apps
- Offline-friendly flows for attendance/field work
- Multi-language UI
- White-labeling for different schools

---

# MVP Recommendation

To launch a strong first version, these modules should be prioritized first:

## Phase 1 MVP

- Authentication and role-based access
- School setup and academic structure
- Student information system
- Admissions and enrollment
- Attendance management
- Timetable and scheduling
- Teacher gradebook
- Exams and report cards
- Parent and student portals
- Communication and notifications
- Fees, billing, and payment basics
- Core dashboards and reporting

## Phase 2

- Staff management
- Document workflows
- Library
- Transport
- Mobile app enhancements
- Advanced analytics
- Integrations and SSO

## Phase 3

- Hostel/cafeteria/assets
- CRM/admissions automation
- AI assistant features
- Multi-campus enterprise features
- Deep compliance/export packs

---

# Suggested Module Breakdown for Development

A practical engineering breakdown could be:

1. Auth & Permissions
2. School Setup
3. Student Records
4. Admissions
5. Attendance
6. Academics & Timetable
7. Gradebook & Exams
8. Portals
9. Communications
10. Billing & Payments
11. Reports & Analytics
12. Staff Management
13. Documents
14. Library / Transport / Hostel / Cafeteria
15. Integrations & Platform Services

---

---

# Current Implementation Status - Lumio School Management System

## Technology Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript 5.x
- **Database**: PostgreSQL with Prisma ORM 6.19.2
- **Authentication**: NextAuth.js 4.24.13 with JWT strategy
- **UI Components**: React 19.2.3 with Radix UI primitives
- **Styling**: Tailwind CSS 4.x
- **Email**: Nodemailer 7.0.13
- **Password Hashing**: bcryptjs 3.0.3
- **Charts**: Recharts 3.8.0

## System Architecture Overview

Lumio is built as a modern, role-based school management system with the following architectural decisions:

### Core Design Principles

1. **Role-Based Access Control (RBAC)**: Every feature and route is protected by role-based permissions
2. **Server-Side Security**: Authentication verified via JWT tokens in middleware and API routes
3. **Type Safety**: Comprehensive TypeScript types and Prisma-generated types for database operations
4. **Component-Driven UI**: Reusable UI components with consistent design system
5. **Mobile-First Responsive Design**: All interfaces work seamlessly across devices

---

# System Flow Design

## 1. Authentication & Authorization Flow

### User Journey

```
┌─────────────┐
│   Visitor   │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│  /login Page    │ ◄── Demo accounts available (Admin, Teacher, Student)
└──────┬──────────┘
       │
       │ Enter credentials
       ▼
┌─────────────────────┐
│  POST /api/auth/    │
│  [...nextauth]      │ ◄── Credentials provider
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Verify against     │
│  Prisma User table  │ ◄── Check email, password hash, isActive flag
└──────┬──────────────┘
       │
       ├──── Invalid ──► Return null → Show error
       │
       ▼ Valid
┌─────────────────────┐
│  Create JWT Token   │ ◄── Includes: id, email, name, role, avatar
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Redirect to        │
│  /dashboard         │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Middleware Check   │ ◄── Validates token & role permissions
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Dashboard Layout   │ ◄── Loads sidebar, header, role-specific nav
└─────────────────────┘
```

### Password Reset Flow

```
┌──────────────┐
│  /forgot-    │
│  password    │
└──────┬───────┘
       │ Enter email
       ▼
┌──────────────────────┐
│ POST /api/auth/      │
│ forgot-password      │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Generate secure      │
│ reset token          │ ◄── crypto.randomBytes(32)
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Hash token (SHA256)  │
│ Store in DB with     │
│ 1-hour expiry        │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Send email via       │
│ Nodemailer OR        │
│ Console log if no    │
│ SMTP configured      │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ User clicks link:    │
│ /reset-password?     │
│ token=xxx            │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Validate token hash, │
│ expiry, usedAt=null  │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Update password      │
│ (bcrypt hash)        │
│ Mark token as used   │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ Redirect to /login   │
└──────────────────────┘
```

### Role Hierarchy & Permissions

**Defined Roles (Prisma Enum):**
- SUPER_ADMIN - Full system access
- SCHOOL_ADMIN - School-level administration
- PRINCIPAL - Academic leadership
- ADMISSIONS_OFFICER - Enrollment management
- TEACHER - Class management, grading, assignments
- STUDENT - View-only access to own data
- PARENT - Child's information access
- ACCOUNTANT - Financial operations
- LIBRARIAN - Library management
- TRANSPORT_MANAGER - Transport operations
- NURSE - Medical records
- HR_MANAGER - Staff management

**Dashboard Role Mapping:**
```typescript
ADMIN (SUPER_ADMIN, SCHOOL_ADMIN, PRINCIPAL, etc.)
TEACHER
STUDENT
```

**Access Control Matrix:**

| Feature | ADMIN | TEACHER | STUDENT |
|---------|-------|---------|---------|
| Overview Dashboard | ✅ | ✅ | ✅ |
| Enrollment Management | ✅ | ❌ | ❌ |
| Classes Management | ✅ | ❌ | ❌ |
| Teachers Management | ✅ | ❌ | ❌ |
| Students List | ❌ | ✅ | ❌ |
| Grade Entry | ❌ | ✅ | ❌ |
| Class Preparation | ❌ | ✅ | ❌ |
| Assignments (Create) | ❌ | ✅ | ❌ |
| Exams (Create) | ❌ | ✅ | ❌ |
| Attendance (Mark) | ❌ | ✅ | ❌ |
| Analytics | ❌ | ✅ | ❌ |
| Reports | ❌ | ✅ | ❌ |
| My Classes | ❌ | ❌ | ✅ |
| My Grades | ❌ | ❌ | ✅ |
| My Enrollment | ❌ | ❌ | ✅ |
| My Assignments | ❌ | ❌ | ✅ |
| Schedule | ✅ | ✅ | ✅ |
| Messages | ✅ | ✅ | ✅ |
| News/Activities | ✅ | ✅ | ✅ |

### Middleware Protection Flow

```
Every Request to /dashboard/*
        │
        ▼
┌──────────────────┐
│ Get JWT Token    │
│ from cookie      │
└──────┬───────────┘
       │
       ├──── No Token ──► Redirect to /login
       │                  (with callbackUrl)
       ▼ Has Token
┌──────────────────┐
│ Extract role     │
│ from token       │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ canAccessDashboar│
│ dPath(role, path)│
└──────┬───────────┘
       │
       ├──── Denied ──► Redirect to /dashboard
       │                (safe default page)
       ▼ Allowed
       │
       ▼
┌──────────────────┐
│ Proceed to page  │
│ Load data        │
└──────────────────┘
```

---

## 2. Database Schema & Relationships

### Core Entity Relationship Diagram

```
User (1) ──┬── (1) Teacher ──┬── (N) Schedule
           │                 ├── (N) Assignment
           │                 ├── (N) Exam
           │                 ├── (1) Class (as class teacher)
           │                 └── (N) Attendance (recorded by)
           │
           ├── (1) Student ──┬── (N) Attendance
           │                 ├── (N) Submission
           │                 ├── (N) ExamResult
           │                 ├── (N) Document
           │                 └── (N) Invoice
           │
           ├── (1) Parent ───┴── (N) Student
           │
           └── (1) Staff ────┬── (N) LeaveRequest
                             │
                             └── (N) AttendanceRecords

AcademicYear (1) ──┬── (N) Term
                   ├── (N) Class
                   └── (N) Exam

Grade (1) ──┬── (N) Class
            ├── (N) Subject
            └── (N) FeeStructure

Class (1) ──┬── (N) Student
            ├── (N) Schedule
            ├── (N) Attendance
            └── (N) Exam

Subject (1) ──┬── (N) Schedule
              ├── (N) Assignment
              ├── (N) Exam
              └── (N) StudentGrade

Assignment (1) ── (N) Submission

Exam (1) ──┬── (N) ExamResult
           └── (N) Class

FeeStructure (1) ── (N) Invoice ── (N) Payment
```

### Key Business Logic Encoded in Schema

**Enums for Data Integrity:**
- `Role`: 12 distinct user roles
- `Gender`: MALE, FEMALE, OTHER
- `StudentStatus`: ACTIVE, INACTIVE, TRANSFERRED, GRADUATED, WITHDRAWN
- `AttendanceStatus`: PRESENT, ABSENT, LATE, EXCUSED
- `AssignmentStatus`: DRAFT, ACTIVE, CLOSED
- `SubmissionStatus`: NOT_SUBMITTED, NOT_CHECKED, SUBMITTED, GRADED, RETURNED
- `ExamStatus`: SCHEDULED, CONFIRMED, ONGOING, COMPLETED, CANCELLED
- `ExamType`: QUIZ, TEST, MIDTERM, FINAL, REGULAR
- `FeeFrequency`: MONTHLY, QUARTERLY, ANNUALLY, ONE_TIME
- `InvoiceStatus`: PENDING, PARTIAL, PAID, OVERDUE, CANCELLED
- `PaymentMethod`: CASH, BANK_TRANSFER, ONLINE, CHEQUE
- `NotificationType`: ATTENDANCE, GRADE, ASSIGNMENT, EXAM, FEE, GENERAL, MESSAGE
- `LeaveStatus`: PENDING, APPROVED, REJECTED

**Unique Constraints:**
- User.email
- Teacher.userId, Teacher.employeeId
- Student.userId, Student.studentId
- Parent.userId
- Staff.userId, Staff.employeeId
- Submission (assignmentId + studentId)
- ExamResult (examId + studentId)
- StudentGrade (studentId + subjectId + termId)
- Attendance (studentId + classId + date)

**Indexes for Performance:**
- PasswordResetToken: userId, expiresAt
- All foreign key relationships

---

## 3. Module-by-Module Implementation Flow

### A. School Setup Module

**Current Status**: Schema ready, UI pending

**Required Implementation:**
```
1. School Profile Setup
   └─ Create/Edit school details
   └─ Upload logo
   └─ Configure timezone, currency

2. Academic Year Management
   └─ Create academic year (start/end dates)
   └─ Set current active year
   └─ Link terms/semesters

3. Grade/Class Structure
   └─ Define grades (K-12, etc.)
   └─ Create sections per grade
   └─ Assign capacity, room numbers

4. Subject Catalog
   └─ Create subjects per grade
   └─ Assign codes, descriptions
   └─ Color coding for visual organization

5. Calendar Configuration
   └─ Define term dates
   └─ Set holidays
   └─ Configure working days
```

### B. Student Information System (SIS)

**Current Status**: Schema complete, UI needs implementation

**Data Flow:**
```
Admission Request
      │
      ▼
Create User Account
(Role = STUDENT)
      │
      ▼
Create Student Record
      ├─ Generate studentId
      ├─ Link to User
      ├─ Add demographic data
      ├─ Upload documents
      └─ Assign parent
      │
      ▼
Enroll in Class
      ├─ Select academic year
      ├─ Assign grade/section
      └─ Update class.students
      │
      ▼
Active Student
      ├─ Can access portal
      ├─ Appears in attendance
      └─ Linked to invoices
```

**Key Features to Implement:**
- Student registration form
- Document upload/management
- Parent linking
- Class assignment
- Transfer/withdrawal workflows
- Medical notes tracking
- Photo/avatar upload

### C. Teacher Management

**Current Status**: Schema complete, basic UI exists

**Workflow:**
```
Hire Teacher
      │
      ▼
Create User Account
(Role = TEACHER)
      │
      ▼
Create Teacher Record
      ├─ Generate employeeId
      ├─ Link to User
      ├─ Set department, qualification
      └─ Define specialization
      │
      ▼
Assign Responsibilities
      ├─ Link as class teacher
      ├─ Assign subjects to teach
      ├─ Create schedule entries
      └─ Grant access to classes
      │
      ▼
Teacher Dashboard Active
      ├─ Can mark attendance
      ├─ Can create assignments
      ├─ Can enter grades
      └─ Can view analytics
```

### D. Attendance Management

**Current Status**: Schema complete, needs full UI

**Teacher Flow:**
```
Navigate to /dashboard/attendance
      │
      ▼
Select Class & Date
      │
      ▼
Load Student List
(from class.students)
      │
      ▼
Mark Attendance
      ├─ PRESENT (default)
      ├─ ABSENT
      ├─ LATE
      └─ EXCUSED
      │
      ▼
Add Notes (optional)
      │
      ▼
Submit
      │
      ▼
Save to Attendance Table
      ├─ Unique constraint prevents duplicates
      ├─ Triggers notification creation
      └─ Updates daily statistics
      │
      ▼
Notifications Sent
      ├─ To parents (if absent)
      └─ To admin dashboard
```

**Student View:**
```
My Attendance Page
      │
      ▼
Calendar/List View
      ├─ Color-coded by status
      ├─ Shows attendance %
      └─ Filter by date range
```

### E. Assignment Management

**Current Status**: Schema complete, partial API exists

**Teacher Creates Assignment:**
```
/dashboard/assignments → Create New
      │
      ▼
Fill Form:
      ├─ Title (required)
      ├─ Description
      ├─ Subject (dropdown)
      ├─ Due Date
      ├─ Total Marks
      └─ Status (DRAFT/ACTIVE)
      │
      ▼
Submit
      │
      ▼
Saved to Assignment Table
      ├─ Links to subject
      ├─ Links to teacher
      └─ Creates empty submissions
          for each student in class
      │
      ▼
Students Notified
      └─ Notification created
```

**Student Submits Assignment:**
```
/dashboard/my-assignments
      │
      ▼
View Active Assignments
      ├─ Shows due date
      ├─ Shows submission status
      └─ Submit button (if not submitted)
      │
      ▼
Click Submit
      ├─ Upload file (PDF, DOC, etc.)
      └─ Add optional comment
      │
      ▼
POST /api/dashboard/assignments/
[assignmentId]/submit
      │
      ▼
Update Submission Record
      ├─ Set fileUrl
      ├─ Set submittedAt
      ├─ Change status to SUBMITTED
      └─ Notify teacher
```

**Teacher Grades Submission:**
```
Assignment Detail Page
      │
      ▼
View All Submissions
      ├─ Submitted count
      ├─ Pending count
      └─ List of students
      │
      ▼
Open Individual Submission
      ├─ Download/view file
      ├─ Enter marks
      ├─ Write feedback
      └─ Set status (GRADED/RETURNED)
      │
      ▼
Save
      ├─ Update submission.marks
      ├─ Update submission.feedback
      ├─ Update submission.status
      └─ Create grade notification
```

### F. Exam Management

**Current Status**: Schema complete, UI needed

**Exam Creation Flow:**
```
/dashboard/exams → Create Exam
      │
      ▼
Form Fields:
      ├─ Title
      ├─ Description
      ├─ Subject
      ├─ Class
      ├─ Academic Year
      ├─ Exam Date
      ├─ Start/End Time
      ├─ Venue
      ├─ Total Marks
      ├─ Passing Marks
      ├─ Type (QUIZ/TEST/MIDTERM/FINAL)
      └─ Status
      │
      ▼
Save Exam
      │
      ▼
Auto-create ExamResult records
for all students in class
      │
      ▼
Publish to Students/Parents
```

**Marks Entry Flow:**
```
Exam Results Page
      │
      ▼
Select Exam
      │
      ▼
Student List with Input Fields
      ├─ Marks obtained
      ├─ Grade (auto-calculated or manual)
      └─ Feedback
      │
      ▼
Bulk Save or Individual Save
      │
      ▼
Update ExamResult Records
      │
      ▼
Calculate Term Grades
      ├─ Aggregate by subject
      ├─ Apply weighting
      └─ Update StudentGrade table
```

### G. Fee & Billing Management

**Current Status**: Schema complete, UI not implemented

**Fee Structure Setup:**
```
Admin → Fee Management → Create Structure
      │
      ▼
Define:
      ├─ Name (e.g., "Tuition Fee - Grade 10")
      ├─ Amount
      ├─ Frequency (MONTHLY/QUARTERLY/ANNUALLY)
      ├─ Applicable Grade
      └─ Description
      │
      ▼
Save FeeStructure
```

**Invoice Generation:**
```
Generate Invoices (Batch Operation)
      │
      ▼
Select:
      ├─ Fee Structure
      ├─ Grade/Class
      ├─ Due Date
      └─ Academic Period
      │
      ▼
For Each Student:
      ├─ Create Invoice record
      ├─ Generate unique invoiceNumber
      ├─ Calculate total (amount - discount + fine)
      └─ Set status = PENDING
      │
      ▼
Send Notifications
      ├─ Email to parents
      └─ In-app notification
```

**Payment Processing:**
```
Parent Portal → My Invoices
      │
      ▼
View Outstanding Invoices
      │
      ▼
Pay Now Button
      │
      ▼
Payment Modal:
      ├─ Amount (pre-filled)
      ├─ Payment Method (CASH/ONLINE/CHEQUE)
      ├─ Transaction ID (for online)
      └─ Upload receipt (optional)
      │
      ▼
Process Payment
      ├─ Create Payment record
      ├─ Link to Invoice
      ├─ Update Invoice.status
      │   • FULL PAYMENT → PAID
      │   • PARTIAL → PARTIAL
      └─ Generate receipt PDF
```

### H. Communication & Notifications

**Current Status**: Schema exists, minimal implementation

**Notification System Architecture:**
```
Trigger Events:
├─ Attendance marked ABSENT
│   └─ Notify parent immediately
│
├─ Assignment graded
│   └─ Notify student
│
├─ Exam result published
│   └─ Notify student + parent
│
├─ Invoice due (3 days before)
│   └─ Notify parent
│
├─ New announcement
│   └─ Notify all users
│
└─ Message received
    └─ Notify recipient

Delivery Channels:
├─ In-app notifications (Notification table)
│   └─ Real-time badge counter
│
├─ Email (via Nodemailer)
│   └─ HTML templates
│
└─ SMS (future integration)
    └─ Twilio/AWS SNS
```

**Announcement System:**
```
Create Announcement
      │
      ▼
Fields:
      ├─ Title
      ├─ Content (rich text)
      ├─ Target Role (optional)
      ├─ Target Class (optional)
      ├─ Pin to top (boolean)
      └─ Publish immediately/schedule
      │
      ▼
Save Announcement
      │
      ▼
Visible on Dashboards
      ├─ Filtered by targetRole
      └─ Filtered by targetClass
```

### I. Reporting & Analytics

**Current Status**: Basic dashboard exists, advanced analytics needed

**Reports to Implement:**

1. **Attendance Reports**
   - Daily/weekly/monthly summaries
   - Student-wise attendance history
   - Class-wise comparison
   - Defaulters list

2. **Academic Performance Reports**
   - Grade distribution per subject
   - Top performers ranking
   - Failed/at-risk students list
   - Term-over-term comparison

3. **Fee Collection Reports**
   - Outstanding invoices aging
   - Payment collection summary
   - Defaulters list
   - Revenue forecasting

4. **Enrollment Reports**
   - Admission funnel metrics
   - Class-wise strength
   - Boy/girl ratio
   - New vs. returning students

5. **Teacher Workload Reports**
   - Classes assigned
   - Subjects taught
   - Average grading time
   - Attendance compliance

**Dashboard Widgets (Role-Based):**

**Admin Dashboard:**
- Total students, teachers, staff
- Today's attendance percentage
- Fee collection (this month)
- Recent admissions
- Upcoming events
- Alerts (low attendance, overdue fees)

**Teacher Dashboard:**
- My classes count
- Today's schedule
- Pending submissions to grade
- Recent student performance alerts
- Attendance compliance rate

**Student Dashboard:**
- My current GPA
- Recent grades
- Upcoming exams/assignments
- Attendance percentage
- Fee due status

---

## 4. API Architecture

### Implemented API Endpoints

```
Authentication:
  POST /api/auth/[...nextauth]        # Login/logout
  POST /api/auth/forgot-password      # Request reset
  POST /api/auth/reset-password       # Reset password

Dashboard APIs:
  GET  /api/dashboard/enrollment      # Get enrollment data
  POST /api/dashboard/enrollment      # Manage enrollment
  POST /api/dashboard/assignments/
         [assignmentId]/submit        # Submit assignment

Protected Routes:
  All /dashboard/* routes             # Middleware protected
```

### API Response Patterns

**Success Response:**
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "total": 10,
    "page": 1,
    "limit": 20
  }
}
```

**Error Response:**
```json
{
  "error": "Descriptive error message",
  "code": "SPECIFIC_ERROR_CODE"
}
```

**Validation Error:**
```json
{
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### API Security Best Practices

1. **Always verify session** at start of each route:
```typescript
const session = await getServerSession(authOptions);
if (!session?.user?.id) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
```

2. **Check role permissions** before sensitive operations:
```typescript
const dashboardRole = resolveDashboardRole(session.user.role);
if (dashboardRole !== "ADMIN") {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}
```

3. **Validate input data** using Zod or similar:
```typescript
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
```

4. **Use Prisma transactions** for multi-step operations:
```typescript
await prisma.$transaction(async (tx) => {
  // Multiple DB operations
  // All succeed or all rollback
});
```

5. **Implement rate limiting** for auth endpoints:
```typescript
// Use @prisma/client extensions or Redis
// Max 5 requests per minute per IP
```

---

## 5. Frontend Component Architecture

### Layout Hierarchy

```
app/layout.tsx (Root)
    │
    └─ providers (NextAuth SessionProvider)
    │
    └─ (auth)/layout.tsx
    │   └─ AuthShell (centered card)
    │       ├─ /login
    │       ├─ /forgot-password
    │       └─ /reset-password
    │
    └─ (dashboard)/layout.tsx
        ├─ Sidebar (collapsible navigation)
        ├─ Header (breadcrumbs, actions)
        └─ main (page content)
            ├─ /dashboard (Overview)
            ├─ /dashboard/classes
            ├─ /dashboard/students
            └─ ... all dashboard pages
```

### Component Library

**Core UI Components** (`src/components/ui/`):
- `button.tsx` - Button variants (default, outline, ghost, icon)
- `card.tsx` - Card containers
- `input.tsx` - Form inputs
- `avatar.tsx` - User avatars with fallbacks
- `badge.tsx` - Status badges
- Additional shadcn/ui components as needed

**Layout Components** (`src/components/layout/`):
- `sidebar.tsx` - Main navigation with role-based filtering
- `header.tsx` - Breadcrumbs, notifications, search

**Auth Components** (`src/components/auth/`):
- `auth-shell.tsx` - Wrapper for auth pages

### Page Structure Pattern

```typescript
// 1. Import dependencies
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

// 2. Server component (default)
export default async function PageName() {
  // 3. Get session
  const session = await getServerSession(authOptions);
  
  // 4. Optional: Fetch data server-side
  const data = await prisma.model.findMany({ /* ... */ });
  
  // 5. Render UI
  return (
    <div>
      <h1>Page Title</h1>
      {/* Content */}
    </div>
  );
}
```

### Client Component Pattern (for interactivity)

```typescript
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function InteractiveComponent() {
  const [loading, setLoading] = useState(false);
  
  async function handleSubmit() {
    setLoading(true);
    try {
      const res = await fetch("/api/endpoint", {
        method: "POST",
        body: JSON.stringify(data),
      });
      // Handle response
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <Button onClick={handleSubmit} disabled={loading}>
      {loading ? "Saving..." : "Save"}
    </Button>
  );
}
```

---

## 6. Development Workflow

### Environment Setup

**.env Requirements:**
```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/lumio"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Email (Optional for development)
SMTP_HOST="smtp.example.com"
SMTP_PORT=587
SMTP_USER="your-user"
SMTP_PASS="your-password"
EMAIL_FROM="Lumio <no-reply@example.com>"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Database Commands

```bash
# Generate Prisma Client
npm run db:generate

# Push schema changes to DB (development)
npm run db:push

# Create migration file
npm run db:migrate

# Seed database with demo data
npm run db:seed

# Open Prisma Studio (DB GUI)
npm run db:studio

# Reset database (WARNING: destroys data)
npm run db:reset
```

### Development Server

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Visit http://localhost:3000
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Type check (built into Next.js)
npm run build
```

---

## 7. Deployment Strategy

### Production Checklist

**Pre-Deployment:**
- [ ] Run `npm run build` locally (catches type errors)
- [ ] Test all critical flows with production-like data
- [ ] Set up production database (PostgreSQL 14+)
- [ ] Generate strong NEXTAUTH_SECRET
- [ ] Configure SMTP for emails
- [ ] Set appropriate log levels

**Environment Variables (Production):**
```bash
NODE_ENV=production
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=strong-random-secret
SMTP_HOST=...
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
EMAIL_FROM="Lumio <noreply@yourdomain.com>"
```

**Deployment Options:**

1. **Vercel (Recommended for simplicity)**
   ```bash
   vercel deploy --prod
   ```
   - Automatic CI/CD
   - Edge network
   - Serverless functions

2. **Docker Container**
   ```dockerfile
   FROM node:20-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build
   CMD ["npm", "start"]
   ```

3. **Traditional VPS**
   ```bash
   git clone repo
   npm install
   npm run build
   pm2 start npm --name "lumio" -- start
   ```

**Post-Deployment:**
- [ ] Run `npm run db:generate` on server
- [ ] Run migrations if any: `npm run db:migrate`
- [ ] Test login flow
- [ ] Test email delivery
- [ ] Monitor error logs
- [ ] Set up uptime monitoring

---

## 8. Security Considerations

### Implemented Security Measures

1. **Password Security**
   - bcrypt hashing (cost factor 12)
   - Minimum 8 characters
   - Requires uppercase, lowercase, number, special char

2. **Session Management**
   - JWT-based sessions
   - HTTP-only cookies
   - Automatic token refresh
   - Logout invalidates client session

3. **Input Validation**
   - Email format validation
   - Required field checks
   - Type coercion prevention

4. **Authorization**
   - Role-based middleware protection
   - Per-route permission checks
   - Principle of least privilege

5. **Database Security**
   - Parameterized queries (Prisma)
   - SQL injection prevention
   - Connection pooling

### Additional Security Recommendations

1. **Rate Limiting**
   - Implement on auth endpoints
   - Use Redis or in-memory store
   - Prevent brute force attacks

2. **CSRF Protection**
   - NextAuth provides built-in CSRF tokens
   - Ensure all forms include CSRF token

3. **XSS Prevention**
   - React escapes output by default
   - Avoid dangerouslySetInnerHTML
   - Sanitize rich text content

4. **Audit Logging**
   - Log all sensitive operations
   - Include userId, action, resource, timestamp
   - Retain logs for 1+ year

5. **Data Privacy**
   - Encrypt sensitive fields at rest
   - Implement data retention policies
   - Allow data export/deletion (GDPR)

6. **File Upload Security**
   - Validate file types (not just extensions)
   - Scan for malware
   - Store outside webroot
   - Use pre-signed URLs

---

## 9. Testing Strategy

### Recommended Test Coverage

**Unit Tests:**
- Utility functions (utils.ts)
- Password validation logic
- Role resolution functions
- Date formatting helpers

**Integration Tests:**
- Authentication flow
- API endpoint responses
- Database operations
- Email sending

**E2E Tests:**
- Complete user journeys
- Multi-step workflows
- Permission boundaries
- Mobile responsiveness

### Testing Tools Recommendation

```json
{
  "devDependencies": {
    "@testing-library/react": "^14.x",
    "@testing-library/jest-dom": "^6.x",
    "vitest": "^1.x",
    "@playwright/test": "^1.x",
    "msw": "^2.x" // API mocking
  }
}
```

### Sample Test Structure

```typescript
// __tests__/auth.test.ts
import { render, screen } from '@testing-library/react'
import LoginPage from '@/app/(auth)/login/page'

describe('Login Page', () => {
  it('renders login form', () => {
    render(<LoginPage />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('shows error for invalid credentials', async () => {
    // Mock API response
    render(<LoginPage />)
    // Simulate login attempt
    // Assert error message appears
  })
})
```

---

## 10. Future Enhancements (AI & Advanced Features)

### AI-Powered Features (Phase 3+)

1. **Intelligent Assistant**
   - Natural language queries: "Show me all students with < 75% attendance"
   - Automated report generation
   - Smart suggestions for at-risk students

2. **Automated Grading**
   - Objective question auto-grading
   - Plagiarism detection
   - Rubric-based scoring assistance

3. **Predictive Analytics**
   - Dropout risk prediction
   - Performance trend analysis
   - Resource optimization recommendations

4. **Smart Scheduling**
   - Auto-generate conflict-free timetables
   - Optimize room allocation
   - Substitute teacher matching

5. **Communication Automation**
   - AI-drafted announcements
   - Personalized parent messages
   - Chatbot for FAQ

### Mobile App Development

**React Native Approach:**
```typescript
// Share business logic with web
import { api } from '@/lib/api' // Shared

// Native mobile UI
import { View, Text, FlatList } from 'react-native'

export function MobileDashboard() {
  const { data } = useQuery(['stats'], fetchStats)
  return (
    <View>
      <Text>Today's Attendance: {data?.attendanceRate}%</Text>
    </View>
  )
}
```

**Progressive Web App (PWA):**
- Offline support with service workers
- Push notifications
- Home screen installation
- Camera integration for document upload

### Integration Roadmap

**Year 1 Integrations:**
- Google Workspace (SSO, Calendar sync)
- Microsoft 365 (Teams, Outlook)
- Payment gateways (Stripe, PayPal)
- SMS providers (Twilio)

**Year 2 Integrations:**
- Government reporting systems
- University application portals
- Library management systems
- Transportation GPS tracking

---

# Implementation Priority Matrix

## Phase 1: MVP (Months 1-3)

**Must Have:**
- ✅ Authentication & authorization (DONE)
- ✅ Database schema (DONE)
- ⏳ Student information system
- ⏳ Teacher management
- ⏳ Class/subject setup
- ⏳ Attendance marking
- ⏳ Basic gradebook
- ⏳ Parent/student portals
- ⏳ Notification system

## Phase 2: Core Features (Months 4-6)

**Should Have:**
- ⏳ Assignment management
- ⏳ Exam management
- ⏳ Fee billing & payments
- ⏳ Advanced reporting
- ⏳ Document management
- ⏳ Communication tools
- ⏳ Mobile responsiveness

## Phase 3: Advanced (Months 7-12)

**Nice to Have:**
- ⏳ Staff HR management
- ⏳ Library module
- ⏳ Transport management
- ⏳ Hostel/boarding
- ⏳ Advanced analytics
- ⏳ Third-party integrations
- ⏳ AI features

---

# Success Metrics

## Adoption Metrics
- Monthly active users (MAU)
- Daily active users (DAU)
- Session duration
- Feature usage frequency

## Performance Metrics
- Page load time (< 2s target)
- API response time (< 200ms p95)
- Uptime percentage (99.9% target)
- Error rate (< 0.1%)

## Business Metrics
- Schools onboarded
- Students managed
- Revenue growth
- Customer satisfaction (NPS)

---

# Conclusion

Lumio has a solid foundation with:
- ✅ Robust authentication system
- ✅ Well-designed database schema
- ✅ Role-based access control
- ✅ Modern tech stack
- ✅ Scalable architecture

**Next Steps:**
1. Complete core SIS features
2. Build teacher workflow tools
3. Launch parent/student portals
4. Iterate based on user feedback
5. Expand to advanced modules

The system is designed to grow from a single school pilot to a multi-campus enterprise platform while maintaining security, performance, and usability.

---

*Last Updated: March 26, 2026*
*Version: 1.0.0*
