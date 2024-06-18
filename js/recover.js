document.addEventListener('DOMContentLoaded', function() {
    function validateEmail() {
        const email = document.getElementById('email');
        const emailError = document.getElementById('email-error');
        if (email.value === '') {
            emailError.innerText = 'Please enter your email';
            return false;
        } else {
            emailError.innerText = '';
            return true;
        }
    }

    function validateTerms() {
        const terms = document.getElementById('terms');
        const termsError = document.getElementById('terms-error');
        if (!terms.checked) {
            termsError.innerText = 'Please accept the field I want to recover my password';
            return false;
        } else {
            termsError.innerText = '';
            return true;
        }
    }

    const recoverForm = document.getElementById('recover-form');
    recoverForm.onsubmit = function(event) {
        event.preventDefault();
        const isEmailValid = validateEmail();
        const areTermsAccepted = validateTerms();

        if (isEmailValid && areTermsAccepted) {
            const successMessage = document.getElementById('success-message');
            successMessage.innerText = 'You will receive an email with instructions to recover your password';
            document.getElementById('login-link').style.display = 'block';
        }
    };
});
