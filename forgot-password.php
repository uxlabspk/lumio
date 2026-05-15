<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forgot Password - Lumio</title>
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
                <h2 class="text-2xl font-bold text-zinc-900">Forgot password?</h2>
                <p class="mt-1 text-sm text-zinc-500">
                    Enter your email and we'll send you a secure reset link.
                </p>
            </div>

            <!-- Forgot Password Form -->
            <form id="forgotPasswordForm" class="space-y-4">
                <!-- Email Field -->
                <div>
                    <label class="mb-1.5 block text-xs font-medium text-zinc-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="emailInput"
                        placeholder="your@school.edu"
                        required
                        autocomplete="email"
                        class="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400"
                    >
                </div>

                <!-- Error Message (Hidden by Default) -->
                <div id="errorMessage" class="hidden rounded-lg border border-red-100 bg-red-50 px-3 py-2.5 text-sm text-red-600"></div>

                <!-- Success Message (Hidden by Default) -->
                <div id="successMessage" class="hidden space-y-3 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-3 text-sm text-emerald-700">
                    <p id="successMessageText"></p>
                    <a id="resetLink" href="#" class="font-medium underline underline-offset-4 hidden"></a>
                </div>

                <!-- Submit Button -->
                <button
                    type="submit"
                    id="submitButton"
                    class="w-full gap-2 rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors flex items-center justify-center"
                >
                    <i data-lucide="mail" id="submitIcon" class="h-4 w-4"></i>
                    <span id="submitText">Send reset link</span>
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
        document.getElementById('forgotPasswordForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            const submitButton = document.getElementById('submitButton');
            const submitIcon = document.getElementById('submitIcon');
            const submitText = document.getElementById('submitText');
            const errorMessage = document.getElementById('errorMessage');
            const successMessage = document.getElementById('successMessage');
            const successMessageText = document.getElementById('successMessageText');
            const resetLink = document.getElementById('resetLink');
            const emailInput = document.getElementById('emailInput');

            // Show loading state
            submitButton.disabled = true;
            submitIcon.setAttribute('data-lucide', 'loader-circle');
            submitText.textContent = 'Sending link...';
            lucide.createIcons();
            submitIcon.classList.add('animate-spin');

            // Hide previous messages
            errorMessage.classList.add('hidden');
            successMessage.classList.add('hidden');

            // Simulate API call
            try {
                // Replace with actual API endpoint
                const response = await fetch("/api/auth/forgot-password", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: emailInput.value }),
                });

                const data = await response.json();

                if (!response.ok) {
                    // Show error message
                    errorMessage.textContent = data.error || "Unable to send reset instructions.";
                    errorMessage.classList.remove('hidden');
                } else {
                    // Show success message
                    successMessageText.textContent = data.message || "If an account exists for that email, a password reset link has been sent.";
                    successMessage.classList.remove('hidden');

                    // Show debug reset link if available
                    if (data.debugResetUrl) {
                        resetLink.href = data.debugResetUrl;
                        resetLink.textContent = "Open reset link";
                        resetLink.classList.remove('hidden');
                    }

                    // Clear email field
                    emailInput.value = "";
                }
            } catch (error) {
                // Show generic error
                errorMessage.textContent = "Unable to send reset instructions.";
                errorMessage.classList.remove('hidden');
            } finally {
                // Reset button state
                submitButton.disabled = false;
                submitIcon.setAttribute('data-lucide', 'mail');
                submitText.textContent = 'Send reset link';
                lucide.createIcons();
                submitIcon.classList.remove('animate-spin');
            }
        });
    </script>
</body>
</html>
