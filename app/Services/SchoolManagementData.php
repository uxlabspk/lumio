<?php

declare(strict_types=1);

namespace App\Services;

final class SchoolManagementData
{
    public static function navigation(string $role = 'admin'): array
    {
        $items = [
            ['label' => 'Dashboard', 'path' => 'dashboard', 'icon' => 'layout-dashboard'],
            ['label' => 'Students', 'path' => 'students', 'icon' => 'users'],
            ['label' => 'Admissions', 'path' => 'admissions', 'icon' => 'user-plus'],
            ['label' => 'Attendance', 'path' => 'attendance', 'icon' => 'calendar-check'],
            ['label' => 'Classes', 'path' => 'classes', 'icon' => 'school'],
            ['label' => 'Timetable', 'path' => 'timetable', 'icon' => 'calendar-days'],
            ['label' => 'Exams', 'path' => 'exams', 'icon' => 'clipboard-list'],
            ['label' => 'Fees', 'path' => 'fees', 'icon' => 'receipt'],
            ['label' => 'Messages', 'path' => 'communications', 'icon' => 'message-square'],
            ['label' => 'Staff', 'path' => 'staff', 'icon' => 'id-card'],
            ['label' => 'Transport', 'path' => 'transport', 'icon' => 'bus'],
            ['label' => 'Library', 'path' => 'library', 'icon' => 'book-open'],
            ['label' => 'Health', 'path' => 'health', 'icon' => 'heart-pulse'],
            ['label' => 'Reports', 'path' => 'reports', 'icon' => 'bar-chart-3'],
            ['label' => 'Setup', 'path' => 'school-setup', 'icon' => 'settings'],
        ];

        return array_values(array_filter($items, fn (array $item): bool => self::canAccess($role, $item['path'])));
    }

    public static function dashboard(string $role = 'admin'): array
    {
        if ($role === 'teacher') {
            return [
                'hero' => [
                    'eyebrow' => 'Teacher workspace',
                    'title' => 'Teach, mark, and communicate from one place',
                    'description' => 'Your dashboard focuses on today\'s classes, attendance, homework, exams, and parent communication.',
                    'actions' => [
                        ['label' => 'Mark attendance', 'path' => 'attendance', 'primary' => true],
                        ['label' => 'View timetable', 'path' => 'timetable', 'primary' => false],
                        ['label' => 'Send class notice', 'path' => 'communications', 'primary' => false],
                    ],
                ],
                'stats' => [
                    ['label' => 'My Students', 'value' => '148', 'trend' => 'Across 5 assigned classes', 'icon' => 'users'],
                    ['label' => 'Attendance Pending', 'value' => '2', 'trend' => 'Sections still open', 'icon' => 'calendar-check'],
                    ['label' => 'Marks Pending', 'value' => '36', 'trend' => 'Monthly test entries', 'icon' => 'clipboard-list'],
                    ['label' => 'Parent Messages', 'value' => '9', 'trend' => 'Need response today', 'icon' => 'message-square'],
                ],
                'today' => [
                    ['time' => '08:15', 'title' => 'Grade 7-A Mathematics', 'meta' => 'Room B-101'],
                    ['time' => '09:45', 'title' => 'Grade 8-C Urdu', 'meta' => 'Room B-205'],
                    ['time' => '11:30', 'title' => 'Submit Grade 5 homework notes', 'meta' => 'Due before lunch'],
                    ['time' => '01:00', 'title' => 'Parent follow-up window', 'meta' => '3 messages queued'],
                ],
                'alerts' => [
                    ['label' => 'Attendance not submitted', 'value' => 'Grade 8-C and Grade 5-B'],
                    ['label' => 'Low performance watchlist', 'value' => '6 students need review'],
                    ['label' => 'Homework missing', 'value' => '14 submissions pending'],
                ],
                'feeSeries' => [72, 68, 81, 76, 84, 79, 88],
            ];
        }

        if ($role === 'student') {
            return [
                'hero' => [
                    'eyebrow' => 'Student portal',
                    'title' => 'Your school day at a glance',
                    'description' => 'Check your timetable, attendance, exams, library books, health notes, and school announcements.',
                    'actions' => [
                        ['label' => 'View timetable', 'path' => 'timetable', 'primary' => true],
                        ['label' => 'Check exams', 'path' => 'exams', 'primary' => false],
                        ['label' => 'Read notices', 'path' => 'communications', 'primary' => false],
                    ],
                ],
                'stats' => [
                    ['label' => 'Attendance', 'value' => '96%', 'trend' => 'This term', 'icon' => 'calendar-check'],
                    ['label' => 'Upcoming Exams', 'value' => '3', 'trend' => 'Next 14 days', 'icon' => 'clipboard-list'],
                    ['label' => 'Library Books', 'value' => '2', 'trend' => '1 due this week', 'icon' => 'book-open'],
                    ['label' => 'Notices', 'value' => '5', 'trend' => 'Unread announcements', 'icon' => 'bell'],
                ],
                'today' => [
                    ['time' => '08:15', 'title' => 'Mathematics', 'meta' => 'Room B-101'],
                    ['time' => '09:00', 'title' => 'English', 'meta' => 'Room A-204'],
                    ['time' => '10:00', 'title' => 'Science practical', 'meta' => 'Lab 2'],
                    ['time' => '12:15', 'title' => 'Library return reminder', 'meta' => 'Physics Practical'],
                ],
                'alerts' => [
                    ['label' => 'Exam reminder', 'value' => 'Science test on May 22, 2026'],
                    ['label' => 'Library due', 'value' => 'One book due this week'],
                    ['label' => 'Fee status', 'value' => 'May invoice marked paid'],
                ],
                'feeSeries' => [80, 84, 79, 88, 91, 86, 92],
            ];
        }

        return [
            'hero' => [
                'eyebrow' => 'Operations overview',
                'title' => 'Run the school from one place',
                'description' => 'A practical command center for Pakistani schools: attendance, student records, fees, messages, exams, transport, and compliance gaps are visible without digging.',
                'actions' => [
                    ['label' => 'Mark attendance', 'path' => 'attendance', 'primary' => true],
                    ['label' => 'Record payment', 'path' => 'fees', 'primary' => false],
                    ['label' => 'Send notice', 'path' => 'communications', 'primary' => false],
                ],
            ],
            'stats' => [
                ['label' => 'Active Students', 'value' => '1,284', 'trend' => '+42 this term', 'icon' => 'users'],
                ['label' => 'Attendance Today', 'value' => '94.2%', 'trend' => '37 absent', 'icon' => 'calendar-check'],
                ['label' => 'Fees Outstanding', 'value' => 'PKR 312k', 'trend' => '86 invoices', 'icon' => 'receipt'],
                ['label' => 'Parent Alerts', 'value' => '48', 'trend' => 'Queued for WhatsApp/SMS', 'icon' => 'bell'],
            ],
            'today' => [
                ['time' => '08:00', 'title' => 'Morning attendance closes', 'meta' => 'Classes Nursery to Matric'],
                ['time' => '10:30', 'title' => 'Admissions interviews', 'meta' => '12 shortlisted applicants'],
                ['time' => '12:00', 'title' => 'Fee reminder batch', 'meta' => 'WhatsApp and SMS queue'],
                ['time' => '02:15', 'title' => 'Grade 9 physics test', 'meta' => 'Room B-204'],
            ],
            'alerts' => [
                ['label' => 'CNIC/B-Form missing', 'value' => '23 student records'],
                ['label' => 'Low attendance risk', 'value' => '17 students below 75%'],
                ['label' => 'Transport route issue', 'value' => 'Route 4 delayed twice this week'],
            ],
            'feeSeries' => [68, 74, 59, 88, 82, 91, 77],
        ];
    }

    public static function canAccess(string $role, string $path): bool
    {
        if ($path === 'dashboard') {
            return true;
        }

        $access = [
            'admin' => ['students', 'admissions', 'attendance', 'classes', 'timetable', 'exams', 'fees', 'communications', 'staff', 'transport', 'library', 'health', 'reports', 'school-setup'],
            'teacher' => ['students', 'attendance', 'classes', 'timetable', 'exams', 'communications', 'library', 'health', 'reports'],
            'student' => ['attendance', 'classes', 'timetable', 'exams', 'fees', 'communications', 'library', 'health'],
        ];

        return in_array($path, $access[$role] ?? [], true);
    }

    public static function canManage(string $role, string $path): bool
    {
        if ($role === 'admin') {
            return self::canAccess($role, $path);
        }

        if ($role === 'teacher') {
            return in_array($path, ['attendance', 'exams', 'communications'], true);
        }

        return false;
    }

    public static function module(string $key): array
    {
        $modules = self::modules();

        return $modules[$key] ?? $modules['students'];
    }

    public static function modules(): array
    {
        return [
            'students' => [
                'title' => 'Student Information',
                'eyebrow' => 'SIS',
                'description' => 'Manage admissions data, student profiles, guardians, B-Form/CNIC details, documents, medical notes, and enrollment status.',
                'primaryAction' => 'Add student',
                'secondaryAction' => 'Import students',
                'metrics' => [
                    ['label' => 'Active', 'value' => '1,284'],
                    ['label' => 'New this month', 'value' => '42'],
                    ['label' => 'Missing documents', 'value' => '23'],
                    ['label' => 'Withdrawals', 'value' => '6'],
                ],
                'columns' => ['Student', 'Class', 'Guardian', 'B-Form/CNIC', 'Status'],
                'rows' => [
                    ['Areeba Khan', 'Grade 7-A', 'Nadia Khan', '35202-1234567-1', 'Active'],
                    ['Hamza Ali', 'Grade 5-B', 'Imran Ali', 'B-Form pending', 'Document hold'],
                    ['Fatima Noor', 'Matric-A', 'Shazia Noor', '42101-7788990-2', 'Active'],
                    ['Musa Ahmed', 'Grade 2-C', 'Sohail Ahmed', '35201-3344556-3', 'Active'],
                ],
                'workflows' => ['Register student', 'Verify documents', 'Assign class/section', 'Link family record', 'Generate student ID'],
                'form' => ['Student name', 'Class/section', 'Guardian mobile', 'B-Form/CNIC', 'Admission date'],
            ],
            'admissions' => [
                'title' => 'Admissions Pipeline',
                'eyebrow' => 'Enrollment',
                'description' => 'Track inquiries, applications, documents, interviews, decisions, waitlists, and enrollment confirmation.',
                'primaryAction' => 'New inquiry',
                'secondaryAction' => 'Schedule interview',
                'metrics' => [
                    ['label' => 'Inquiries', 'value' => '118'],
                    ['label' => 'Applications', 'value' => '64'],
                    ['label' => 'Interviews', 'value' => '18'],
                    ['label' => 'Confirmed', 'value' => '31'],
                ],
                'columns' => ['Applicant', 'Applying For', 'Stage', 'Documents', 'Owner'],
                'rows' => [
                    ['Zainab Tariq', 'Grade 1', 'Interview', 'Complete', 'Admissions Officer'],
                    ['Omar Siddiqui', 'Grade 8', 'Document check', 'B-Form missing', 'Registrar'],
                    ['Hania Javed', 'Nursery', 'Offer sent', 'Complete', 'Principal'],
                    ['Rayyan Malik', 'Grade 6', 'Waitlist', 'Complete', 'Admissions Officer'],
                ],
                'workflows' => ['Capture inquiry', 'Collect documents', 'Schedule test/interview', 'Send offer', 'Convert to student'],
                'form' => ['Applicant name', 'Applying class', 'Parent mobile', 'Source', 'Preferred interview date'],
            ],
            'attendance' => [
                'title' => 'Attendance',
                'eyebrow' => 'Daily operations',
                'description' => 'Mark daily or subject-wise attendance, manage corrections, and queue absence alerts for WhatsApp/SMS.',
                'primaryAction' => 'Mark attendance',
                'secondaryAction' => 'Sync offline entries',
                'metrics' => [
                    ['label' => 'Present', 'value' => '94.2%'],
                    ['label' => 'Absent', 'value' => '37'],
                    ['label' => 'Late', 'value' => '19'],
                    ['label' => 'Offline queue', 'value' => '12'],
                ],
                'columns' => ['Class', 'Teacher', 'Present', 'Absent/Late', 'Alert Status'],
                'rows' => [
                    ['Grade 1-A', 'Ms. Rabia', '32/34', '2 absent', 'Sent'],
                    ['Grade 5-B', 'Mr. Usman', '29/31', '1 absent, 1 late', 'Queued'],
                    ['Matric-A', 'Ms. Sana', '41/44', '3 absent', 'Sent'],
                    ['Grade 8-C', 'Mr. Bilal', '36/37', '1 late', 'Not required'],
                ],
                'workflows' => ['Select class', 'Mark present/absent/late', 'Submit correction request', 'Notify parents', 'Export register'],
                'form' => ['Class', 'Date', 'Student', 'Status', 'Reason'],
            ],
            'classes' => [
                'title' => 'Classes & Sections',
                'eyebrow' => 'School setup',
                'description' => 'Organize grades, sections, subjects, class teachers, academic years, campuses, and curriculum boards.',
                'primaryAction' => 'Create class',
                'secondaryAction' => 'Assign subjects',
                'metrics' => [
                    ['label' => 'Classes', 'value' => '38'],
                    ['label' => 'Sections', 'value' => '74'],
                    ['label' => 'Subjects', 'value' => '46'],
                    ['label' => 'Boards', 'value' => '4'],
                ],
                'columns' => ['Class', 'Sections', 'Class Teacher', 'Curriculum', 'Capacity'],
                'rows' => [
                    ['Nursery', 'A, B, C', 'Ms. Hira', 'Early years', '90'],
                    ['Grade 5', 'A, B', 'Mr. Usman', 'Punjab/Bise', '70'],
                    ['Grade 8', 'A, B, C', 'Ms. Mahnoor', 'BISE', '105'],
                    ['Matric', 'A, B', 'Ms. Sana', 'BISE Lahore', '88'],
                ],
                'workflows' => ['Create grade', 'Add sections', 'Assign class teacher', 'Map subjects', 'Set capacity'],
                'form' => ['Class name', 'Section', 'Campus', 'Class teacher', 'Curriculum board'],
            ],
            'timetable' => [
                'title' => 'Timetable',
                'eyebrow' => 'Academic planning',
                'description' => 'Build class and teacher timetables with room assignment, subject periods, and conflict checks.',
                'primaryAction' => 'Add period',
                'secondaryAction' => 'Check conflicts',
                'metrics' => [
                    ['label' => 'Periods today', 'value' => '312'],
                    ['label' => 'Free teachers', 'value' => '7'],
                    ['label' => 'Room conflicts', 'value' => '2'],
                    ['label' => 'Substitutions', 'value' => '5'],
                ],
                'columns' => ['Time', 'Class', 'Subject', 'Teacher', 'Room'],
                'rows' => [
                    ['08:15 - 09:00', 'Grade 7-A', 'Mathematics', 'Mr. Bilal', 'B-101'],
                    ['09:00 - 09:45', 'Matric-A', 'Physics', 'Ms. Sana', 'Lab 2'],
                    ['10:00 - 10:45', 'Grade 5-B', 'English', 'Ms. Rabia', 'A-204'],
                    ['11:30 - 12:15', 'Grade 8-C', 'Urdu', 'Mr. Farhan', 'B-205'],
                ],
                'workflows' => ['Create bell schedule', 'Assign subject', 'Assign teacher', 'Reserve room', 'Publish timetable'],
                'form' => ['Class', 'Subject', 'Teacher', 'Room', 'Period time'],
            ],
            'exams' => [
                'title' => 'Exams & Results',
                'eyebrow' => 'Assessment',
                'description' => 'Plan exams, enter marks, configure grading, publish results, and generate bilingual report cards.',
                'primaryAction' => 'Create exam',
                'secondaryAction' => 'Enter marks',
                'metrics' => [
                    ['label' => 'Active exams', 'value' => '3'],
                    ['label' => 'Marks pending', 'value' => '214'],
                    ['label' => 'Reports ready', 'value' => '812'],
                    ['label' => 'Rechecks', 'value' => '9'],
                ],
                'columns' => ['Exam', 'Class', 'Subject', 'Marks Status', 'Publish Date'],
                'rows' => [
                    ['Mid Term', 'Grade 7', 'Science', '82% entered', '2026-05-22'],
                    ['Monthly Test', 'Grade 5', 'Math', 'Complete', '2026-05-18'],
                    ['Board Mock', 'Matric', 'Physics', '61% entered', '2026-05-28'],
                    ['Final Prep', 'Grade 8', 'English', 'Scheduled', '2026-06-04'],
                ],
                'workflows' => ['Schedule exam', 'Define marks', 'Enter scores', 'Approve results', 'Print report cards'],
                'form' => ['Exam name', 'Class', 'Subject', 'Total marks', 'Exam date'],
            ],
            'fees' => [
                'title' => 'Fees & Payments',
                'eyebrow' => 'Finance',
                'description' => 'Manage fee structures, invoices, receipts, discounts, fines, cash records, and local gateway readiness.',
                'primaryAction' => 'Generate invoice',
                'secondaryAction' => 'Record payment',
                'metrics' => [
                    ['label' => 'Collected', 'value' => 'PKR 4.8m'],
                    ['label' => 'Outstanding', 'value' => 'PKR 312k'],
                    ['label' => 'Concessions', 'value' => 'PKR 186k'],
                    ['label' => 'Gateway queue', 'value' => '24'],
                ],
                'columns' => ['Student', 'Invoice', 'Amount', 'Method', 'Status'],
                'rows' => [
                    ['Areeba Khan', 'MAY-1021', 'PKR 18,500', 'JazzCash planned', 'Paid'],
                    ['Hamza Ali', 'MAY-1038', 'PKR 15,000', 'Cash', 'Partial'],
                    ['Fatima Noor', 'MAY-1092', 'PKR 22,000', 'Bank transfer', 'Paid'],
                    ['Musa Ahmed', 'MAY-1114', 'PKR 12,500', 'EasyPaisa planned', 'Due'],
                ],
                'workflows' => ['Create fee plan', 'Generate invoices', 'Apply concession', 'Record payment', 'Send due reminder'],
                'form' => ['Student', 'Fee month', 'Amount', 'Payment method', 'Receipt note'],
            ],
            'communications' => [
                'title' => 'Communication Center',
                'eyebrow' => 'Parents and staff',
                'description' => 'Send announcements, attendance alerts, fee reminders, exam updates, and bilingual WhatsApp/SMS templates.',
                'primaryAction' => 'New announcement',
                'secondaryAction' => 'Create template',
                'metrics' => [
                    ['label' => 'Sent today', 'value' => '1,842'],
                    ['label' => 'Queued', 'value' => '48'],
                    ['label' => 'Templates', 'value' => '27'],
                    ['label' => 'Failed', 'value' => '6'],
                ],
                'columns' => ['Message', 'Audience', 'Channel', 'Language', 'Status'],
                'rows' => [
                    ['Fee due reminder', 'Grade 5 parents', 'WhatsApp', 'Urdu/English', 'Queued'],
                    ['Absence alert', 'Individual parents', 'SMS', 'English', 'Sent'],
                    ['Exam date sheet', 'Matric parents', 'WhatsApp', 'Urdu', 'Sent'],
                    ['Holiday notice', 'Whole school', 'App + SMS', 'Urdu/English', 'Draft'],
                ],
                'workflows' => ['Choose audience', 'Pick template', 'Preview Urdu/English', 'Queue delivery', 'Track status'],
                'form' => ['Audience', 'Channel', 'Language', 'Message title', 'Send time'],
            ],
            'staff' => [
                'title' => 'Staff & HR',
                'eyebrow' => 'People operations',
                'description' => 'Manage teachers, admin staff, roles, payroll-ready records, EPF/EOBI fields, documents, and attendance.',
                'primaryAction' => 'Add staff',
                'secondaryAction' => 'Assign role',
                'metrics' => [
                    ['label' => 'Staff', 'value' => '86'],
                    ['label' => 'Teachers', 'value' => '68'],
                    ['label' => 'On leave', 'value' => '5'],
                    ['label' => 'Docs missing', 'value' => '11'],
                ],
                'columns' => ['Name', 'Role', 'Department', 'CNIC', 'Status'],
                'rows' => [
                    ['Sana Iqbal', 'Science Teacher', 'Academics', '35202-2233445-1', 'Active'],
                    ['Usman Raza', 'Math Teacher', 'Academics', '42101-1122334-5', 'Active'],
                    ['Kiran Shah', 'Accountant', 'Finance', '35201-6677889-2', 'Active'],
                    ['Adnan Bashir', 'Driver', 'Transport', '35202-7766554-3', 'On leave'],
                ],
                'workflows' => ['Create staff profile', 'Assign permissions', 'Upload documents', 'Mark attendance', 'Review payroll fields'],
                'form' => ['Staff name', 'Role', 'Mobile', 'CNIC', 'Joining date'],
            ],
            'transport' => [
                'title' => 'Transport',
                'eyebrow' => 'Routes',
                'description' => 'Manage routes, vehicles, drivers, stops, pickup/drop attendance, and parent route notifications.',
                'primaryAction' => 'Create route',
                'secondaryAction' => 'Assign students',
                'metrics' => [
                    ['label' => 'Routes', 'value' => '12'],
                    ['label' => 'Vehicles', 'value' => '15'],
                    ['label' => 'Students', 'value' => '418'],
                    ['label' => 'Delayed today', 'value' => '1'],
                ],
                'columns' => ['Route', 'Driver', 'Vehicle', 'Students', 'Status'],
                'rows' => [
                    ['Route 1 - DHA', 'Adnan Bashir', 'LEA-2211', '42', 'On time'],
                    ['Route 4 - Johar Town', 'Naveed Ali', 'LEB-4452', '38', 'Delayed'],
                    ['Route 7 - Cantt', 'Kamran Rafiq', 'LED-8821', '35', 'On time'],
                    ['Route 9 - Model Town', 'Imran Qureshi', 'LEC-9022', '44', 'On time'],
                ],
                'workflows' => ['Create route', 'Add stops', 'Assign driver/vehicle', 'Attach students', 'Notify parents'],
                'form' => ['Route name', 'Driver', 'Vehicle number', 'Stop', 'Monthly fee'],
            ],
            'library' => [
                'title' => 'Library',
                'eyebrow' => 'Resources',
                'description' => 'Track books, members, issue/return records, fines, inventory, and class reading resources.',
                'primaryAction' => 'Add book',
                'secondaryAction' => 'Issue book',
                'metrics' => [
                    ['label' => 'Books', 'value' => '7,420'],
                    ['label' => 'Issued', 'value' => '386'],
                    ['label' => 'Overdue', 'value' => '29'],
                    ['label' => 'Fines', 'value' => 'PKR 8.4k'],
                ],
                'columns' => ['Book', 'Member', 'Issued', 'Due', 'Status'],
                'rows' => [
                    ['Oxford Science 7', 'Areeba Khan', '2026-05-02', '2026-05-16', 'Issued'],
                    ['Urdu Grammar', 'Hamza Ali', '2026-04-27', '2026-05-11', 'Overdue'],
                    ['English Reader 5', 'Musa Ahmed', '2026-05-05', '2026-05-19', 'Issued'],
                    ['Physics Practical', 'Fatima Noor', '2026-05-01', '2026-05-15', 'Due today'],
                ],
                'workflows' => ['Catalog book', 'Register member', 'Issue book', 'Record return', 'Calculate fine'],
                'form' => ['Book title', 'ISBN/code', 'Member', 'Issue date', 'Due date'],
            ],
            'health' => [
                'title' => 'Health Records',
                'eyebrow' => 'Student care',
                'description' => 'Store allergies, medical conditions, visits, emergency contacts, immunization records, and nurse notes.',
                'primaryAction' => 'Add visit',
                'secondaryAction' => 'Update medical profile',
                'metrics' => [
                    ['label' => 'Medical profiles', 'value' => '1,067'],
                    ['label' => 'Allergy alerts', 'value' => '31'],
                    ['label' => 'Visits this week', 'value' => '22'],
                    ['label' => 'Emergency updates', 'value' => '8'],
                ],
                'columns' => ['Student', 'Condition/Visit', 'Contact', 'Action', 'Status'],
                'rows' => [
                    ['Areeba Khan', 'Peanut allergy', 'Nadia Khan', 'Avoid cafeteria item', 'Active alert'],
                    ['Hamza Ali', 'Fever visit', 'Imran Ali', 'Parent called', 'Resolved'],
                    ['Fatima Noor', 'Asthma', 'Shazia Noor', 'Inhaler in office', 'Active alert'],
                    ['Musa Ahmed', 'Minor injury', 'Sohail Ahmed', 'First aid', 'Resolved'],
                ],
                'workflows' => ['Record condition', 'Add emergency contact', 'Log clinic visit', 'Notify guardian', 'Print medical card'],
                'form' => ['Student', 'Condition/visit', 'Severity', 'Guardian contact', 'Notes'],
            ],
            'reports' => [
                'title' => 'Reports & Analytics',
                'eyebrow' => 'Leadership',
                'description' => 'Generate academic, attendance, finance, admissions, compliance, and operational reports for leadership.',
                'primaryAction' => 'Generate report',
                'secondaryAction' => 'Export CSV',
                'metrics' => [
                    ['label' => 'Saved reports', 'value' => '34'],
                    ['label' => 'Exports this month', 'value' => '91'],
                    ['label' => 'Audit events', 'value' => '2,418'],
                    ['label' => 'Compliance gaps', 'value' => '12'],
                ],
                'columns' => ['Report', 'Module', 'Period', 'Format', 'Owner'],
                'rows' => [
                    ['Monthly attendance', 'Attendance', 'May 2026', 'PDF/CSV', 'Principal'],
                    ['Fee aging', 'Finance', 'Current term', 'CSV', 'Accountant'],
                    ['Admissions funnel', 'Admissions', 'Spring intake', 'PDF', 'Registrar'],
                    ['Document compliance', 'SIS', 'All students', 'CSV', 'Admin'],
                ],
                'workflows' => ['Choose module', 'Set filters', 'Preview report', 'Export file', 'Share with leadership'],
                'form' => ['Report type', 'Date range', 'Class/campus', 'Format', 'Recipient'],
            ],
            'school-setup' => [
                'title' => 'School Setup',
                'eyebrow' => 'Configuration',
                'description' => 'Configure school profile, campuses, academic sessions, roles, permissions, holidays, language, and payment channels.',
                'primaryAction' => 'Update setup',
                'secondaryAction' => 'Manage roles',
                'metrics' => [
                    ['label' => 'Campuses', 'value' => '2'],
                    ['label' => 'Academic year', 'value' => '2026'],
                    ['label' => 'Roles', 'value' => '12'],
                    ['label' => 'Integrations', 'value' => '5 planned'],
                ],
                'columns' => ['Setting', 'Current Value', 'Owner', 'Last Updated', 'Status'],
                'rows' => [
                    ['Primary language', 'English + Urdu', 'Admin', '2026-05-08', 'Active'],
                    ['Curriculum boards', 'BISE, FBISE, Cambridge', 'Principal', '2026-05-01', 'Active'],
                    ['Payment channels', 'Cash, Bank, JazzCash planned', 'Finance', '2026-05-10', 'Setup needed'],
                    ['Notification channels', 'App, SMS, WhatsApp planned', 'Admin', '2026-05-12', 'Testing'],
                ],
                'workflows' => ['Edit school profile', 'Create academic year', 'Configure roles', 'Set holidays', 'Connect integrations'],
                'form' => ['School name', 'Campus', 'Academic year', 'Default language', 'Board/curriculum'],
            ],
        ];
    }
}
