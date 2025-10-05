
// js/delivery.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Protect the route
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'signup.html';
        return;
    }

    // 2. Mock Delivery Data
    const mockDeliveries = [
        { orderId: "#ORD-1024", address: "123 Main St, Anytown", status: "pending" },
        { orderId: "#ORD-1023", address: "456 Oak Ave, Someville", status: "out-for-delivery" },
        { orderId: "#ORD-1021", address: "789 Pine Ln, Otherplace", status: "delivered" }
    ];

    const deliveryListContainer = document.getElementById('delivery-list');

    function renderDeliveries() {
        if (!deliveryListContainer) return;

        if (mockDeliveries.length === 0) {
            deliveryListContainer.innerHTML = '<p>No deliveries assigned.</p>';
            return;
        }

        deliveryListContainer.innerHTML = mockDeliveries.map(delivery => `
            <div class="delivery-card">
                <div class="delivery-info">
                    <h3>Order ${delivery.orderId}</h3>
                    <p><i class="fas fa-map-marker-alt"></i> ${delivery.address}</p>
                </div>
                <div class="delivery-actions">
                    <label for="status-${delivery.orderId}">Update Status:</label>
                    <select id="status-${delivery.orderId}" class="status-select ${delivery.status}" data-order-id="${delivery.orderId}">
                        <option value="pending" ${delivery.status === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="out-for-delivery" ${delivery.status === 'out-for-delivery' ? 'selected' : ''}>Out for Delivery</option>
                        <option value="delivered" ${delivery.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                    </select>
                </div>
            </div>
        `).join('');
    }

    // 3. Event Listener for Status Changes
    deliveryListContainer.addEventListener('change', (e) => {
        if (e.target.classList.contains('status-select')) {
            const select = e.target;
            const newStatus = select.value;
            const orderId = select.dataset.orderId;
            
            // Update the border color class
            select.className = 'status-select'; // Reset classes
            select.classList.add(newStatus);

            alert(`Simulating: Order ${orderId} status updated to ${newStatus}.`);
            // In a real app, this would be an API call.
        }
    });

    // Initial Render
    renderDeliveries();
});
    