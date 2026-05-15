<div class="space-y-6">
    <section class="rounded-lg border border-zinc-200 bg-white p-6">
        <div class="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
                <p class="text-xs font-semibold uppercase tracking-wide text-emerald-700"><?= e($module['eyebrow']) ?></p>
                <h1 class="mt-2 text-2xl font-bold tracking-tight sm:text-3xl"><?= e($module['title']) ?></h1>
                <p class="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-500"><?= e($module['description']) ?></p>
            </div>
            <div class="flex flex-wrap gap-2">
                <button class="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"><?= e($module['primaryAction']) ?></button>
                <button class="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"><?= e($module['secondaryAction']) ?></button>
            </div>
        </div>
    </section>

    <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <?php foreach ($module['metrics'] as $metric): ?>
            <article class="rounded-lg border border-zinc-200 bg-white p-5">
                <p class="text-xs font-medium text-zinc-500"><?= e($metric['label']) ?></p>
                <p class="mt-2 text-2xl font-bold"><?= e($metric['value']) ?></p>
            </article>
        <?php endforeach; ?>
    </section>

    <section class="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
        <div class="overflow-hidden rounded-lg border border-zinc-200 bg-white">
            <div class="flex flex-col gap-3 border-b border-zinc-200 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 class="font-semibold"><?= e($module['title']) ?> Records</h2>
                    <p class="mt-1 text-sm text-zinc-500">Sample operational records. These tables are ready to connect to MySQL models.</p>
                </div>
                <div class="flex gap-2">
                    <button class="rounded-lg border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50">Filter</button>
                    <button class="rounded-lg border border-zinc-200 px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50">Export</button>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-zinc-200 text-left text-sm">
                    <thead class="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500">
                        <tr>
                            <?php foreach ($module['columns'] as $column): ?>
                                <th class="whitespace-nowrap px-5 py-3 font-semibold"><?= e($column) ?></th>
                            <?php endforeach; ?>
                            <th class="whitespace-nowrap px-5 py-3 font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-zinc-100 bg-white">
                        <?php foreach ($module['rows'] as $row): ?>
                            <tr class="hover:bg-zinc-50">
                                <?php foreach ($row as $index => $cell): ?>
                                    <td class="whitespace-nowrap px-5 py-4 <?= $index === 0 ? 'font-medium text-zinc-900' : 'text-zinc-600' ?>"><?= e($cell) ?></td>
                                <?php endforeach; ?>
                                <td class="whitespace-nowrap px-5 py-4">
                                    <button class="text-sm font-medium text-zinc-900 hover:underline">Open</button>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>

        <aside class="space-y-6">
            <div class="rounded-lg border border-zinc-200 bg-white p-5">
                <h2 class="font-semibold">Quick Form</h2>
                <form class="mt-4 space-y-3">
                    <?php foreach ($module['form'] as $field): ?>
                        <label class="block">
                            <span class="mb-1.5 block text-xs font-medium text-zinc-700"><?= e($field) ?></span>
                            <input type="text" class="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none" placeholder="<?= e($field) ?>">
                        </label>
                    <?php endforeach; ?>
                    <button type="button" class="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700">Save draft</button>
                </form>
            </div>

            <div class="rounded-lg border border-zinc-200 bg-white p-5">
                <h2 class="font-semibold">Workflow</h2>
                <div class="mt-4 space-y-3">
                    <?php foreach ($module['workflows'] as $index => $step): ?>
                        <div class="flex gap-3">
                            <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white"><?= $index + 1 ?></span>
                            <div>
                                <p class="text-sm font-medium"><?= e($step) ?></p>
                                <p class="text-xs text-zinc-500">Owner can be assigned later through RBAC.</p>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <div class="rounded-lg border border-emerald-100 bg-emerald-50 p-5">
                <h2 class="font-semibold text-emerald-950">Localization Notes</h2>
                <p class="mt-2 text-sm leading-relaxed text-emerald-800">
                    Keep labels, reports, receipts, and notification templates bilingual. Use CNIC/B-Form fields where identity is involved, and queue SMS/WhatsApp for low-connectivity families.
                </p>
            </div>
        </aside>
    </section>
</div>
