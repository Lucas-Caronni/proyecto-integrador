document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;

        if (email === '') {
            alert('Por favor complete el campo email');
            return;
        }

        if (password === '') {
            alert('Por favor complete el campo contraseña');
            return;
        }

        if (password.length < 6) {
            alert('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        // Si pasa todas las validaciones, guardamos el email en localStorage
        localStorage.setItem('userEmail', email);
        
        // Redirigir a la página principal
        window.location.href = 'index.html';
    });
});
