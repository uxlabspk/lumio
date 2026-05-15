<?php

declare(strict_types=1);

namespace App\Http\Controllers\Web;

use App\Core\View;
use App\Http\Middleware\AuthMiddleware;
use App\Services\SchoolManagementData;

final class ManagementController
{
    public function students(): void
    {
        $this->module('students');
    }

    public function admissions(): void
    {
        $this->module('admissions');
    }

    public function attendance(): void
    {
        $this->module('attendance');
    }

    public function classes(): void
    {
        $this->module('classes');
    }

    public function timetable(): void
    {
        $this->module('timetable');
    }

    public function exams(): void
    {
        $this->module('exams');
    }

    public function fees(): void
    {
        $this->module('fees');
    }

    public function communications(): void
    {
        $this->module('communications');
    }

    public function staff(): void
    {
        $this->module('staff');
    }

    public function transport(): void
    {
        $this->module('transport');
    }

    public function library(): void
    {
        $this->module('library');
    }

    public function health(): void
    {
        $this->module('health');
    }

    public function reports(): void
    {
        $this->module('reports');
    }

    public function schoolSetup(): void
    {
        $this->module('school-setup');
    }

    private function module(string $key): void
    {
        AuthMiddleware::requireLogin();

        $module = SchoolManagementData::module($key);

        View::render('management.module', [
            'title' => $module['title'],
            'moduleKey' => $key,
            'module' => $module,
            'navigation' => SchoolManagementData::navigation(),
            'user' => $_SESSION['user'],
        ], 'layouts/app');
    }
}
