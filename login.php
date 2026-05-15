<?php
session_start();

// Simple in-memory user database (in production, use a real database with hashed passwords)
$users = [
    'admin@lumio.edu' => [
        'password' => 'Admin1234!',
        'role' => 'admin',
        'name' => 'Admin User'
    ],
    'teacher@lumio.edu' => [
        'password' => 'Teacher123!',
        'role' => 'teacher',
        'name' => 'Teacher User'
    ],
    'student@lumio.edu' => [
        'password' => 'Student123!',
        'role' => 'student',
        'name' => 'Student User'
    ]
];

// Language translations
$translations = [
    'en' => [
        'welcomeBack' => 'Welcome back',
        'signInContinue' => 'Sign in to continue to your account',
        'email' => 'Email',
        'password' => 'Password',
        'forgotPassword' => 'Forgot password?',
        'signIn' => 'Sign in',
        'signingIn' => 'Signing in...',
        'quickLoginDemo' => 'Quick login with demo accounts',
        'invalidCredentials' => 'Invalid email or password',
        'admin' => 'Admin',
        'teacher' => 'Teacher',
        'student' => 'Student',
        'dontHaveAccount' => 'Don\'t have an account?',
        'contactAdmin' => 'Contact your administrator',
        'showPassword' => 'Show password',
        'hidePassword' => 'Hide password'
    ],
    'es' => [
        'welcomeBack' => 'Bienvenido de nuevo',
        'signInContinue' => 'Inicia sesión para continuar',
        'email' => 'Correo electrónico',
        'password' => 'Contraseña',
        'forgotPassword' => '¿Olvidaste tu contraseña?',
        'signIn' => 'Iniciar sesión',
        'signingIn' => 'Iniciando sesión...',
        'quickLoginDemo' => 'Acceso rápido con cuentas demo',
        'invalidCredentials' => 'Correo o contraseña inválidos',
        'admin' => 'Administrador',
        'teacher' => 'Profesor',
        'student' => 'Estudiante',
        'dontHaveAccount' => '¿No tienes una cuenta?',
        'contactAdmin' => 'Contacta al administrador',
        'showPassword' => 'Mostrar contraseña',
        'hidePassword' => 'Ocultar contraseña'
    ]
];

// Get current language from session or default to English
$lang = $_SESSION['lang'] ?? 'en';
if (isset($_GET['lang']) && in_array($_GET['lang'], ['en', 'es'])) {
    $lang = $_GET['lang'];
    $_SESSION['lang'] = $lang;
    // Redirect to remove query param to avoid double language setting
    header("Location: " . strtok($_SERVER["REQUEST_URI"], '?'));
    exit;
}

// Translation function
function t($key) {
    global $translations, $lang;
    return $translations[$lang][$key] ?? $key;
}

// Handle form submission
$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    
    if (isset($users[$email]) && $users[$email]['password'] === $password) {
        $_SESSION['user'] = [
            'email' => $email,
            'role' => $users[$email]['role'],
            'name' => $users[$email]['name']
        ];
        header("Location: /dashboard.php");
        exit;
    } else {
        $error = t('invalidCredentials');
    }
}

// If already logged in, redirect to dashboard
if (isset($_SESSION['user'])) {
    header("Location: /dashboard.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="<?php echo $lang; ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo t('welcomeBack'); ?> - Lumio</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        /* Custom focus ring to match the original design */
        input:focus {
            outline: none;
            ring: 2px solid #e4e4e7;
            ring-offset: 2px;
        }
    </style>
</head>
<body class="bg-zinc-50 antialiased">
    <div class="relative min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <!-- Language Toggle positioned top right -->
        <div class="absolute top-4 right-4 sm:top-6 sm:right-6">
            <div class="flex gap-2">
                <a href="?lang=en" class="text-xs font-medium px-2 py-1 rounded <?php echo $lang === 'en' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-600 hover:bg-zinc-100'; ?> transition-colors">EN</a>
                <a href="?lang=es" class="text-xs font-medium px-2 py-1 rounded <?php echo $lang === 'es' ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-600 hover:bg-zinc-100'; ?> transition-colors">ES</a>
            </div>
        </div>

        <!-- Auth Shell Container - Centered Card -->
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow-xl rounded-lg border border-zinc-200 sm:px-10">
                <!-- Header -->
                <div class="mb-8">
                    <h2 class="text-2xl font-bold text-zinc-900"><?php echo t('welcomeBack'); ?></h2>
                    <p class="mt-1 text-sm text-zinc-500"><?php echo t('signInContinue'); ?></p>
                </div>

                <!-- Login Form -->
                <form method="POST" action="" id="loginForm" class="space-y-4">
                    <!-- Email Field -->
                    <div>
                        <label class="mb-1.5 block text-xs font-medium text-zinc-700"><?php echo t('email'); ?></label>
                        <input type="email" name="email" required autocomplete="email"
                               class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-400 focus:border-transparent transition-shadow text-sm"
                               placeholder="your@school.edu" value="<?php echo htmlspecialchars($_POST['email'] ?? ''); ?>">
                    </div>

                    <!-- Password Field with Show/Hide -->
                    <div>
                        <div class="mb-1.5 flex items-center justify-between">
                            <label class="text-xs font-medium text-zinc-700"><?php echo t('password'); ?></label>
                            <a href="/forgot-password" class="text-xs text-zinc-500 hover:text-zinc-900 transition-colors">
                                <?php echo t('forgotPassword'); ?>
                            </a>
                        </div>
                        <div class="relative">
                            <input type="password" name="password" id="password" required autocomplete="current-password"
                                   class="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-400 focus:border-transparent transition-shadow text-sm pr-10"
                                   placeholder="Enter your password">
                            <button type="button" id="togglePassword"
                                    class="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors"
                                    aria-label="<?php echo t('showPassword'); ?>">
                                <i data-lucide="eye" class="h-4 w-4"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Error Message -->
                    <?php if ($error): ?>
                        <div class="rounded-lg border border-red-100 bg-red-50 px-3 py-2.5 text-sm text-red-600">
                            <?php echo htmlspecialchars($error); ?>
                        </div>
                    <?php endif; ?>

                    <!-- Submit Button -->
                    <button type="submit" id="submitBtn"
                            class="w-full inline-flex justify-center items-center gap-2 px-4 py-2 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900 transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
                        <i data-lucide="log-in" class="h-4 w-4"></i>
                        <span id="btnText"><?php echo t('signIn'); ?></span>
                    </button>
                </form>

                <!-- Demo Accounts Quick Login -->
                <div class="mt-6">
                    <p class="mb-3 text-center text-xs text-zinc-400"><?php echo t('quickLoginDemo'); ?></p>
                    <div class="grid grid-cols-3 gap-2">
                        <button type="button" class="demo-btn rounded-lg border border-zinc-200 px-2 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50"
                                data-email="admin@lumio.edu" data-password="Admin1234!">
                            <?php echo t('admin'); ?>
                        </button>
                        <button type="button" class="demo-btn rounded-lg border border-zinc-200 px-2 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50"
                                data-email="teacher@lumio.edu" data-password="Teacher123!">
                            <?php echo t('teacher'); ?>
                        </button>
                        <button type="button" class="demo-btn rounded-lg border border-zinc-200 px-2 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-50"
                                data-email="student@lumio.edu" data-password="Student123!">
                            <?php echo t('student'); ?>
                        </button>
                    </div>
                </div>

                <!-- Register / Contact Administrator Link -->
                <p class="mt-6 text-center text-xs text-zinc-500">
                    <?php echo t('dontHaveAccount'); ?>
                    <a href="/register" class="font-medium text-zinc-900 hover:underline transition-colors">
                        <?php echo t('contactAdmin'); ?>
                    </a>
                </p>
            </div>
        </div>
    </div>

    <script>
        // Initialize Lucide icons
        lucide.createIcons();

        // Toggle password visibility
        const toggleBtn = document.getElementById('togglePassword');
        const passwordInput = document.getElementById('password');
        let isPasswordVisible = false;

        if (toggleBtn && passwordInput) {
            toggleBtn.addEventListener('click', function() {
                isPasswordVisible = !isPasswordVisible;
                passwordInput.type = isPasswordVisible ? 'text' : 'password';
                
                // Update icon
                const icon = toggleBtn.querySelector('i');
                if (icon) {
                    icon.setAttribute('data-lucide', isPasswordVisible ? 'eye-off' : 'eye');
                    lucide.createIcons();
                }
                
                toggleBtn.setAttribute('aria-label', isPasswordVisible ? '<?php echo t('hidePassword'); ?>' : '<?php echo t('showPassword'); ?>');
            });
        }

        // Demo account buttons - fill email and password
        const demoBtns = document.querySelectorAll('.demo-btn');
        const emailInput = document.querySelector('input[name="email"]');
        const pwdInput = document.querySelector('input[name="password"]');

        demoBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const email = this.getAttribute('data-email');
                const password = this.getAttribute('data-password');
                if (emailInput) emailInput.value = email;
                if (pwdInput) pwdInput.value = password;
            });
        });

        // Handle form loading state
        const loginForm = document.getElementById('loginForm');
        const submitBtn = document.getElementById('submitBtn');
        const btnText = document.getElementById('btnText');

        if (loginForm) {
            loginForm.addEventListener('submit', function() {
                if (submitBtn) {
                    submitBtn.disabled = true;
                    if (btnText) btnText.textContent = '<?php echo t('signingIn'); ?>';
                    // Also disable demo buttons to prevent double submission
                    demoBtns.forEach(btn => btn.disabled = true);
                }
            });
        }

        // If there was an error on previous submit, re-enable demo buttons (they remain disabled only on actual submit)
        <?php if ($error): ?>
        demoBtns.forEach(btn => btn.disabled = false);
        <?php endif; ?>
    </script>
</body>
</html>
