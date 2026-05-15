<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= e($title ?? 'Dashboard') ?> - <?= e(config('app.name')) ?></title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
</head>
<body class="min-h-screen bg-zinc-50 text-zinc-900">
    <div class="flex min-h-screen">
        <aside class="hidden w-64 border-r border-zinc-200 bg-white p-5 md:block">
            <a href="<?= url('dashboard') ?>" class="flex items-center gap-2.5">
                <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-sm font-bold text-white">L</span>
                <span class="font-semibold">Lumio</span>
            </a>
            <nav class="mt-8 space-y-1 text-sm">
                <a class="flex items-center gap-2 rounded-lg bg-zinc-100 px-3 py-2 font-medium" href="<?= url('dashboard') ?>"><i data-lucide="layout-dashboard" class="h-4 w-4"></i>Dashboard</a>
                <a class="flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-600 hover:bg-zinc-100" href="#"><i data-lucide="users" class="h-4 w-4"></i>Students</a>
                <a class="flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-600 hover:bg-zinc-100" href="#"><i data-lucide="calendar-check" class="h-4 w-4"></i>Attendance</a>
                <a class="flex items-center gap-2 rounded-lg px-3 py-2 text-zinc-600 hover:bg-zinc-100" href="#"><i data-lucide="receipt" class="h-4 w-4"></i>Fees</a>
            </nav>
        </aside>
        <div class="flex-1">
            <header class="flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-5">
                <div>
                    <p class="text-xs text-zinc-500">Signed in as</p>
                    <p class="text-sm font-semibold"><?= e($_SESSION['user']['name'] ?? 'User') ?></p>
                </div>
                <a href="<?= url('logout') ?>" class="rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50">Logout</a>
            </header>
            <main class="p-5">
                <?= $content ?>
            </main>
        </div>
    </div>
    <script>lucide.createIcons();</script>
</body>
</html>
