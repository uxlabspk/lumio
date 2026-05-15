<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Core\JsonResponse;

final class AuthController
{
    public function forgotPassword(): void
    {
        $payload = json_decode(file_get_contents('php://input') ?: '{}', true);
        $email = trim($payload['email'] ?? '');

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            JsonResponse::send(['error' => 'Enter a valid email address.'], 422);
        }

        JsonResponse::send([
            'message' => 'If an account exists for that email, reset instructions will be sent.',
            'debugResetUrl' => '/reset-password?token=demo-token',
        ]);
    }

    public function validateResetToken(): void
    {
        $token = trim($_GET['token'] ?? '');

        JsonResponse::send([
            'valid' => $token === 'demo-token',
            'error' => $token === 'demo-token' ? null : 'This reset link is invalid or has expired.',
        ], $token === 'demo-token' ? 200 : 404);
    }

    public function resetPassword(): void
    {
        $payload = json_decode(file_get_contents('php://input') ?: '{}', true);
        $password = $payload['password'] ?? '';
        $confirmPassword = $payload['confirmPassword'] ?? '';

        if (($payload['token'] ?? '') !== 'demo-token') {
            JsonResponse::send(['error' => 'This reset link is invalid or has expired.'], 404);
        }

        if (strlen($password) < 8 || $password !== $confirmPassword) {
            JsonResponse::send(['error' => 'Passwords must match and be at least 8 characters.'], 422);
        }

        JsonResponse::send(['message' => 'Your password has been reset successfully.']);
    }
}
