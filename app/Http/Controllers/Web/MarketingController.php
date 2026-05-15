<?php

declare(strict_types=1);

namespace App\Http\Controllers\Web;

use App\Core\View;

final class MarketingController
{
    public function home(): void
    {
        View::render('pages.home', $this->marketingData() + ['title' => 'The School OS for Pakistan']);
    }

    public function features(): void
    {
        View::render('pages.features', $this->marketingData() + ['title' => 'Features']);
    }

    public function pricing(): void
    {
        View::render('pages.pricing', $this->marketingData() + ['title' => 'Pricing']);
    }

    public function testimonials(): void
    {
        View::render('pages.testimonials', $this->marketingData() + ['title' => 'Testimonials']);
    }

    private function marketingData(): array
    {
        return [
            'features' => [
                ['icon' => 'users', 'title' => 'Student Information', 'description' => 'Admissions, B-Form/CNIC records, family links, documents, medical notes, and enrollment history.'],
                ['icon' => 'calendar-check', 'title' => 'Attendance', 'description' => 'Daily and subject attendance with absence alerts, manual corrections, and offline-first sync planning.'],
                ['icon' => 'receipt', 'title' => 'Fees & Payments', 'description' => 'Fee ledgers, concessions, receipts, dues, fines, and room for JazzCash/EasyPaisa integrations.'],
                ['icon' => 'message-square', 'title' => 'Parent Communication', 'description' => 'Announcements, bilingual templates, WhatsApp/SMS queues, and parent portal notifications.'],
                ['icon' => 'book-open', 'title' => 'Academics', 'description' => 'Classes, sections, subjects, timetable, homework, lesson planning, and teaching materials.'],
                ['icon' => 'clipboard-list', 'title' => 'Exams & Results', 'description' => 'Exam schedules, marks entry, grade rules, report cards, transcripts, and board-ready exports.'],
                ['icon' => 'shield', 'title' => 'Roles & Audit', 'description' => 'Role-based access for owners, admins, principals, teachers, parents, students, finance, and staff.'],
                ['icon' => 'languages', 'title' => 'Urdu + English', 'description' => 'Built around bilingual UI, reports, invoices, and messages for Pakistani schools.'],
            ],
            'plans' => [
                ['name' => 'Starter', 'price' => 'Free', 'period' => '', 'description' => 'For pilots and small schools getting started.', 'features' => ['Core SIS', 'Attendance', 'Basic fee ledger', 'Parent notices'], 'highlighted' => false],
                ['name' => 'School', 'price' => 'PKR 8k', 'period' => '/month', 'description' => 'For growing private schools.', 'features' => ['All core modules', 'WhatsApp/SMS queues', 'Reports', 'Priority support'], 'highlighted' => true],
                ['name' => 'Network', 'price' => 'Custom', 'period' => '', 'description' => 'For multi-campus institutions.', 'features' => ['Multi-campus', 'Advanced roles', 'Payment gateways', 'Custom integrations'], 'highlighted' => false],
            ],
            'testimonials' => [
                ['quote' => 'Attendance, fees, and parent follow-up finally live in one place.', 'name' => 'Sarah Ahmed', 'title' => 'Principal, Lahore', 'initials' => 'SA', 'color' => 'bg-blue-500'],
                ['quote' => 'The product direction understands Pakistani schools, especially low-connectivity classrooms.', 'name' => 'Bilal Khan', 'title' => 'Administrator, Multan', 'initials' => 'BK', 'color' => 'bg-emerald-500'],
                ['quote' => 'A simple system our teachers can use without long training sessions.', 'name' => 'Ayesha Noor', 'title' => 'Head Teacher, Karachi', 'initials' => 'AN', 'color' => 'bg-purple-500'],
            ],
        ];
    }
}
