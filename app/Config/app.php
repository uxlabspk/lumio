<?php

declare(strict_types=1);

return [
    'name' => env_value('APP_NAME', 'Lumio'),
    'env' => env_value('APP_ENV', 'local'),
    'debug' => env_value('APP_DEBUG', true),
    'timezone' => env_value('APP_TIMEZONE', 'Asia/Karachi'),
    'locale' => env_value('APP_LOCALE', 'en'),
    'fallback_locale' => 'en',
    'supported_locales' => ['en', 'ur'],
];
