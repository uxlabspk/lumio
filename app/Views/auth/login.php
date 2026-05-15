<div class="flex min-h-screen items-center justify-center px-6 py-12">
    <div class="w-full max-w-md rounded-lg border border-zinc-200 bg-white p-8 shadow-xl">
        <div class="mb-8">
            <a href="<?= url() ?>" class="mb-6 inline-flex items-center gap-2 text-sm font-semibold">
                <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white">L</span>
                Lumio
            </a>
            <h1 class="text-2xl font-bold">Welcome back</h1>
            <p class="mt-1 text-sm text-zinc-500">Sign in to continue to your school workspace.</p>
        </div>

        <form method="POST" action="<?= url('login') ?>" class="space-y-4">
            <div>
                <label class="mb-1.5 block text-xs font-medium text-zinc-700">Email</label>
                <input name="email" type="email" required autocomplete="email" value="<?= e($email ?? '') ?>" class="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none" placeholder="admin@lumio.pk">
            </div>
            <div>
                <div class="mb-1.5 flex items-center justify-between">
                    <label class="text-xs font-medium text-zinc-700">Password</label>
                    <a href="<?= url('forgot-password') ?>" class="text-xs text-zinc-500 hover:text-zinc-900">Forgot password?</a>
                </div>
                <input name="password" type="password" required autocomplete="current-password" class="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none" placeholder="Enter your password">
            </div>

            <?php if (!empty($error)): ?>
                <div class="rounded-lg border border-red-100 bg-red-50 px-3 py-2.5 text-sm text-red-600"><?= e($error) ?></div>
            <?php endif; ?>

            <button type="submit" class="flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">
                <i data-lucide="log-in" class="h-4 w-4"></i>
                Sign in
            </button>
        </form>

        <div class="mt-6">
            <p class="mb-3 text-center text-xs text-zinc-400">Demo accounts</p>
            <div class="grid grid-cols-3 gap-2 text-xs">
                <button type="button" data-email="admin@lumio.pk" data-password="Admin1234!" class="demo rounded-lg border border-zinc-200 px-2 py-1.5 font-medium text-zinc-600 hover:bg-zinc-50">Admin</button>
                <button type="button" data-email="teacher@lumio.pk" data-password="Teacher123!" class="demo rounded-lg border border-zinc-200 px-2 py-1.5 font-medium text-zinc-600 hover:bg-zinc-50">Teacher</button>
                <button type="button" data-email="student@lumio.pk" data-password="Student123!" class="demo rounded-lg border border-zinc-200 px-2 py-1.5 font-medium text-zinc-600 hover:bg-zinc-50">Student</button>
            </div>
        </div>
    </div>
</div>

<script>
document.querySelectorAll('.demo').forEach((button) => {
    button.addEventListener('click', () => {
        document.querySelector('[name="email"]').value = button.dataset.email;
        document.querySelector('[name="password"]').value = button.dataset.password;
    });
});
</script>
