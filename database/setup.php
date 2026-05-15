<?php

declare(strict_types=1);

require dirname(__DIR__) . '/app/Bootstrap.php';

use App\Repositories\ModuleRecordRepository;
use App\Services\SchoolManagementData;

$db = config('database');
$serverDsn = sprintf('mysql:host=%s;port=%s;charset=%s', $db['host'], $db['port'], $db['charset']);
$pdo = new PDO($serverDsn, $db['username'], $db['password'], [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
]);

$pdo->exec(sprintf(
    'CREATE DATABASE IF NOT EXISTS `%s` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci',
    str_replace('`', '``', $db['database'])
));

echo "Database ready: {$db['database']}\n";

$appPdo = App\Core\Database::connection();
$migrationFiles = glob(__DIR__ . '/migrations/*.sql') ?: [];
sort($migrationFiles);

foreach ($migrationFiles as $file) {
    $appPdo->exec(file_get_contents($file));
    echo 'Migrated ' . basename($file) . "\n";
}

$repo = new ModuleRecordRepository();
foreach (SchoolManagementData::modules() as $moduleKey => $module) {
    $repo->seed($moduleKey, $module['columns'], $module['rows']);
    echo "Seed checked: {$moduleKey}\n";
}

echo "Lumio database setup complete.\n";
