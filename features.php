<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Features - Lumio</title>
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
        <section class="py-24 px-6">
            <div class="mx-auto max-w-5xl">
                <div class="text-center mb-14">
                    <h1 class="text-3xl sm:text-4xl font-bold text-zinc-900 mb-4">Features</h1>
                    <p class="text-zinc-500 max-w-xl mx-auto">
                        All the tools your school needs to run smoothly — organised and easy to use.
                    </p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <?php
                    $features = [
                        [
                            "icon" => "users",
                            "title" => "Student Management",
                            "description" => "Maintain complete student profiles, enrollment records, and academic history in one place."
                        ],
                        [
                            "icon" => "calendar-check",
                            "title" => "Attendance Tracking",
                            "description" => "Mark and monitor daily attendance across classes with insightful trend charts."
                        ],
                        [
                            "icon" => "clipboard-list",
                            "title" => "Assignments",
                            "description" => "Create, assign, and track homework and project submissions with progress tracking."
                        ],
                        [
                            "icon" => "calendar-days",
                            "title" => "Exam Scheduling",
                            "description" => "Plan examinations, publish results, and analyse performance by subject and class."
                        ],
                        [
                            "icon" => "book-open",
                            "title" => "Class Preparation",
                            "description" => "Organise lesson plans, teaching materials, and curriculum outlines effortlessly."
                        ],
                        [
                            "icon" => "message-square",
                            "title" => "Messaging",
                            "description" => "Built-in direct messaging between teachers, students, and parents."
                        ],
                        [
                            "icon" => "bar-chart-3",
                            "title" => "Analytics & Reports",
                            "description" => "Visual dashboards and exportable reports for data-driven school leadership."
                        ],
                        [
                            "icon" => "shield",
                            "title" => "Role-based Access",
                            "description" => "Granular permissions for admins, principals, teachers, students, and parents."
                        ]
                    ];

                    foreach ($features as $f):
                    ?>
                        <div class="rounded-2xl border border-zinc-100 bg-white p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
                            <div class="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100">
                                <i data-lucide="<?= $f['icon'] ?>" class="h-4.5 w-4.5 text-zinc-700"></i>
                            </div>
                            <h3 class="text-sm font-semibold text-zinc-900 mb-1.5"><?= $f['title'] ?></h3>
                            <p class="text-xs text-zinc-500 leading-relaxed"><?= $f['description'] ?></p>
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
