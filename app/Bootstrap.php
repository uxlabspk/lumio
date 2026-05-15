<?php

declare(strict_types=1);

require __DIR__ . '/Support/helpers.php';

spl_autoload_register(function (string $class): void {
    $prefix = 'App\\';

    if (!str_starts_with($class, $prefix)) {
        return;
    }

    $relativeClass = substr($class, strlen($prefix));
    $file = app_path(str_replace('\\', DIRECTORY_SEPARATOR, $relativeClass) . '.php');

    if (file_exists($file)) {
        require $file;
    }
});

date_default_timezone_set(config('app.timezone', 'Asia/Karachi'));

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
