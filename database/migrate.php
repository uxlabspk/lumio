<?php

declare(strict_types=1);

require dirname(__DIR__) . '/app/Bootstrap.php';

use App\Core\Database;

$pdo = Database::connection();
$migrationFiles = glob(__DIR__ . '/migrations/*.sql') ?: [];
sort($migrationFiles);

foreach ($migrationFiles as $file) {
    $pdo->exec(file_get_contents($file));
    echo 'Migrated ' . basename($file) . PHP_EOL;
}
