<?php

declare(strict_types=1);

namespace App\Http\Middleware;

final class AuthMiddleware
{
    public static function requireLogin(): void
    {
        if (empty($_SESSION['user'])) {
            redirect('login');
        }
    }
}
