const message = document.getElementById('message');

function showMessage(text, ok = true) {
    if (!message) return;
    message.textContent = text;
    message.className = ok
        ? 'rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2.5 text-sm text-emerald-700'
        : 'rounded-lg border border-red-100 bg-red-50 px-3 py-2.5 text-sm text-red-600';
}

const forgotForm = document.getElementById('forgotPasswordForm');
if (forgotForm) {
    forgotForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const response = await fetch('/api/auth/forgot-password', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: document.getElementById('emailInput').value})
        });
        const data = await response.json();
        showMessage(data.message || data.error, response.ok);
    });
}

const resetForm = document.getElementById('resetPasswordForm');
if (resetForm) {
    const token = new URLSearchParams(window.location.search).get('token') || '';
    const tokenStatus = document.getElementById('tokenStatus');

    fetch(`/api/auth/reset-password?token=${encodeURIComponent(token)}`)
        .then((response) => response.json().then((data) => ({ok: response.ok, data})))
        .then(({ok, data}) => {
            tokenStatus.textContent = ok ? 'Reset link verified.' : data.error;
            tokenStatus.className = ok
                ? 'mt-8 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700'
                : 'mt-8 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600';
            if (ok) resetForm.classList.remove('hidden');
        });

    resetForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const response = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                token,
                password: document.getElementById('passwordInput').value,
                confirmPassword: document.getElementById('confirmPasswordInput').value
            })
        });
        const data = await response.json();
        showMessage(data.message || data.error, response.ok);
        if (response.ok) setTimeout(() => window.location.href = '/login', 1200);
    });
}
