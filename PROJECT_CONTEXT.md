# Lumio School Management System - Project Context

## 🎯 Current Implementation Status

**Phase 1 MVP**: Student Information System (SIS) - ✅ COMPLETE
- Student management with CRUD operations
- Student registration and enrollment
- Student detail views with tabs
- Role-based access control
- API endpoints for all operations

---

## 📁 Project Structure

```
lumio/
├── src/
│   ├── app/
│   │   ├── (auth)/                    # Authentication pages
│   │   │   ├── login/page.tsx        ✅ Complete
│   │   │   ├── forgot-password/page.tsx ✅ Complete
│   │   │   └── reset-password/page.tsx  ✅ Complete
│   │   ├── (dashboard)/               # Protected dashboard pages
│   │   │   ├── layout.tsx            ✅ Complete (Sidebar + Header)
│   │   │   ├── dashboard/
│   │   │   │   ├── page.tsx          ✅ Complete (Overview)
│   │   │   │   ├── students/         ✅ COMPLETE MODULE
│   │   │   │   │   ├── page.tsx      ✅ Student list + search
│   │   │   │   │   ├── add/page.tsx  ✅ Registration form
│   │   │   │   │   └── [id]/page.tsx ✅ Detail view with tabs
│   │   │   │   ├── teachers/         ✅ COMPLETE MODULE
│   │   │   │   │   ├── page.tsx      ✅ Teacher list + search
│   │   │   │   │   ├── add/page.tsx  ✅ Registration form
│   │   │   │   │   └── [id]/page.tsx ✅ Detail view with tabs
│   │   │   │   ├── attendance/       ⏳ Pending
│   │   │   │   ├── assignments/      ⏳ Pending
│   │   │   │   ├── exams/            ⏳ Pending
│   │   │   │   ├── classes/          ⏳ Pending
│   │   │   │   └── ...               ⏳ Other modules
│   │   └── api/
│   │       ├── auth/                 ✅ Complete (NextAuth)
│   │       └── dashboard/
│   │           ├── students/         ✅ COMPLETE
│   │           │   ├── route.ts      ✅ GET (list), POST (create)
│   │           │   ├── enroll/route.ts ✅ POST (enroll in class)
│   │           │   └── [id]/route.ts  ✅ GET (detail)
│   │           ├── teachers/         ✅ COMPLETE
│   │           │   ├── route.ts      ✅ GET (list), POST (create)
│   │           │   ├── assign/route.ts ✅ POST (assign to class)
│   │           │   └── [id]/route.ts  ✅ GET/PUT/DELETE
│   │           ├── attendance/       ⏳ Pending
│   │           └── ...               ⏳ Other modules
│   ├── components/
│   │   ├── ui/                       ✅ Base UI components
│   │   │   ├── button.tsx           ✅
│   │   │   ├── card.tsx             ✅
│   │   │   ├── input.tsx            ✅
│   │   │   ├── badge.tsx            ✅
│   │   │   ├── avatar.tsx           ✅
│   │   │   └── ...                  ✅
│   │   ├── layout/
│   │   │   ├── sidebar.tsx          ✅ Role-based navigation
│   │   │   └── header.tsx           ✅ Breadcrumbs + actions
│   │   └── auth/
│   │       └── auth-shell.tsx       ✅ Auth page wrapper
│   └── lib/
│       ├── auth.ts                  ✅ NextAuth configuration
│       ├── roles.ts                 ✅ RBAC logic
│       ├── prisma.ts                ✅ Database client
│       ├── password.ts              ✅ Password validation
│       └── utils.ts                 ✅ Utility functions
├── prisma/
│   ├── schema.prisma                ✅ Complete database schema
│   └── seed.ts                      ✅ Demo data seeder
├── middleware.ts                    ✅ Route protection
└── package.json                     ✅ Dependencies
```

---

## 🔐 Authentication & Authorization

### **Authentication Flow**
- Provider: NextAuth.js v4.24.13
- Strategy: JWT tokens
- Credentials: Email + Password
- Password Hashing: bcryptjs (cost factor 12)
- Session: HTTP-only cookies

### **Role Hierarchy**
```typescript
enum Role {
  SUPER_ADMIN       // Full system access
  SCHOOL_ADMIN      // School-level admin
  PRINCIPAL         // Academic leadership
  ADMISSIONS_OFFICER // Enrollment management
  TEACHER           // Class management, grading
  STUDENT           // View own data only
  PARENT            // Child's data access
  ACCOUNTANT        // Financial operations
  LIBRARIAN         // Library management
  TRANSPORT_MANAGER // Transport operations
  NURSE             // Medical records
  HR_MANAGER        // Staff management
}
```

### **Dashboard Role Mapping**
- `ADMIN` = SUPER_ADMIN, SCHOOL_ADMIN, PRINCIPAL, etc.
- `TEACHER` = TEACHER role
- `STUDENT` = STUDENT role

### **Access Control Pattern**
```typescript
// In middleware.ts
canAccessDashboardPath(role, pathname)
// Returns true/false based on role permissions
```

---

## 🗄️ Database Schema Overview

### **Core Models Implemented**

#### **User Model** (Base for all users)
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  password  String
  role      Role     @default(STUDENT)
  avatar    String?
  phone     String?
  isActive  Boolean  @default(true)
  teacher   Teacher?
  student   Student?
  parent    Parent?
  staff     Staff?
}
```

#### **Student Model**
```prisma
model Student {
  id             String        @id @default(cuid())
  userId         String        @unique
  studentId      String        @unique
  classId        String?
  parentId       String?
  dateOfBirth    DateTime?
  gender         Gender?
  address        String?
  bloodType      String?
  medicalNotes   String?
  enrollmentDate DateTime?
  status         StudentStatus @default(ACTIVE)
  user           User          @relation(...)
  class          Class?        @relation(...)
  parent         Parent?       @relation(...)
  attendances    Attendance[]
  submissions    Submission[]
  grades         StudentGrade[]
  examResults    ExamResult[]
  documents      Document[]
  invoices       Invoice[]
}
```

#### **Other Key Models**
- `Teacher` - Teacher profiles with employee ID
- `Parent` - Parent/guardian information
- `Class` - Class sections with grade linkage
- `Subject` - Course catalog
- `AcademicYear` / `Term` - Academic calendar
- `Attendance` - Daily attendance records
- `Assignment` / `Submission` - Homework management
- `Exam` / `ExamResult` - Examination system
- `FeeStructure` / `Invoice` / `Payment` - Billing
- `Announcement` / `Notification` - Communication
- `AuditLog` - Activity tracking

---

## 🛠️ Technology Stack

### **Frontend**
- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript 5.x
- **UI Library**: React 19.2.3
- **Styling**: Tailwind CSS 4.x
- **Components**: Radix UI primitives
- **Icons**: Lucide React
- **Charts**: Recharts 3.8.0
- **Dates**: date-fns 4.1.0

### **Backend**
- **Runtime**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma 6.19.2
- **Auth**: NextAuth.js 4.24.13
- **Password**: bcryptjs 3.0.3
- **Email**: Nodemailer 7.0.13

### **Development**
- **Package Manager**: npm
- **Build Tool**: Turbopack (Next.js dev)
- **Linting**: ESLint 9.x
- **Type Checking**: TypeScript built-in

---

## 🚀 Development Workflow

### **Environment Setup**
```bash
# Required .env variables
DATABASE_URL="postgresql://user:password@localhost:5432/lumio"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Optional (production)
SMTP_HOST="smtp.example.com"
SMTP_PORT=587
SMTP_USER="your-user"
SMTP_PASS="your-password"
EMAIL_FROM="Lumio <no-reply@example.com>"
```

### **Common Commands**
```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Build for production
npm run db:push      # Push schema changes to DB (dev only)
npm run db:migrate   # Create & apply migrations
npm run db:seed      # Seed database with demo data
npm run db:studio    # Open Prisma Studio GUI
npm run db:generate  # Generate Prisma Client
```

### **Demo Accounts** (from seed.ts)
```
Admin:   admin@lumio.edu    / Admin1234!
Teacher: teacher@lumio.edu  / Teacher123!
Student: student@lumio.edu  / Student123!
```

---

## 📋 Implementation Patterns

### **Page Component Pattern**
```typescript
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FeaturePage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  async function loadData() {
    const res = await fetch("/api/dashboard/feature");
    const result = await res.json();
    setData(result);
  }

  return (
    <div className="space-y-5">
      <Card>...</Card>
    </div>
  );
}
```

### **API Route Pattern**
```typescript
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await prisma.model.findMany({ /* ... */ });
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch" },
      { status: 500 }
    );
  }
}
```

### **Role-Based Access Pattern**
```typescript
import { resolveDashboardRole } from "@/lib/roles";

const dashboardRole = resolveDashboardRole(session.user.role);
const canManage = dashboardRole === "ADMIN";

if (!canManage) {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}
```

---

## ✅ Completed Modules

### **1. Student Management Module** ✅
**Files Created:**
- `/dashboard/students/page.tsx` - List view with search
- `/dashboard/students/add/page.tsx` - Registration form
- `/dashboard/students/[id]/page.tsx` - Detail view (Profile/Attendance/Grades tabs)
- `/api/dashboard/students/route.ts` - GET (list), POST (create)
- `/api/dashboard/students/enroll/route.ts` - POST (enroll in class)
- `/api/dashboard/students/[id]/route.ts` - GET (detail)

**Features:**
- ✅ Student list with search/filter
- ✅ Add new student with parent linking
- ✅ Quick enrollment dropdown
- ✅ Student detail view with tabs
- ✅ Role-based permissions
- ✅ Duplicate validation
- ✅ Password hashing
- ✅ Transaction-based creation

---

### **2. Teacher Management Module** ✅
**Files Created:**
- `/dashboard/teachers/page.tsx` - List view with search and assignment
- `/dashboard/teachers/add/page.tsx` - Registration form
- `/dashboard/teachers/[id]/page.tsx` - Detail view (Profile/Schedule/Assignments/Exams tabs)
- `/api/dashboard/teachers/route.ts` - GET (list), POST (create)
- `/api/dashboard/teachers/assign/route.ts` - POST (assign as class teacher)
- `/api/dashboard/teachers/[id]/route.ts` - GET (detail), PUT (update), DELETE (remove)

**Features:**
- ✅ Teacher list with search/filter
- ✅ Add new teacher with employee ID
- ✅ Assign teacher as class teacher
- ✅ Teacher detail view with multiple tabs
- ✅ View weekly schedule
- ✅ View created assignments and exams
- ✅ Role-based permissions
- ✅ Duplicate validation (email & employee ID)
- ✅ Password hashing
- ✅ Transaction-based creation and updates

---

## ⏳ Pending Modules (Priority Order)

### **Phase 1: Core Features**

#### **2. Teacher Management** ✅
- Teacher list and profiles
- Add/edit teacher forms
- Class/subject assignments
- API endpoints for CRUD
- Teacher detail view with schedule, assignments, and exams

#### **3. Attendance Module** ⏳
- Daily attendance marking
- Class-wise attendance
- Student attendance history
- Reports and analytics
- Notifications for absences

#### **4. Assignment Management** ⏳
- Create/edit/delete assignments
- Student submission flow
- Teacher grading interface
- File upload support
- Feedback system

#### **5. Exam Management** ⏳
- Exam scheduling
- Marks entry
- Grade calculation
- Report card generation
- Result publishing

#### **6. Fee & Billing** ⏳
- Fee structure setup
- Invoice generation
- Payment processing
- Outstanding tracking
- Financial reports

#### **7. Parent/Student Portals** ⏳
- Parent dashboard
- Student dashboard
- View-only access to data
- Multi-child parent view

### **Phase 2: Advanced Features**

#### **8. School Setup** ⏳
- Academic year management
- Grade/class structure
- Subject catalog
- Calendar configuration

#### **9. Reporting & Analytics** ⏳
- Dashboard widgets
- Performance reports
- Attendance analytics
- Fee collection reports

#### **10. Communication System** ⏳
- Announcements
- Notifications
- Messaging system
- Email/SMS integration

### **Phase 3: Operational Modules**

#### **11. Document Management** ⏳
- Upload/store documents
- Categorization
- Expiry tracking
- Download/preview

#### **12. Staff Management** ⏳
- Staff profiles
- Leave requests
- Attendance tracking
- Document storage

#### **13. Library, Transport, Hostel, Cafeteria** ⏳
- Operational modules
- Specialized workflows

---

## 🎨 UI Component Library

### **Available Components** (`src/components/ui/`)
- ✅ `button.tsx` - All variants (default, outline, ghost, icon)
- ✅ `card.tsx` - Card containers
- ✅ `input.tsx` - Text inputs
- ✅ `badge.tsx` - Status badges
- ✅ `avatar.tsx` - User avatars
- ⏳ `dialog.tsx` - Modal dialogs (available, not imported yet)
- ⏳ `select.tsx` - Dropdown selects (available, not imported yet)
- ⏳ `tabs.tsx` - Tab interfaces (available, not imported yet)
- ⏳ `label.tsx` - Form labels (needs creation or import)

### **Layout Components**
- ✅ `sidebar.tsx` - Role-based navigation menu
- ✅ `header.tsx` - Breadcrumbs + notification bell + user menu

---

## 🔒 Security Best Practices

### **Implemented**
- ✅ Password hashing (bcrypt, cost 12)
- ✅ JWT token authentication
- ✅ HTTP-only cookies
- ✅ Role-based middleware protection
- ✅ Input validation
- ✅ SQL injection prevention (Prisma)
- ✅ CSRF protection (NextAuth)

### **To Implement**
- ⏳ Rate limiting on auth endpoints
- ⏳ Audit logging for sensitive actions
- ⏳ File upload security scanning
- ⏳ Data retention policies
- ⏳ Multi-factor authentication

---

## 📊 API Endpoints Summary

### **Authentication**
- ✅ `POST /api/auth/[...nextauth]` - Login/logout
- ✅ `POST /api/auth/forgot-password` - Request reset
- ✅ `POST /api/auth/reset-password` - Reset password

### **Students** (✅ Complete)
- ✅ `GET /api/dashboard/students` - List all students
- ✅ `POST /api/dashboard/students` - Create student
- ✅ `POST /api/dashboard/students/enroll` - Enroll in class
- ✅ `GET /api/dashboard/students/:id` - Get student details

### **Pending API Routes**
- ⏳ Teachers CRUD
- ⏳ Attendance CRUD
- ⏳ Assignments CRUD
- ⏳ Exams CRUD
- ⏳ Fees/Invoices/Payments
- ⏳ Classes/Subjects
- ⏳ Communications

---

## 🎯 Next Implementation Priority

Based on the requirements document, recommended order:

1. **Teacher Management** - Complete the people management foundation
2. **Attendance System** - Daily operational requirement
3. **Assignment Module** - Teacher workflow essential
4. **Exam Management** - Academic operations core
5. **Fee & Billing** - Financial operations critical
6. **Parent/Student Portals** - Stakeholder access
7. **School Setup** - Configuration foundation
8. **Reporting** - Analytics and insights

---

## 💡 Quick Start for New Module

When implementing a new module, follow this pattern:

1. **Create API routes** first (CRUD operations)
2. **Build list page** with search/filter
3. **Add detail page** with tabs if needed
4. **Create add/edit forms** with validation
5. **Update sidebar navigation** if needed
6. **Test with different roles** (admin/teacher/student)

Example command pattern:
```bash
# "now add teacher management"
# "now create attendance module"
# "now build assignment system"
```

---

## 📝 Notes

- All pages use App Router (server components by default)
- Client components marked with `"use client"`
- Middleware protects all `/dashboard/*` routes
- Role permissions checked in both middleware and API
- Database transactions used for multi-step operations
- Error handling consistent across all endpoints
- Loading states implemented everywhere
- Responsive design standard on all pages

---

**Last Updated**: March 26, 2026
**Version**: 1.0.0
**Status**: Phase 1 MVP - Student Module Complete ✅
