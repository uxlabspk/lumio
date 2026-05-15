<section class="px-6 py-24">
    <div class="mx-auto max-w-4xl text-center">
        <span class="mb-6 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-medium text-emerald-700">
            <i data-lucide="map-pin" class="h-3 w-3"></i>
            Built for Pakistani schools
        </span>
        <h1 class="text-4xl font-bold leading-tight tracking-tight sm:text-6xl">The school management system for Pakistan.</h1>
        <p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-500">
            Lumio brings student records, attendance, fees, exams, parent communication, and bilingual workflows into one Hostinger-friendly PHP system.
        </p>
        <div class="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="<?= url('login') ?>" class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-700 sm:w-auto">
                Start pilot
                <i data-lucide="chevron-right" class="h-4 w-4"></i>
            </a>
            <a href="<?= url('features') ?>" class="inline-flex w-full items-center justify-center rounded-xl border border-zinc-200 px-6 py-3 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 sm:w-auto">
                See modules
            </a>
        </div>
    </div>
</section>

<section class="border-y border-zinc-100 bg-zinc-50 px-6 py-16">
    <div class="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <?php foreach (['Urdu + English UI', 'Offline-first planning', 'Local payments ready', 'Mobile API foundation'] as $item): ?>
            <div class="rounded-lg border border-zinc-200 bg-white p-4 text-sm font-medium text-zinc-700"><?= e($item) ?></div>
        <?php endforeach; ?>
    </div>
</section>

<?php require app_path('Views/pages/features-grid.php'); ?>
