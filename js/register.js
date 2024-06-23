
document.addEventListener('DOMContentLoaded', function() {
// Función para validar el campo de contraseña
function validatePassword() {
    let password = document.getElementById('password');
    let passwordError = document.getElementById('password-error');

    if (password.value === '') {
        passwordError.innerText = 'Please complete the field';
        return false;
    } else if (password.value.length < 6) {
        passwordError.innerText = 'You must enter at least 6 characters';
        return false;
    } else {
        passwordError.innerText = '';
        return true;
    }
}

// Función para validar que las contraseñas coincidan
function validateConfirmPassword() {
    let password = document.getElementById('password');
    let confirmPassword = document.getElementById('confirm-password');
    let confirmPasswordError = document.getElementById('confirm-password-error');

    if (confirmPassword.value !== password.value) {
        confirmPasswordError.innerText = 'Passwords do not match';
        return false;
    } else {
        confirmPasswordError.innerText = '';
        return true;
    }
}
document.getElementById('password').addEventListener('input', validatePassword);
document.getElementById('confirm-password').addEventListener('input', validateConfirmPassword);

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let isPasswordValid = validatePassword();
    let isConfirmPasswordValid = validateConfirmPassword();

    if (isPasswordValid && isConfirmPasswordValid) {
        window.location.href = "login.html"
    }
});
});