<div class="flex min-h-screen items-center justify-center px-6 py-12">
    <div class="w-full max-w-md rounded-lg border border-zinc-200 bg-white p-8 shadow-xl">
        <h1 class="text-2xl font-bold">Forgot password?</h1>
        <p class="mt-1 text-sm text-zinc-500">Enter your email and we will send a secure reset link.</p>

        <form id="forgotPasswordForm" class="mt-8 space-y-4">
            <div>
                <label class="mb-1.5 block text-xs font-medium text-zinc-700">Email</label>
                <input id="emailInput" type="email" required class="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-zinc-500 focus:outline-none" placeholder="admin@lumio.pk">
            </div>
            <div id="message" class="hidden rounded-lg border px-3 py-2.5 text-sm"></div>
            <button class="flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">
                <i data-lucide="mail" class="h-4 w-4"></i>
                Send reset link
            </button>
        </form>

        <a href="<?= url('login') ?>" class="mt-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900">
            <i data-lucide="arrow-left" class="h-4 w-4"></i>
            Back to sign in
        </a>
    </div>
</div>

<script src="<?= url('assets/js/auth-password.js') ?>"></script>
