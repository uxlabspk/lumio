<?php

declare(strict_types=1);

namespace App\Core;

final class View
{
    public static function render(string $view, array $data = [], ?string $layout = 'layouts/marketing'): void
    {
        $viewFile = app_path('Views/' . str_replace('.', '/', $view) . '.php');

        if (!file_exists($viewFile)) {
            http_response_code(500);
            echo 'View not found.';
            return;
        }

        extract($data, EXTR_SKIP);

        ob_start();
        require $viewFile;
        $content = ob_get_clean();

        if ($layout === null) {
            echo $content;
            return;
        }

        $layoutFile = app_path('Views/' . str_replace('.', '/', $layout) . '.php');
        require $layoutFile;
    }
}
