document.addEventListener('DOMContentLoaded', function() {
    const userEmail = localStorage.getItem('userEmail');
    const navLinks = document.querySelector('.nav-links');

    if (userEmail) {
        const welcomeMessage = `Bienvenido: ${userEmail}`;
        const space = ' '; // Espacio adicional
        const logoutLink = document.createElement('a');
        
        logoutLink.textContent = 'Logout';
        logoutLink.href = '#'; // Aquí iría la lógica para cerrar sesión

        navLinks.innerHTML += `${welcomeMessage}${space}<a href="#" id="logout">Logout</a>`;

        const loginLink = navLinks.querySelector('a[href="login.html"]');
        if (loginLink) {
            loginLink.style.display = 'none';
        }

        const registerLink = navLinks.querySelector('a[href="register.html"]');
        if (registerLink) {
            registerLink.style.display = 'none';
        }

        const logoutAnchor = navLinks.querySelector('#logout');
        if (logoutAnchor) {
            logoutAnchor.addEventListener('click', function(event) {
                event.preventDefault();
                localStorage.removeItem('userEmail');
                window.location.href = 'index.html';
            });
        }
    } else {
        // No hay usuario autenticado, no hacer nada
    }
});
