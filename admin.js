
// js/admin.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Protect the route
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'signup.html';
        return;
    }

    // 2. Tab Switching Logic
    const navLinks = document.querySelectorAll('.dashboard-nav-link');
    const tabContents = document.querySelectorAll('.dashboard-tab-content');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.dataset.target;

            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');

            tabContents.forEach(content => {
                content.classList.toggle('active', content.id === targetId);
            });
        });
    });

    // 3. Mock Product Data & Table Rendering
    const mockProducts = [
        { name: "Stylish T-Shirt", sku: "TSH-001-STYL", price: 59.99, stock: 150 },
        { name: "Wireless Headphones", sku: "HP-002-WIRE", price: 24.50, stock: 80 },
        { name: "Smart Watch", sku: "SW-003-SMART", price: 120.00, stock: 120 },
        { name: "Nothing Phone (2)", sku: "NP-004-GLYF", price: 699.00, stock: 50 },
    ];

    const tableBody = document.getElementById('products-table-body');

    function renderProductTable() {
        if (!tableBody) return;
        tableBody.innerHTML = mockProducts.map(p => `
            <tr>
                <td>${p.name}</td>
                <td>${p.sku}</td>
                <td>$${p.price.toFixed(2)}</td>
                <td>${p.stock}</td>
                <td class="actions-cell">
                    <button class="btn-edit" title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="btn-delete" title="Delete"><i class="fas fa-trash-alt"></i></button>
                </td>
            </tr>
        `).join('');
    }

    renderProductTable();
    
    // 4. Action button listeners (simulation)
    tableBody.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        if (!target) return;

        if (target.classList.contains('btn-edit')) {
            alert('Simulating: Opening edit modal for this product.');
        } else if (target.classList.contains('btn-delete')) {
            if (confirm('Are you sure you want to delete this product?')) {
                alert('Simulating: Product deleted.');
                // In a real app, you would remove the item from the array and re-render.
            }
        }
    });
});
    