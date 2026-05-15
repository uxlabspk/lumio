<?php

declare(strict_types=1);

require dirname(__DIR__) . '/app/Bootstrap.php';

use App\Repositories\ModuleRecordRepository;
use App\Services\SchoolManagementData;

$repo = new ModuleRecordRepository();

foreach (SchoolManagementData::modules() as $moduleKey => $module) {
    $repo->seed($moduleKey, $module['columns'], $module['rows']);
    echo "Seeded {$moduleKey}\n";
}
