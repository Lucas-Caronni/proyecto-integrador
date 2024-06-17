document.addEventListener('DOMContentLoaded', function() {
    const logoutAnchor = document.getElementById('logout');

    if (logoutAnchor) {
        logoutAnchor.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.removeItem('userEmail');

            const navLinks = document.querySelector('.nav-links');
            const welcomeMessage = navLinks.querySelector('span');
            const logoutLink = navLinks.querySelector('#logout');
            const loginLink = navLinks.querySelector('a[href="login.html"]');
            const registerLink = navLinks.querySelector('a[href="register.html"]');

            if (welcomeMessage) {
                welcomeMessage.remove();
            }
            
            if (logoutLink) {
                logoutLink.remove();
            }

            if (loginLink) {
                loginLink.style.display = 'block'; // Mostrar nuevamente el enlace de login
            }

            if (registerLink) {
                registerLink.style.display = 'block'; // Mostrar nuevamente el enlace de registro
            }

            window.location.href = 'index.html';
        });
    }
});
