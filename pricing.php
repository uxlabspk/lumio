<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pricing - Lumio</title>
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
                        }
                    }
                }
            }
        }
    </script>
</head>
<body class="min-h-screen bg-white">
    <!-- Navbar -->
    <header class="fixed top-0 inset-x-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-md">
        <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
            <!-- Logo -->
            <a href="/" class="flex items-center gap-2.5">
                <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900">
                    <span class="text-sm font-bold text-white">L</span>
                </div>
                <span class="text-base font-semibold text-zinc-900">Lumio</span>
            </a>

            <!-- Nav links -->
            <nav class="hidden md:flex items-center gap-7 text-sm text-zinc-600">
                <a href="/features" class="hover:text-zinc-900 transition-colors">Features</a>
                <a href="/testimonials" class="hover:text-zinc-900 transition-colors">Testimonials</a>
                <a href="/pricing" class="hover:text-zinc-900 transition-colors">Pricing</a>
            </nav>

            <!-- CTAs -->
            <div class="flex items-center gap-3">
                <a href="/login" class="text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors">Sign in</a>
                <a href="/login" class="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors">Get started</a>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="pt-28">
        <section class="py-24 px-6 bg-zinc-50">
            <div class="mx-auto max-w-5xl">
                <div class="text-center mb-14">
                    <h1 class="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4">Pricing</h1>
                    <p class="text-zinc-500">Simple, transparent pricing — all plans include a 30-day free trial.</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <?php
                    $plans = [
                        [
                            "name" => "Starter",
                            "price" => "$49",
                            "period" => "/month",
                            "description" => "For small schools up to 200 students",
                            "features" => ["Up to 200 students", "5 teacher accounts", "Attendance & exams", "Basic reports", "Email support"],
                            "cta" => "Start free trial",
                            "highlighted" => false
                        ],
                        [
                            "name" => "School",
                            "price" => "$149",
                            "period" => "/month",
                            "description" => "For growing schools up to 1,000 students",
                            "features" => ["Up to 1,000 students", "Unlimited teachers", "All modules included", "Advanced analytics", "Priority support", "Custom branding"],
                            "cta" => "Start free trial",
                            "highlighted" => true
                        ],
                        [
                            "name" => "District",
                            "price" => "Custom",
                            "period" => "",
                            "description" => "For school districts and large institutions",
                            "features" => ["Unlimited students", "Multi-school dashboard", "SSO & custom integrations", "Dedicated success manager", "SLA guarantee", "On-premise option"],
                            "cta" => "Contact sales",
                            "highlighted" => false
                        ]
                    ];

                    foreach ($plans as $p):
                    ?>
                        <div class="rounded-2xl p-7 border <?= $p['highlighted'] ? 'bg-zinc-900 border-zinc-900 shadow-xl scale-[1.03]' : 'bg-white border-zinc-100 shadow-sm' ?>">
                            <p class="text-xs font-semibold uppercase tracking-wider mb-3 <?= $p['highlighted'] ? 'text-zinc-400' : 'text-zinc-500' ?>">
                                <?= $p['name'] ?>
                            </p>
                            <div class="flex items-end gap-0.5 mb-1">
                                <span class="text-4xl font-bold <?= $p['highlighted'] ? 'text-white' : 'text-zinc-900' ?>">
                                    <?= $p['price'] ?>
                                </span>
                                <?php if ($p['period']): ?>
                                    <span class="text-sm mb-1 <?= $p['highlighted'] ? 'text-zinc-400' : 'text-zinc-500' ?>">
                                        <?= $p['period'] ?>
                                    </span>
                                <?php endif; ?>
                            </div>
                            <p class="text-xs mb-6 <?= $p['highlighted'] ? 'text-zinc-400' : 'text-zinc-500' ?>">
                                <?= $p['description'] ?>
                            </p>
                            <ul class="space-y-2.5 mb-7">
                                <?php foreach ($p['features'] as $f): ?>
                                    <li class="flex items-center gap-2">
                                        <i data-lucide="check-circle-2"
                                           size="14"
                                           class="<?= $p['highlighted'] ? 'text-emerald-400 shrink-0' : 'text-emerald-500 shrink-0' ?>">
                                        </i>
                                        <span class="text-xs <?= $p['highlighted'] ? 'text-zinc-300' : 'text-zinc-600' ?>">
                                            <?= $f ?>
                                        </span>
                                    </li>
                                <?php endforeach; ?>
                            </ul>
                            <a href="/login"
                               class="block w-full rounded-xl py-2.5 text-center text-sm font-semibold transition-colors <?= $p['highlighted'] ? 'bg-white text-zinc-900 hover:bg-zinc-100' : 'bg-zinc-900 text-white hover:bg-zinc-700' ?>">
                                <?= $p['cta'] ?>
                            </a>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="border-t border-zinc-100 bg-white py-10 px-6">
        <div class="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-2">
                <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900">
                    <span class="text-xs font-bold text-white">L</span>
                </div>
                <span class="text-sm font-semibold text-zinc-900">Lumio</span>
            </div>
            <p class="text-xs text-zinc-400">© <?= date('Y') ?> Lumio. All rights reserved.</p>
            <div class="flex items-center gap-5 text-xs text-zinc-400">
                <a href="#" class="hover:text-zinc-700 transition-colors">Privacy</a>
                <a href="#" class="hover:text-zinc-700 transition-colors">Terms</a>
                <a href="/login" class="hover:text-zinc-700 transition-colors">Sign in</a>
            </div>
        </div>
    </footer>

    <!-- Initialize Lucide Icons -->
    <script>
        lucide.createIcons();
    </script>
</body>
</html>
