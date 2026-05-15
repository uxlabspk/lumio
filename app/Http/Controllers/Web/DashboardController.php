<?php

declare(strict_types=1);

namespace App\Http\Controllers\Web;

use App\Core\View;
use App\Http\Middleware\AuthMiddleware;
use App\Services\SchoolManagementData;

final class DashboardController
{
    public function index(): void
    {
        AuthMiddleware::requireLogin();
        $role = $_SESSION['user']['role'] ?? 'admin';

        View::render('pages.dashboard', [
            'title' => 'Dashboard',
            'dashboard' => SchoolManagementData::dashboard($role),
            'navigation' => SchoolManagementData::navigation($role),
            'modules' => SchoolManagementData::modules(),
            'user' => $_SESSION['user'],
        ], 'layouts/app');
    }
}
