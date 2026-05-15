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

        View::render('pages.dashboard', [
            'title' => 'Dashboard',
            'dashboard' => SchoolManagementData::dashboard(),
            'navigation' => SchoolManagementData::navigation(),
            'modules' => SchoolManagementData::modules(),
            'user' => $_SESSION['user'],
        ], 'layouts/app');
    }
}
