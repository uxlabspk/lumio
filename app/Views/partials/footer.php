<footer class="border-t border-zinc-100 bg-white px-6 py-10">
    <div class="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div class="flex items-center gap-2">
            <span class="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 text-xs font-bold text-white">L</span>
            <span class="text-sm font-semibold">Lumio</span>
        </div>
        <p class="text-xs text-zinc-400">© <?= date('Y') ?> Lumio. All rights reserved.</p>
        <div class="flex items-center gap-5 text-xs text-zinc-400">
            <a href="#" class="hover:text-zinc-700">Privacy</a>
            <a href="#" class="hover:text-zinc-700">Terms</a>
            <a href="<?= url('login') ?>" class="hover:text-zinc-700">Sign in</a>
        </div>
    </div>
</footer>
