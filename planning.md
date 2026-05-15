# Lumio Development Plan

This file is the handoff guide for continuing Lumio on another laptop or account.

## Current Goal

Build a vanilla PHP + MySQL school management system for Pakistani schools that can run on Hostinger shared hosting now and expose JSON APIs for a future mobile app.

## Local Setup

Requirements:

- PHP 8.1+
- MySQL running locally
- MySQL username: `root`
- MySQL password: `root`
- Database name: `lumio`

Run setup:

```bash
php database/setup.php
```

Run local server:

```bash
php -S 127.0.0.1:8082 -t public
```

Open:

```text
http://127.0.0.1:8082
http://127.0.0.1:8082/login
```

Demo login:

```text
admin@lumio.pk
Admin1234!
```

## Current Architecture

- `public/index.php`: front controller.
- `app/routes.php`: all web and API routes.
- `app/Core`: router, view renderer, PDO database connection, JSON responses.
- `app/Http/Controllers/Web`: browser page controllers.
- `app/Http/Controllers/Api`: JSON endpoints for the mobile app.
- `app/Views`: layouts and PHP templates.
- `app/Services/SchoolManagementData.php`: module metadata, navigation, seed rows, dashboard data.
- `app/Repositories/ModuleRecordRepository.php`: generic MySQL CRUD for module records.
- `database/migrations`: SQL schema files.
- `database/setup.php`: creates local DB, runs migrations, seeds records.

## What Works Now

Landing/auth:

- Landing page
- Features page
- Pricing page
- Testimonials page
- Login/logout demo auth
- Role-aware admin, teacher, and student dashboards
- Forgot/reset password demo API

Demo accounts:

```text
admin@lumio.pk / Admin1234!
teacher@lumio.pk / Teacher123!
student@lumio.pk / Student123!
```

Management dashboard:

- `/dashboard`
- `/students`
- `/admissions`
- `/attendance`
- `/classes`
- `/timetable`
- `/exams`
- `/fees`
- `/communications`
- `/staff`
- `/transport`
- `/library`
- `/health`
- `/reports`
- `/school-setup`

CRUD:

- Every management module uses MySQL-backed records through `module_records`.
- Every module supports create, edit, and delete from the UI.
- Records are currently stored as JSON in `module_records.data_json`.
- Admin can manage all modules.
- Teacher can view teacher-relevant modules and manage attendance, exams, and communications.
- Student can view student-relevant modules in read-only mode.

API:

- `/api/health`
- `/api/dashboard`
- `/api/modules`

## Database Notes

The first working schema uses one flexible table:

```text
module_records
  id
  module_key
  data_json
  created_at
  updated_at
```

This is intentional for quick development. When a module becomes serious, split it into normalized tables.

Recommended future normalized tables:

- `schools`
- `users`
- `roles`
- `permissions`
- `students`
- `guardians`
- `families`
- `admissions`
- `classes`
- `sections`
- `subjects`
- `attendance_records`
- `fee_invoices`
- `fee_payments`
- `exam_terms`
- `exam_marks`
- `messages`
- `staff`
- `transport_routes`
- `library_books`
- `health_records`
- `audit_logs`

## Next Development Steps

1. Replace demo auth users with MySQL `users` table and hashed passwords.
2. Add CSRF protection for all POST forms.
3. Normalize Students first:
   - create `students`, `guardians`, `student_documents`
   - migrate `/students` CRUD from generic records to real tables
4. Normalize Fees second:
   - create invoices, payments, concessions, receipts
   - add printable receipt
5. Normalize Attendance third:
   - daily attendance by class/date
   - absent/late status
   - notification queue
6. Add role-based access control:
   - Super Admin
   - School Admin
   - Principal
   - Teacher
   - Accountant
   - Parent
   - Student
7. Add bilingual UI strings:
   - English
   - Urdu
8. Add mobile API versioning:
   - `/api/v1/login`
   - `/api/v1/students`
   - `/api/v1/attendance`
   - `/api/v1/fees`
9. Add Hostinger deployment checklist and backup process.

## Hostinger Deployment Reminder

Upload project contents into `public_html`.

If Hostinger allows document root selection, point it to `public/`. If not, keep the root `.htaccess` and compatibility files.

On Hostinger, update `app/Config/database.php` or add an `.env` loader later for:

```text
DB_HOST
DB_DATABASE
DB_USERNAME
DB_PASSWORD
```

## Engineering Rules For Future Work

- Keep vanilla PHP and MySQL until the product has real users.
- Keep code Hostinger-compatible.
- Avoid Composer-only dependencies for core functionality.
- Build the web app and API together so mobile can reuse server behavior.
- Start generic for speed, then normalize high-value modules one by one.
