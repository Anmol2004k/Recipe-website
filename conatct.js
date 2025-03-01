 // contact.js
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const recipeForm = document.getElementById('recipeForm');

    // Contact Form Validation
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if(validateForm(contactForm)) {
            showSuccessMessage('contact');
        }
    });

    // Recipe Form Validation
    recipeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if(validateForm(recipeForm)) {
            showSuccessMessage('recipe');
        }
    });

    // Real-time Validation
    document.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => {
            validateField(input);
        });
    });
});

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        if(!validateField(input)) isValid = false;
    });

    return isValid;
}

function validateField(input) {
    const errorElement = input.parentElement.querySelector('.error-message');
    
    if(input.checkValidity()) {
        errorElement.style.display = 'none';
        input.style.borderColor = '#eee';
        return true;
    } else {
        errorElement.textContent = input.validationMessage;
        errorElement.style.display = 'block';
        input.style.borderColor = '#e74c3c';
        return false;
    }
}

function showSuccessMessage(type) {
    const message = type === 'contact' 
        ? 'Thank you for your message! We will respond within 24 hours.' 
        : 'Recipe submitted successfully! Our team will review it shortly.';
    
    Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: message,
        confirmButtonColor: '#ff6b6b'
    });
}