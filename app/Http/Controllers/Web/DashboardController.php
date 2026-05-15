<?php

declare(strict_types=1);

namespace App\Http\Controllers\Web;

use App\Core\View;
use App\Http\Middleware\AuthMiddleware;

final class DashboardController
{
    public function index(): void
    {
        AuthMiddleware::requireLogin();

        View::render('pages.dashboard', [
            'title' => 'Dashboard',
            'modules' => config('modules'),
            'user' => $_SESSION['user'],
        ], 'layouts/app');
    }
}
