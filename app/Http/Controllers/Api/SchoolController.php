<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Core\JsonResponse;
use App\Services\SchoolManagementData;

final class SchoolController
{
    public function dashboard(): void
    {
        JsonResponse::send([
            'school' => 'The City Grammar School',
            'dashboard' => SchoolManagementData::dashboard(),
        ]);
    }

    public function modules(): void
    {
        JsonResponse::send([
            'navigation' => SchoolManagementData::navigation(),
            'modules' => SchoolManagementData::modules(),
        ]);
    }
}
