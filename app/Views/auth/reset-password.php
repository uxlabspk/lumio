<div class="flex min-h-screen items-center justify-center px-6 py-12">
    <div class="w-full max-w-md rounded-lg border border-zinc-200 bg-white p-8 shadow-xl">
        <h1 class="text-2xl font-bold">Set a new password</h1>
        <p class="mt-1 text-sm text-zinc-500">Choose a strong password to secure your Lumio account.</p>

        <div id="tokenStatus" class="mt-8 rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600">Verifying your reset link...</div>

        <form id="resetPasswordForm" class="mt-8 hidden space-y-4">
            <div>
                <label class="mb-1.5 block text-xs font-medium text-zinc-700">New password</label>
                <input id="passwordInput" type="password" required class="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none">
            </div>
            <div>
                <label class="mb-1.5 block text-xs font-medium text-zinc-700">Confirm password</label>
                <input id="confirmPasswordInput" type="password" required class="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none">
            </div>
            <div id="message" class="hidden rounded-lg border px-3 py-2.5 text-sm"></div>
            <button class="flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">
                <i data-lucide="key-round" class="h-4 w-4"></i>
                Reset password
            </button>
        </form>

        <a href="<?= url('login') ?>" class="mt-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900">
            <i data-lucide="arrow-left" class="h-4 w-4"></i>
            Back to sign in
        </a>
    </div>
</div>

<script src="<?= url('assets/js/auth-password.js') ?>"></script>
