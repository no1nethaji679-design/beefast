// js/cart.js
// Note: getCart() and saveCart() are defined in script.js and are globally available.

const SHIPPING_COST = 5.00; 

function updateCartTotals() {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal + SHIPPING_COST;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `$${SHIPPING_COST.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

function createCartItemHTML(item) {
    return `
        <div class="cart-item" data-product-id="${item.id}">
            <img src="${item.imageSrc}" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>Unit Price: $${item.price.toFixed(2)}</p>
                <div class="item-quantity">
                    <label for="qty-${item.id}">Qty:</label>
                    <input type="number" id="qty-${item.id}" value="${item.quantity}" min="1" class="item-quantity-input">
                </div>
            </div>
            <button class="btn-remove-item">Remove</button>
        </div>
    `;
}

function renderCart() {
    const cart = getCart();
    const container = document.getElementById('cart-items-container');
    if (!container) return; 

    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 20px;">Your cart is empty.</p>';
        document.querySelector('.cart-summary a.btn-accent').classList.add('disabled');
    } else {
        container.innerHTML = cart.map(createCartItemHTML).join('');
        document.querySelector('.cart-summary a.btn-accent').classList.remove('disabled');
    }
    
    updateCartTotals();
}

function attachCartEventListeners() {
    const container = document.getElementById('cart-items-container');
    if (!container) return;

    container.addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-remove-item')) {
            const cartItemElement = event.target.closest('.cart-item');
            const productId = cartItemElement.dataset.productId;
            
            let cart = getCart();
            cart = cart.filter(item => item.id !== productId);
            saveCart(cart);
            renderCart(); // Re-render the entire cart
        }
    });

    container.addEventListener('change', (event) => {
        if (event.target.classList.contains('item-quantity-input')) {
            const cartItemElement = event.target.closest('.cart-item');
            const productId = cartItemElement.dataset.productId;
            let newQuantity = parseInt(event.target.value, 10);

            if (isNaN(newQuantity) || newQuantity < 1) {
                newQuantity = 1;
                event.target.value = 1; 
            }

            let cart = getCart();
            const itemToUpdate = cart.find(item => item.id === productId);
            if (itemToUpdate) {
                itemToUpdate.quantity = newQuantity;
                saveCart(cart);
                renderCart(); // Re-render the entire cart to update totals correctly
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    attachCartEventListeners();
});
