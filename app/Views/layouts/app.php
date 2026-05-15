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
    <?php
    $currentPath = trim(parse_url($_SERVER['REQUEST_URI'] ?? '/dashboard', PHP_URL_PATH) ?: '/dashboard', '/');
    $navItems = $navigation ?? App\Services\SchoolManagementData::navigation();
    ?>
    <div class="flex min-h-screen">
        <aside class="hidden w-72 shrink-0 border-r border-zinc-200 bg-white p-5 lg:block">
            <a href="<?= url('dashboard') ?>" class="flex items-center gap-2.5">
                <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-sm font-bold text-white">L</span>
                <span>
                    <span class="block font-semibold">Lumio</span>
                    <span class="block text-xs text-zinc-500">School Management</span>
                </span>
            </a>
            <div class="mt-6 rounded-lg border border-emerald-100 bg-emerald-50 p-3">
                <p class="text-xs font-semibold text-emerald-900">Pakistan-ready</p>
                <p class="mt-1 text-xs leading-relaxed text-emerald-700">Urdu/English, B-Form/CNIC, WhatsApp/SMS, local payments, low-bandwidth workflows.</p>
            </div>
            <nav class="mt-6 space-y-1 text-sm">
                <?php foreach ($navItems as $item): ?>
                    <?php $active = $currentPath === $item['path'] || ($currentPath === '' && $item['path'] === 'dashboard'); ?>
                    <a class="flex items-center gap-2 rounded-lg px-3 py-2 font-medium <?= $active ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900' ?>" href="<?= url($item['path']) ?>">
                        <i data-lucide="<?= e($item['icon']) ?>" class="h-4 w-4"></i>
                        <?= e($item['label']) ?>
                    </a>
                <?php endforeach; ?>
            </nav>
        </aside>
        <div class="flex-1">
            <header class="sticky top-0 z-30 flex min-h-16 items-center justify-between gap-4 border-b border-zinc-200 bg-white px-5 py-3">
                <div>
                    <p class="text-xs text-zinc-500">The City Grammar School</p>
                    <p class="text-sm font-semibold"><?= e($title ?? 'Dashboard') ?></p>
                </div>
                <nav class="flex gap-2 overflow-x-auto lg:hidden">
                    <?php foreach ($navItems as $item): ?>
                        <?php $active = $currentPath === $item['path']; ?>
                        <a class="whitespace-nowrap rounded-lg border px-3 py-2 text-xs font-medium <?= $active ? 'border-zinc-900 bg-zinc-900 text-white' : 'border-zinc-200 bg-white text-zinc-600' ?>" href="<?= url($item['path']) ?>">
                            <?= e($item['label']) ?>
                        </a>
                    <?php endforeach; ?>
                </nav>
                <div class="flex items-center gap-3">
                    <div class="hidden text-right sm:block">
                        <p class="text-xs text-zinc-500">Signed in as</p>
                        <p class="text-sm font-semibold"><?= e($_SESSION['user']['name'] ?? 'User') ?></p>
                    </div>
                    <a href="<?= url('logout') ?>" class="rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50">Logout</a>
                </div>
            </header>
            <main class="p-4 sm:p-6">
                <?= $content ?>
            </main>
        </div>
    </div>
    <script>lucide.createIcons();</script>
</body>
</html>
