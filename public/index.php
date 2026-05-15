<?php

declare(strict_types=1);

require dirname(__DIR__) . '/app/Bootstrap.php';

$router = require app_path('routes.php');
$router->dispatch($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);
