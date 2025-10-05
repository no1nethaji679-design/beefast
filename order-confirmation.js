// js/

document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the order details from sessionStorage
    const orderDetailsString = sessionStorage.getItem('latestOrder');
    
    if (!orderDetailsString) {
        // If no order data is found, show a generic message or redirect
        const container = document.querySelector('.confirmation-container');
        if (container) {
            container.innerHTML = '<h1>No Order Found</h1><p>There is no recent order information to display.</p><a href="index.html" class="btn btn-primary">Go to Homepage</a>';
        }
        return;
    }

    try {
        const order = JSON.parse(orderDetailsString);
        
        // Populate the page with order details
        document.getElementById('order-id').textContent = order.orderId;

        // Shipping Info
        document.getElementById('conf-shipping-name').textContent = order.shipping.fullName;
        document.getElementById('conf-shipping-address').textContent = order.shipping.address;
        document.getElementById('conf-shipping-phone').textContent = order.shipping.phone;

        // Items
        const itemsContainer = document.getElementById('conf-ordered-items');
        itemsContainer.innerHTML = order.cart.map(item => `
            <div class="ordered-item">
                <img src="${item.imageSrc}" alt="${item.name}">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Price: $${item.price.toFixed(2)}</p>
                </div>
            </div>
        `).join('');

        // Totals
        document.getElementById('conf-subtotal').textContent = `$${order.totals.subtotal.toFixed(2)}`;
        document.getElementById('conf-shipping-cost').textContent = `$${order.totals.shippingCost.toFixed(2)}`;
        document.getElementById('conf-total').textContent = `$${order.totals.total.toFixed(2)}`;

        // IMPORTANT: Clear the stored order details after displaying them
        // This prevents showing the same order again if the user revisits the page
        sessionStorage.removeItem('latestOrder');

    } catch (e) {
        console.error("Failed to parse order details from sessionStorage:", e);
        const container = document.querySelector('.confirmation-container');
        if (container) {
            container.innerHTML = '<h1>Error</h1><p>There was an error displaying your order details.</p><a href="index.html" class="btn btn-primary">Go to Homepage</a>';
        }
    }
});