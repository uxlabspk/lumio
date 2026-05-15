<div class="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
    <?php foreach ($features as $feature): ?>
        <article class="rounded-lg border border-zinc-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div class="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100">
                <i data-lucide="<?= e($feature['icon']) ?>" class="h-4 w-4 text-zinc-700"></i>
            </div>
            <h2 class="mb-1.5 text-sm font-semibold"><?= e($feature['title']) ?></h2>
            <p class="text-xs leading-relaxed text-zinc-500"><?= e($feature['description']) ?></p>
        </article>
    <?php endforeach; ?>
</div>
