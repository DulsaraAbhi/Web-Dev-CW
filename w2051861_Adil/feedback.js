document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('input[id="10"]').checked=true;

    const form = document.getElementById('form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Clear previous error messages
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(function(errorMessage) {
            errorMessage.remove();
        });

        // Validate form fields
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        
        if (name.trim() === '') {
            showError('name', 'Name is required');
        }

        const emailRegex = /^\S+@\S+\.\S+$/;
        if (email.trim() === '') {
            showError('email', 'Email is required');
        } else if (!emailRegex.test(email)) {
            showError('email', 'Please enter a valid email address');
        }

        // If there are no errors, submit the form
        if (document.querySelectorAll('.error-message').length === 0) {
            // Implement form submission here, e.g., using AJAX
            // Upon successful submission, display success message
            const successMessage = document.createElement('p');
           // successMessage.textContent = 'Feedback submitted successfully!';
           alert("Your Message Has been sent Successfully...!")
            successMessage.classList.add('success-message');
            form.appendChild(successMessage);
            // Clear form fields after submission
            form.reset();
        }
    });

    function showError(inputId, errorMessageText) {
        const inputElement = document.getElementById(inputId);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = errorMessageText;
        errorMessage.classList.add('error-message');
        inputElement.parentNode.insertBefore(errorMessage, inputElement.nextSibling);
    }
});
