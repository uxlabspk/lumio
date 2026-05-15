<section class="px-6 py-20">
    <div class="mx-auto max-w-5xl">
        <div class="mb-12 text-center">
            <h1 class="text-3xl font-bold sm:text-4xl">Early Market Signals</h1>
            <p class="mt-3 text-zinc-500">Positioning examples for school owners, administrators, and teachers.</p>
        </div>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
            <?php foreach ($testimonials as $testimonial): ?>
                <article class="rounded-lg border border-zinc-100 bg-white p-6 shadow-sm">
                    <div class="mb-4 flex gap-0.5">
                        <?php for ($i = 0; $i < 5; $i++): ?>
                            <i data-lucide="star" class="h-4 w-4 fill-amber-400 text-amber-400"></i>
                        <?php endfor; ?>
                    </div>
                    <p class="mb-5 text-sm leading-relaxed text-zinc-600">&ldquo;<?= e($testimonial['quote']) ?>&rdquo;</p>
                    <div class="flex items-center gap-3">
                        <span class="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-white <?= e($testimonial['color']) ?>"><?= e($testimonial['initials']) ?></span>
                        <span>
                            <span class="block text-sm font-semibold"><?= e($testimonial['name']) ?></span>
                            <span class="block text-xs text-zinc-400"><?= e($testimonial['title']) ?></span>
                        </span>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
    </div>
</section>
