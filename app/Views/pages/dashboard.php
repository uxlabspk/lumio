<div class="mb-6">
    <h1 class="text-2xl font-bold">School Command Center</h1>
    <p class="mt-1 text-sm text-zinc-500">This is the first protected shell for the future SMS modules.</p>
</div>

<div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    <?php foreach ([['Students', '1,284'], ['Attendance Today', '94%'], ['Fees Due', 'PKR 312k'], ['Messages Queued', '48']] as $card): ?>
        <div class="rounded-lg border border-zinc-200 bg-white p-5">
            <p class="text-xs text-zinc-500"><?= e($card[0]) ?></p>
            <p class="mt-2 text-2xl font-bold"><?= e($card[1]) ?></p>
        </div>
    <?php endforeach; ?>
</div>

<div class="rounded-lg border border-zinc-200 bg-white">
    <div class="border-b border-zinc-200 p-5">
        <h2 class="font-semibold">Planned Modules</h2>
        <p class="mt-1 text-sm text-zinc-500">Each module has a folder under <code>app/Modules</code> for domain logic as the product grows.</p>
    </div>
    <div class="grid grid-cols-1 gap-px bg-zinc-200 sm:grid-cols-2 lg:grid-cols-3">
        <?php foreach ($modules as $name => $description): ?>
            <div class="bg-white p-5">
                <p class="text-sm font-semibold capitalize"><?= e(str_replace('_', ' ', $name)) ?></p>
                <p class="mt-1 text-xs leading-relaxed text-zinc-500"><?= e($description) ?></p>
            </div>
        <?php endforeach; ?>
    </div>
</div>
