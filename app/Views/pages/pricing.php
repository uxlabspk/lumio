<section class="bg-zinc-50 px-6 py-20">
    <div class="mx-auto max-w-5xl">
        <div class="mb-12 text-center">
            <h1 class="text-3xl font-bold sm:text-4xl">Pricing Direction</h1>
            <p class="mt-3 text-zinc-500">Keep adoption easy: free pilot, affordable school plan, and custom pricing for networks.</p>
        </div>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
            <?php foreach ($plans as $plan): ?>
                <article class="rounded-lg border p-7 <?= $plan['highlighted'] ? 'border-zinc-900 bg-zinc-900 text-white shadow-xl' : 'border-zinc-100 bg-white text-zinc-900 shadow-sm' ?>">
                    <p class="mb-3 text-xs font-semibold uppercase tracking-wide <?= $plan['highlighted'] ? 'text-zinc-400' : 'text-zinc-500' ?>"><?= e($plan['name']) ?></p>
                    <div class="mb-1 flex items-end gap-1">
                        <span class="text-4xl font-bold"><?= e($plan['price']) ?></span>
                        <span class="mb-1 text-sm <?= $plan['highlighted'] ? 'text-zinc-400' : 'text-zinc-500' ?>"><?= e($plan['period']) ?></span>
                    </div>
                    <p class="mb-6 text-xs <?= $plan['highlighted'] ? 'text-zinc-400' : 'text-zinc-500' ?>"><?= e($plan['description']) ?></p>
                    <ul class="mb-7 space-y-2.5">
                        <?php foreach ($plan['features'] as $item): ?>
                            <li class="flex items-center gap-2 text-xs <?= $plan['highlighted'] ? 'text-zinc-300' : 'text-zinc-600' ?>">
                                <i data-lucide="check-circle-2" class="h-3.5 w-3.5 text-emerald-500"></i>
                                <?= e($item) ?>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                    <a href="<?= url('login') ?>" class="block rounded-xl py-2.5 text-center text-sm font-semibold <?= $plan['highlighted'] ? 'bg-white text-zinc-900 hover:bg-zinc-100' : 'bg-zinc-900 text-white hover:bg-zinc-700' ?>">Start pilot</a>
                </article>
            <?php endforeach; ?>
        </div>
    </div>
</section>
