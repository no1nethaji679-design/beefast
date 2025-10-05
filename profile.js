// js/profile.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Protect the route: Redirect if not logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        // Redirect to the sign-up/login page
        window.location.href = 'signup.html';
        return; // Stop executing script if not logged in
    }

    // 2. Tab switching logic
    const navLinks = document.querySelectorAll('.profile-nav-link');
    const tabContents = document.querySelectorAll('.profile-tab-content');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetId = link.dataset.target;

            // Update active state for nav links
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');

            // Show the target tab content and hide others
            tabContents.forEach(content => {
                if (content.id === targetId) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });

    // 3. Profile form edit/save logic
    const editBtn = document.getElementById('edit-profile-btn');
    const saveBtn = document.getElementById('save-profile-btn');
    const profileForm = document.getElementById('profile-form');
    const formInputs = profileForm.querySelectorAll('input, textarea');

    if (editBtn) {
        editBtn.addEventListener('click', () => {
            // Enable all form inputs
            formInputs.forEach(input => input.disabled = false);
            
            // Show save button, hide edit button
            saveBtn.style.display = 'inline-block';
            editBtn.style.display = 'none';
        });
    }

    if (profileForm) {
        profileForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent actual form submission
            
            // Simulate saving data
            alert('Profile updated successfully!');
            
            // Disable all form inputs
            formInputs.forEach(input => input.disabled = true);

            // Show edit button, hide save button
            editBtn.style.display = 'inline-block';
            saveBtn.style.display = 'none';
        });
    }
});