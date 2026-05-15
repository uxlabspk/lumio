<header class="fixed inset-x-0 top-0 z-50 border-b border-zinc-100 bg-white/85 backdrop-blur">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="<?= url() ?>" class="flex items-center gap-2.5">
            <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-sm font-bold text-white">L</span>
            <span class="text-base font-semibold">Lumio</span>
        </a>
        <nav class="hidden items-center gap-7 text-sm text-zinc-600 md:flex">
            <a href="<?= url('features') ?>" class="hover:text-zinc-900">Features</a>
            <a href="<?= url('testimonials') ?>" class="hover:text-zinc-900">Testimonials</a>
            <a href="<?= url('pricing') ?>" class="hover:text-zinc-900">Pricing</a>
        </nav>
        <div class="flex items-center gap-3">
            <a href="<?= url('login') ?>" class="text-sm font-medium text-zinc-700 hover:text-zinc-900">Sign in</a>
            <a href="<?= url('login') ?>" class="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700">Get started</a>
        </div>
    </div>
</header>
