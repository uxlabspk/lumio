<div class="space-y-6">
    <section class="overflow-hidden rounded-lg border border-zinc-200 bg-white">
        <div class="grid gap-0 lg:grid-cols-[1.25fr_0.75fr]">
            <div class="p-6">
                <p class="text-xs font-semibold uppercase tracking-wide text-emerald-700"><?= e($dashboard['hero']['eyebrow']) ?></p>
                <h1 class="mt-2 text-2xl font-bold tracking-tight sm:text-3xl"><?= e($dashboard['hero']['title']) ?></h1>
                <p class="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-500"><?= e($dashboard['hero']['description']) ?></p>
                <div class="mt-5 flex flex-wrap gap-2">
                    <?php foreach ($dashboard['hero']['actions'] as $action): ?>
                        <a href="<?= url($action['path']) ?>" class="rounded-lg px-4 py-2 text-sm font-medium <?= $action['primary'] ? 'bg-zinc-900 text-white hover:bg-zinc-700' : 'border border-zinc-200 text-zinc-700 hover:bg-zinc-50' ?>"><?= e($action['label']) ?></a>
                    <?php endforeach; ?>
                </div>
            </div>
            <div class="border-t border-zinc-200 bg-zinc-50 p-6 lg:border-l lg:border-t-0">
                <p class="text-sm font-semibold">Today</p>
                <div class="mt-4 space-y-3">
                    <?php foreach ($dashboard['today'] as $event): ?>
                        <div class="flex gap-3 rounded-lg bg-white p-3 ring-1 ring-zinc-200">
                            <span class="w-12 shrink-0 text-xs font-semibold text-zinc-500"><?= e($event['time']) ?></span>
                            <span>
                                <span class="block text-sm font-medium"><?= e($event['title']) ?></span>
                                <span class="block text-xs text-zinc-500"><?= e($event['meta']) ?></span>
                            </span>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </section>

    <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <?php foreach ($dashboard['stats'] as $stat): ?>
            <article class="rounded-lg border border-zinc-200 bg-white p-5">
                <div class="flex items-center justify-between">
                    <p class="text-xs font-medium text-zinc-500"><?= e($stat['label']) ?></p>
                    <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100">
                        <i data-lucide="<?= e($stat['icon']) ?>" class="h-4 w-4 text-zinc-700"></i>
                    </span>
                </div>
                <p class="mt-3 text-2xl font-bold"><?= e($stat['value']) ?></p>
                <p class="mt-1 text-xs text-zinc-500"><?= e($stat['trend']) ?></p>
            </article>
        <?php endforeach; ?>
    </section>

    <section class="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
        <div class="rounded-lg border border-zinc-200 bg-white">
            <div class="flex items-center justify-between border-b border-zinc-200 p-5">
                <div>
                    <h2 class="font-semibold">Module Launchpad</h2>
                    <p class="mt-1 text-sm text-zinc-500">Open the areas schools use every day.</p>
                </div>
                <a href="<?= url('reports') ?>" class="text-sm font-medium text-zinc-700 hover:text-zinc-950">View reports</a>
            </div>
            <div class="grid grid-cols-1 gap-px bg-zinc-200 sm:grid-cols-2 xl:grid-cols-3">
                <?php foreach ($navigation as $item): ?>
                    <?php if ($item['path'] === 'dashboard') continue; ?>
                    <a href="<?= url($item['path']) ?>" class="group bg-white p-5 hover:bg-zinc-50">
                        <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 group-hover:bg-zinc-900">
                            <i data-lucide="<?= e($item['icon']) ?>" class="h-4 w-4 text-zinc-700 group-hover:text-white"></i>
                        </span>
                        <span class="mt-3 block text-sm font-semibold"><?= e($item['label']) ?></span>
                        <span class="mt-1 block text-xs leading-relaxed text-zinc-500"><?= e($modules[$item['path']]['description'] ?? 'Manage school operations and records.') ?></span>
                    </a>
                <?php endforeach; ?>
            </div>
        </div>

        <aside class="space-y-6">
            <div class="rounded-lg border border-zinc-200 bg-white p-5">
                <h2 class="font-semibold">Attention Needed</h2>
                <div class="mt-4 space-y-3">
                    <?php foreach ($dashboard['alerts'] as $alert): ?>
                        <div class="rounded-lg border border-amber-100 bg-amber-50 p-3">
                            <p class="text-sm font-medium text-amber-950"><?= e($alert['label']) ?></p>
                            <p class="mt-1 text-xs text-amber-700"><?= e($alert['value']) ?></p>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
            <div class="rounded-lg border border-zinc-200 bg-white p-5">
                <h2 class="font-semibold">Fee Collection Trend</h2>
                <div class="mt-5 flex h-36 items-end gap-2">
                    <?php foreach ($dashboard['feeSeries'] as $i => $height): ?>
                        <div class="flex-1 rounded-t bg-zinc-900" style="height: <?= (int) $height ?>%"></div>
                    <?php endforeach; ?>
                </div>
                <p class="mt-3 text-xs text-zinc-500">Last 7 fee collection cycles. Replace with MySQL-backed finance analytics later.</p>
            </div>
        </aside>
    </section>
</div>
