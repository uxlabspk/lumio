# Lumio Architecture

Lumio is structured for vanilla PHP on Hostinger shared hosting today, while leaving a clear path to a larger platform later.

## Deployment Shape

- `public/index.php` is the main front controller.
- Root files such as `index.php`, `login.php`, and `features.php` are compatibility shims for simple shared-hosting uploads.
- `.htaccess` routes clean URLs like `/features`, `/login`, and `/api/health` into the front controller.
- `app/Config/database.php` is ready for Hostinger MySQL credentials through environment variables or direct config values.

## Folders

- `app/Config`: application, database, and module configuration.
- `app/Core`: tiny framework pieces: router, view rendering, JSON responses, database connection.
- `app/Http/Controllers/Web`: browser pages.
- `app/Http/Controllers/Api`: JSON endpoints for mobile apps and future SPA/offline sync.
- `app/Http/Middleware`: guards such as login checks and future role checks.
- `app/Views`: PHP templates and layouts.
- `app/Models`: database-backed records such as Student, Guardian, Invoice, AttendanceRecord.
- `app/Services`: reusable workflows such as payments, WhatsApp, SMS, report generation, imports.
- `app/Modules`: domain homes for school features.
- `database/migrations`: plain SQL migration files.
- `database/seeds`: initial roles, permissions, academic years, and demo data.
- `storage`: private uploads, logs, exports, cache files.
- `public/assets`: browser-safe CSS, JS, images, and public uploads.

## Module Roadmap

Start with the modules that create the fastest Pakistani-school value:

1. School Setup: school profile, academic year, classes, sections, subjects, campuses.
2. People: users, roles, students, guardians, families, staff, CNIC/B-Form fields.
3. Attendance: daily attendance, corrections, parent alerts, offline sync queue.
4. Fees: fee plans, invoices, receipts, concessions, dues, cash/cheque/mobile wallet records.
5. Exams: terms, marks entry, grading rules, report cards.
6. Communications: announcements, SMS, WhatsApp, email templates, notification logs.
7. API: token-based endpoints consumed by the mobile app.

## Mobile App Direction

Keep all mobile-facing behavior under `/api/...`. Use JSON responses, token authentication, versioned endpoints later such as `/api/v1/students`, and sync tables for offline attendance or fee collection.

## Hostinger Notes

For the first version, upload the repository contents into `public_html`. If Hostinger allows setting the document root to `public`, do that for better security. Otherwise the included root shims and `.htaccess` keep the app usable while private code remains organized.
