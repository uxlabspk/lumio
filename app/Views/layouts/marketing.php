<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= e($title ?? config('app.name')) ?> - <?= e(config('app.name')) ?></title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
</head>
<body class="min-h-screen bg-white text-zinc-900">
    <?php require app_path('Views/partials/marketing-nav.php'); ?>
    <main class="pt-20">
        <?= $content ?>
    </main>
    <?php require app_path('Views/partials/footer.php'); ?>
    <script>lucide.createIcons();</script>
</body>
</html>
