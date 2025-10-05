// --- START OF FILE auth.js ---

document.addEventListener('DOMContentLoaded', function() {
    // Mock users for demonstration
    const mockUsers = {
      'customer@test.com': { email: 'customer@test.com', name: 'Demo Customer', role: 'customer' },
      'admin@test.com': { email: 'admin@test.com', name: 'Demo Admin', role: 'admin' },
      'seller@test.com': { email: 'seller@test.com', name: 'Demo Seller', role: 'seller' },
      'delivery@test.com': { email: 'delivery@test.com', name: 'Demo Delivery', role: 'delivery' },
    };

    const signinButton = document.getElementById('show-signin');
    const registerButton = document.getElementById('show-register');
    
    const signinBox = document.getElementById('signin-box');
    const registerBox = document.getElementById('register-box');
    
    const signinForm = document.getElementById('signin-form');
    const registerForm = document.getElementById('register-form');

    // These elements might not exist on signup.html, but the code won't break if they don't.
    // However, the logout link on auth.js is redundant and should be handled by script.js globally.
    // const authButton = document.getElementById('auth-button'); // Not used
    // const userIconContainer = document.getElementById('user-icon-container'); // Not used
    // const logoutLink = document.getElementById('logout-link'); // Remove this listener, it's handled in script.js


    function switchForm(formToShow) {
        if (formToShow === 'signin') {
            signinBox.style.display = 'block';
            registerBox.style.display = 'none';
            signinButton.classList.add('active');
            registerButton.classList.remove('active');
        } else if (formToShow === 'register') {
            signinBox.style.display = 'none';
            registerBox.style.display = 'block';
            signinButton.classList.remove('active');
            registerButton.classList.add('active');
        }
    }

    // Only add listeners if buttons exist (relevant for signup.html)
    if (signinButton) signinButton.addEventListener('click', () => switchForm('signin'));
    if (registerButton) registerButton.addEventListener('click', () => switchForm('register'));

    function performLogin(email) {
        const foundUser = mockUsers[email.toLowerCase()] || { email: email, name: 'Demo Customer', role: 'customer' };
        localStorage.setItem('beefastUser', JSON.stringify(foundUser)); // Store user object
        // No need for a separate 'isLoggedIn' flag
        window.location.href = 'index.html'; // Redirect to home page after login
    }

    if (signinForm) {
        signinForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            if (email) {
                performLogin(email);
            }
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('reg-email').value;
            // Simulate registration is always successful
            if (email) {
                alert('Registration successful! You are now being logged in.');
                performLogin(email);
            }
        });
    }

    // Removed the logoutLink listener from here as it's handled globally in script.js
});
// --- END OF FILE auth.js ---