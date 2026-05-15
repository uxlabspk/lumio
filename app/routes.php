<?php

declare(strict_types=1);

use App\Core\Router;
use App\Http\Controllers\Api\AuthController as ApiAuthController;
use App\Http\Controllers\Web\AuthController;
use App\Http\Controllers\Web\DashboardController;
use App\Http\Controllers\Web\MarketingController;

$router = new Router();

$router->get('/', [MarketingController::class, 'home']);
$router->get('/features', [MarketingController::class, 'features']);
$router->get('/pricing', [MarketingController::class, 'pricing']);
$router->get('/testimonials', [MarketingController::class, 'testimonials']);

$router->get('/login', [AuthController::class, 'showLogin']);
$router->post('/login', [AuthController::class, 'login']);
$router->get('/logout', [AuthController::class, 'logout']);
$router->get('/forgot-password', [AuthController::class, 'forgotPassword']);
$router->get('/reset-password', [AuthController::class, 'resetPassword']);
$router->get('/dashboard', [DashboardController::class, 'index']);

$router->post('/api/auth/forgot-password', [ApiAuthController::class, 'forgotPassword']);
$router->get('/api/auth/reset-password', [ApiAuthController::class, 'validateResetToken']);
$router->post('/api/auth/reset-password', [ApiAuthController::class, 'resetPassword']);
$router->get('/api/health', fn () => App\Core\JsonResponse::send([
    'ok' => true,
    'app' => config('app.name'),
    'time' => date(DATE_ATOM),
]));

return $router;
