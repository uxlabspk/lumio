<?php

declare(strict_types=1);

namespace App\Http\Controllers\Web;

use App\Core\View;
use App\Http\Middleware\AuthMiddleware;
use App\Repositories\ModuleRecordRepository;
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
        $role = $_SESSION['user']['role'] ?? 'admin';

        if (!SchoolManagementData::canAccess($role, $key)) {
            http_response_code(403);
            View::render('errors.403', [
                'title' => 'Access denied',
                'navigation' => SchoolManagementData::navigation($role),
            ], 'layouts/app');
            return;
        }

        $module = SchoolManagementData::module($key);
        $repo = new ModuleRecordRepository();
        $editRecord = null;

        if (isset($_GET['edit'])) {
            $editRecord = $repo->find($key, (int) $_GET['edit']);
        }

        View::render('management.module', [
            'title' => $module['title'],
            'moduleKey' => $key,
            'module' => $module,
            'records' => $repo->all($key),
            'editRecord' => $editRecord,
            'canManage' => SchoolManagementData::canManage($role, $key),
            'flash' => $_SESSION['flash'] ?? null,
            'navigation' => SchoolManagementData::navigation($role),
            'user' => $_SESSION['user'],
        ], 'layouts/app');

        unset($_SESSION['flash']);
    }

    public function save(string $key): void
    {
        AuthMiddleware::requireLogin();
        $role = $_SESSION['user']['role'] ?? 'admin';

        if (!SchoolManagementData::canManage($role, $key)) {
            $_SESSION['flash'] = ['type' => 'error', 'message' => 'Your role cannot modify this module.'];
            redirect('dashboard');
        }

        $module = SchoolManagementData::module($key);
        $data = [];

        foreach ($module['columns'] as $column) {
            $data[$column] = trim($_POST['fields'][$column] ?? '');
        }

        (new ModuleRecordRepository())->save($key, $data, isset($_POST['id']) && $_POST['id'] !== '' ? (int) $_POST['id'] : null);

        $_SESSION['flash'] = [
            'type' => 'success',
            'message' => isset($_POST['id']) && $_POST['id'] !== '' ? 'Record updated successfully.' : 'Record created successfully.',
        ];

        redirect($key);
    }

    public function delete(string $key): void
    {
        AuthMiddleware::requireLogin();
        $role = $_SESSION['user']['role'] ?? 'admin';

        if (!SchoolManagementData::canManage($role, $key)) {
            $_SESSION['flash'] = ['type' => 'error', 'message' => 'Your role cannot delete records in this module.'];
            redirect('dashboard');
        }

        if (isset($_POST['id'])) {
            (new ModuleRecordRepository())->delete($key, (int) $_POST['id']);
        }

        $_SESSION['flash'] = [
            'type' => 'success',
            'message' => 'Record deleted successfully.',
        ];

        redirect($key);
    }
}
