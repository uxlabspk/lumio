<?php

declare(strict_types=1);

return [
    'driver' => 'mysql',
    'host' => env_value('DB_HOST', 'localhost'),
    'port' => env_value('DB_PORT', '3306'),
    'database' => env_value('DB_DATABASE', 'lumio'),
    'username' => env_value('DB_USERNAME', 'root'),
    'password' => env_value('DB_PASSWORD', 'root'),
    'charset' => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
];
