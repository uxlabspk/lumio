<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password - Lumio</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Lucide Icons via CDN -->
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        zinc: {
                            50: '#fafafa',
                            100: '#f4f4f5',
                            200: '#e4e4e7',
                            300: '#d4d4d8',
                            400: '#a1a1aa',
                            500: '#71717a',
                            600: '#52525b',
                            700: '#3f3f46',
                            800: '#27272a',
                            900: '#18181b',
                        },
                        red: {
                            50: '#fef2f2',
                            100: '#fee2e2',
                            600: '#dc2626',
                        },
                        emerald: {
                            50: '#ecfdf5',
                            100: '#d1fae5',
                            700: '#047857',
                        }
                    }
                }
            }
        }
    </script>
    <style>
        /* Custom styles for AuthShell-like layout */
        body {
            background-color: #f4f4f5;
        }
        .auth-shell {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 2rem;
        }
        .auth-card {
            width: 100%;
            max-width: 400px;
            background: white;
            border-radius: 1rem;
            border: 1px solid #e4e4e7;
            padding: 2rem;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>
    <div class="auth-shell">
        <div class="auth-card">
            <!-- Header -->
            <div class="mb-8">
                <h2 class="text-2xl font-bold text-zinc-900">Set a new password</h2>
                <p class="mt-1 text-sm text-zinc-500">
                    Choose a strong password to secure your Lumio account.
                </p>
            </div>

            <!-- Token Validation Loading State -->
            <div id="tokenLoadingState" class="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600">
                <i data-lucide="loader-circle" class="h-4 w-4 animate-spin"></i>
                Verifying your reset link...
            </div>

            <!-- Token Error State -->
            <div id="tokenErrorState" class="hidden space-y-4 rounded-lg border border-red-100 bg-red-50 px-4 py-4 text-sm text-red-600">
                <p id="tokenErrorMessage"></p>
                <a href="/forgot-password" class="inline-flex items-center gap-2 font-medium underline underline-offset-4">
                    Request a new reset link
                </a>
            </div>

            <!-- Success Message State -->
            <div id="successMessageState" class="hidden space-y-3 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-4 text-sm text-emerald-700">
                <div class="flex items-center gap-2 font-medium">
                    <i data-lucide="check-circle-2" class="h-4 w-4"></i>
                    Password updated
                </div>
                <p id="successMessageText"></p>
                <p>You'll be redirected to sign in shortly.</p>
            </div>

            <!-- Reset Password Form -->
            <form id="resetPasswordForm" class="hidden space-y-4">
                <!-- New Password Field -->
                <div>
                    <label class="mb-1.5 block text-xs font-medium text-zinc-700">New password</label>
                    <div class="relative">
                        <input
                            type="password"
                            id="passwordInput"
                            name="password"
                            autocomplete="new-password"
                            placeholder="Create a strong password"
                            class="w-full rounded-lg border border-zinc-200 px-3 py-2 pr-10 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400"
                            required
                        >
                        <button
                            type="button"
                            onclick="togglePasswordVisibility()"
                            class="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
                            aria-label="Toggle password visibility"
                        >
                            <i data-lucide="eye" id="passwordIcon" class="h-4 w-4"></i>
                        </button>
                    </div>
                    <p class="mt-1 text-xs text-zinc-500">
                        Use at least 8 characters, including upper and lower case letters and a number.
                    </p>
                </div>

                <!-- Confirm Password Field -->
                <div>
                    <label class="mb-1.5 block text-xs font-medium text-zinc-700">Confirm password</label>
                    <input
                        type="password"
                        id="confirmPasswordInput"
                        name="confirmPassword"
                        autocomplete="new-password"
                        placeholder="Repeat your new password"
                        class="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400"
                        required
                    >
                </div>

                <!-- Form Error Message -->
                <div id="formErrorMessage" class="hidden rounded-lg border border-red-100 bg-red-50 px-3 py-2.5 text-sm text-red-600"></div>

                <!-- Submit Button -->
                <button
                    type="submit"
                    id="submitButton"
                    class="w-full gap-2 rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors flex items-center justify-center"
                >
                    <i data-lucide="key-round" id="submitIcon" class="h-4 w-4"></i>
                    <span id="submitText">Reset password</span>
                </button>
            </form>

            <!-- Back to Sign In Link -->
            <a
                href="/login"
                class="mt-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900"
            >
                <i data-lucide="arrow-left" class="h-4 w-4"></i>
                Back to sign in
            </a>
        </div>
    </div>

    <!-- Initialize Lucide Icons -->
    <script>
        lucide.createIcons();
    </script>

    <!-- Custom JavaScript for Functionality -->
    <script>
        // Get token from URL
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token')?.trim() || '';

        // DOM Elements
        const tokenLoadingState = document.getElementById('tokenLoadingState');
        const tokenErrorState = document.getElementById('tokenErrorState');
        const tokenErrorMessage = document.getElementById('tokenErrorMessage');
        const successMessageState = document.getElementById('successMessageState');
        const successMessageText = document.getElementById('successMessageText');
        const resetPasswordForm = document.getElementById('resetPasswordForm');
        const formErrorMessage = document.getElementById('formErrorMessage');
        const submitButton = document.getElementById('submitButton');
        const submitIcon = document.getElementById('submitIcon');
        const submitText = document.getElementById('submitText');

        // Toggle Password Visibility
        function togglePasswordVisibility() {
            const passwordInput = document.getElementById('passwordInput');
            const confirmPasswordInput = document.getElementById('confirmPasswordInput');
            const passwordIcon = document.getElementById('passwordIcon');

            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                confirmPasswordInput.type = 'text';
                passwordIcon.setAttribute('data-lucide', 'eye-off');
            } else {
                passwordInput.type = 'password';
                confirmPasswordInput.type = 'password';
                passwordIcon.setAttribute('data-lucide', 'eye');
            }
            lucide.createIcons();
        }

        // Validate Token on Page Load
        async function validateToken() {
            if (!token) {
                tokenErrorMessage.textContent = "This reset link is invalid or incomplete.";
                tokenLoadingState.classList.add('hidden');
                tokenErrorState.classList.remove('hidden');
                return;
            }

            try {
                const response = await fetch(`/api/auth/reset-password?token=${encodeURIComponent(token)}`);
                const data = await response.json();

                if (!response.ok || !data.valid) {
                    tokenErrorMessage.textContent = data.error || "This reset link is invalid or has expired.";
                    tokenLoadingState.classList.add('hidden');
                    tokenErrorState.classList.remove('hidden');
                } else {
                    tokenLoadingState.classList.add('hidden');
                    resetPasswordForm.classList.remove('hidden');
                }
            } catch (error) {
                tokenErrorMessage.textContent = "Unable to verify this reset link right now.";
                tokenLoadingState.classList.add('hidden');
                tokenErrorState.classList.remove('hidden');
            }
        }

        // Handle Form Submission
        resetPasswordForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const password = document.getElementById('passwordInput').value;
            const confirmPassword = document.getElementById('confirmPasswordInput').value;

            // Show loading state
            submitButton.disabled = true;
            submitIcon.setAttribute('data-lucide', 'loader-circle');
            submitText.textContent = 'Saving password...';
            lucide.createIcons();
            submitIcon.classList.add('animate-spin');
            formErrorMessage.classList.add('hidden');

            try {
                const response = await fetch("/api/auth/reset-password", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ token, password, confirmPassword }),
                });

                const data = await response.json();

                if (!response.ok) {
                    formErrorMessage.textContent = data.error || "Unable to reset your password.";
                    formErrorMessage.classList.remove('hidden');
                } else {
                    successMessageText.textContent = data.message || "Your password has been reset successfully.";
                    resetPasswordForm.classList.add('hidden');
                    successMessageState.classList.remove('hidden');

                    // Redirect to login after 1.8 seconds
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 1800);
                }
            } catch (error) {
                formErrorMessage.textContent = "Unable to reset your password.";
                formErrorMessage.classList.remove('hidden');
            } finally {
                submitButton.disabled = false;
                submitIcon.setAttribute('data-lucide', 'key-round');
                submitText.textContent = 'Reset password';
                lucide.createIcons();
                submitIcon.classList.remove('animate-spin');
            }
        });

        // Initialize token validation
        validateToken();
    </script>
</body>
</html>
