// js/checkout.js

document.addEventListener('DOMContentLoaded', () => {
    // Ensure global functions are available
    if (typeof getCart !== 'function' || typeof saveCart !== 'function') {
        console.error("Global cart functions (getCart, saveCart) not found. Make sure script.js is loaded first.");
        return;
    }

    const SHIPPING_COST = 5.00;
    const summaryContainer = document.getElementById('cart-items-summary-container');
    const subtotalSpan = document.getElementById('checkout-subtotal');
    const shippingSpan = document.getElementById('checkout-shipping');
    const totalSpan = document.getElementById('checkout-total');
    const checkoutForm = document.getElementById('checkout-form');
    const placeOrderBtn = checkoutForm.querySelector('button[type="submit"]');

    function createSummaryItemHTML(item) {
        const itemTotal = (item.price * item.quantity).toFixed(2);
        return `
            <div class="summary-item">
                <img src="${item.imageSrc}" alt="${item.name}">
                <div class="item-details">
                    <p>${item.name}</p>
                    <p class="qty-price">Qty: ${item.quantity} @ $${item.price.toFixed(2)}</p>
                </div>
                <span class="item-total">$${itemTotal}</span>
            </div>
        `;
    }

    function renderCheckoutSummary() {
        const cart = getCart();
        let subtotal = 0;

        if (summaryContainer) {
            if (cart.length === 0) {
                summaryContainer.innerHTML = '<p>Your cart is empty.</p>';
                if(placeOrderBtn) placeOrderBtn.disabled = true;
            } else {
                summaryContainer.innerHTML = cart.map(createSummaryItemHTML).join('');
                subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
                if(placeOrderBtn) placeOrderBtn.disabled = false;
            }
        }
        
        const total = subtotal + SHIPPING_COST;
        if (subtotalSpan) subtotalSpan.textContent = `$${subtotal.toFixed(2)}`;
        if (shippingSpan) shippingSpan.textContent = `$${SHIPPING_COST.toFixed(2)}`;
        if (totalSpan) totalSpan.textContent = `$${total.toFixed(2)}`;
    }

    function togglePaymentDetails() {
        const creditCardDetails = document.getElementById('credit-card-details');
        const creditCardRadio = document.getElementById('credit-card');
        const requiredInputs = creditCardDetails.querySelectorAll('input');

        if (creditCardRadio.checked) {
            creditCardDetails.style.display = 'flex';
            requiredInputs.forEach(input => input.required = true);
        } else {
            creditCardDetails.style.display = 'none';
            requiredInputs.forEach(input => input.required = false);
        }
    }

    document.querySelectorAll('input[name="payment_method"]').forEach(radio => {
        radio.addEventListener('change', togglePaymentDetails);
    });

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // 1. Gather Order Data
            const cart = getCart();
            const formData = new FormData(checkoutForm);
            const shippingAddress = {
                fullName: formData.get('fullName'),
                address: formData.get('address'),
                phone: formData.get('phone'),
            };
            const paymentMethod = formData.get('payment_method');

            const orderDetails = {
                orderId: `BF-${Date.now()}`,
                cart: cart,
                shipping: shippingAddress,
                payment: paymentMethod,
                totals: {
                    subtotal: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
                    shippingCost: SHIPPING_COST,
                    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + SHIPPING_COST
                }
            };

            // 2. Save order to sessionStorage to pass to next page
            sessionStorage.setItem('latestOrder', JSON.stringify(orderDetails));

            // 3. Clear the cart
            saveCart([]);

            // 4. Redirect to confirmation page
            window.location.href = 'order-confirmation.html';
        });
    }

    // Initial setup
    renderCheckoutSummary();
    togglePaymentDetails();
});