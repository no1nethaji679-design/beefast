// js/script.js

// --- 1. GLOBAL HELPER FUNCTIONS ---

// Get cart from localStorage
function getCart() {
    const cartString = localStorage.getItem('beefastCart');
    try {
        return cartString ? JSON.parse(cartString) : [];
    } catch (e) {
        console.error("Error parsing cart from localStorage:", e);
        return [];
    }
}

// Save cart to localStorage and update the header count
function saveCart(cart) {
    localStorage.setItem('beefastCart', JSON.stringify(cart));
    updateCartCount();
}

// Update the cart count in the header
function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + (item.quantity || 0), 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = count;
    }
}

// Get logged-in user from localStorage
function getLoggedInUser() {
    const userString = localStorage.getItem('beefastUser');
    try {
        return userString ? JSON.parse(userString) : null;
    } catch (e) {
        console.error("Error parsing user from localStorage:", e);
        return null;
    }
}

// Update navbar UI based on login status
function updateUserStatusUI() {
    const userAuthContainer = document.getElementById('user-auth-status');
    const loggedInUser = getLoggedInUser(); // Check for the 'beefastUser' object

    if (userAuthContainer) {
        if (loggedInUser) {
            // Build the dropdown content based on user role
            let dropdownLinks = `
                <a href="profile.html">Profile</a>
            `;
            // Check for specific roles before adding links
            if (loggedInUser.role === 'admin') {
                dropdownLinks += `<a href="admin.html">Admin Panel</a>`;
            }
            if (loggedInUser.role === 'seller') {
                dropdownLinks += `<a href="seller.html">Seller Dashboard</a>`;
            }
            if (loggedInUser.role === 'delivery') {
                dropdownLinks += `<a href="delivery.html">Delivery Agent</a>`;
            }
            dropdownLinks += `<a href="#" id="logout-link">Logout</a>`;

            userAuthContainer.innerHTML = `
                <div id="user-icon-container" class="user-status-logged-in">
                    <i class="fa-solid fa-user user-icon"></i>
                    <div class="user-dropdown">
                        ${dropdownLinks}
                    </div>
                </div>
            `;
            // Attach logout listener immediately after creating the element
            document.getElementById('logout-link').addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('beefastUser'); // Remove the user object
                window.location.href = 'index.html'; // Redirect to home after logout
            });
        } else {
            userAuthContainer.innerHTML = `
                <a href="signup.html" class="btn btn-primary">Sign In</a>
            `;
        }
    }
}


// --- 2. CORE "ADD TO CART" LOGIC ---

// Handles adding a product object to the cart
function addToCart(product) {
    if (!product || !product.id) {
        console.error("Invalid product data provided to addToCart.");
        return;
    }

    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart(cart);
    alert(`${product.name} has been added to your cart.`);
}


// --- 3. AD ROTATOR LOGIC ---
function initializeAdRotator() {
    const slides = document.querySelectorAll('.hero-slide');
    const indicatorsContainer = document.querySelector('.rotator-indicators');
    let currentSlide = 0;
    let slideInterval; // To hold the interval ID for auto-rotation

    // Ensure slides exist before initializing rotator
    if (slides.length > 0 && indicatorsContainer) {
        // Create indicator dots dynamically
        slides.forEach((slide, index) => {
            const dot = document.createElement('div');
            dot.classList.add('indicator-dot');
            dot.dataset.slideIndex = index;
            if (index === 0) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                showSlide(index);
                resetInterval(); // Reset timer on manual click
            });
            indicatorsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.indicator-dot');

        function showSlide(index) {
            // Remove active from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            // Add active to the current slide and corresponding dot
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function startRotator() {
            slideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startRotator();
        }

        // Initialize and start the rotator
        showSlide(currentSlide); // Show the first slide immediately
        startRotator();

    } else {
        console.warn("Hero rotator elements not found. Rotator will not function.");
    }
}


// --- 4. GLOBAL DOM CONTENT LOADED EVENT LISTENER ---

// This runs when the entire page is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize UI elements that depend on stored data
    updateCartCount();
    updateUserStatusUI(); // Call this to render the user icon or sign-in button
    initializeAdRotator(); // Call this to start the ad rotator

    // Event delegation for all "Add to Cart" buttons on product cards
    document.body.addEventListener('click', (event) => {
        if (event.target && event.target.classList.contains('btn-add-to-cart')) {
            const productCard = event.target.closest('.product-card');
            if (productCard) {
                const productId = productCard.dataset.productId;
                if (!productId) {
                    console.error("Product card is missing data-product-id attribute.");
                    return;
                }

                // Construct product object from card data
                const product = {
                    id: productId,
                    name: productCard.querySelector('h3').textContent,
                    price: parseFloat(productCard.querySelector('.price').textContent.replace('$', '')),
                    imageSrc: productCard.querySelector('img').getAttribute('src')
                };

                addToCart(product);
            }
        }
    });
});