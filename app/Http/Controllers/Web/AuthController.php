<?php

declare(strict_types=1);

namespace App\Http\Controllers\Web;

use App\Core\View;

final class AuthController
{
    private array $demoUsers = [
        'admin@lumio.pk' => ['password' => 'Admin1234!', 'role' => 'admin', 'name' => 'Admin User'],
        'teacher@lumio.pk' => ['password' => 'Teacher123!', 'role' => 'teacher', 'name' => 'Teacher User'],
        'student@lumio.pk' => ['password' => 'Student123!', 'role' => 'student', 'name' => 'Student User'],
    ];

    public function showLogin(): void
    {
        if (!empty($_SESSION['user'])) {
            redirect('dashboard');
        }

        View::render('auth.login', ['title' => 'Sign in', 'error' => null], 'layouts/auth');
    }

    public function login(): void
    {
        $email = trim($_POST['email'] ?? '');
        $password = $_POST['password'] ?? '';
        $user = $this->demoUsers[$email] ?? null;

        if ($user !== null && hash_equals($user['password'], $password)) {
            $_SESSION['user'] = [
                'email' => $email,
                'role' => $user['role'],
                'name' => $user['name'],
            ];

            redirect('dashboard');
        }

        View::render('auth.login', [
            'title' => 'Sign in',
            'error' => 'Invalid email or password.',
            'email' => $email,
        ], 'layouts/auth');
    }

    public function logout(): void
    {
        $_SESSION = [];
        session_destroy();
        redirect('login');
    }

    public function forgotPassword(): void
    {
        View::render('auth.forgot-password', ['title' => 'Forgot password'], 'layouts/auth');
    }

    public function resetPassword(): void
    {
        View::render('auth.reset-password', ['title' => 'Reset password'], 'layouts/auth');
    }
}
