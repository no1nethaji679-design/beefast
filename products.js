// js/products.js

const allProducts = [
    { id: "prod_tshirt_001", name: "Stylish T-Shirt", price: 59.99, image: "images/product1.jpg", category: "mens" },
    { id: "prod_headphone_002", name: "Wireless Headphones", price: 24.50, image: "images/product2.jpg", category: "electronics" },
    { id: "prod_watch_003", name: "Smart Watch", price: 120.00, image: "images/product3.jpg", category: "electronics" },
    { id: "prod_phone_nothing_004", name: "Nothing Phone (2)", price: 699.00, image: "images/nothing_phone.jpg", category: "smartphones" },
    { id: "prod_phone_samsung_005", name: "Samsung Galaxy S24 Ultra", price: 1199.00, image: "images/samsung_s24_ultra.jpg", category: "smartphones" },
    { id: "prod_laptop_asus_006", name: "ASUS ROG Zephyrus G14", price: 1499.00, image: "images/asus_laptop.jpg", category: "electronics" },
    { id: "prod_mens_jeans_007", name: "Men's Slim Fit Jeans", price: 55.00, image: "images/mens_jeans.jpg", category: "mens" },
    { id: "prod_womens_dress_008", name: "Women's Summer Dress", price: 45.00, image: "images/womens_dress.jpg", category: "womens" },
    { id: "prod_womens_blouse_009", name: "Women's Elegant Blouse", price: 38.00, image: "images/womens_blouse.jpg", category: "womens" },
    { id: "prod_mens_jacket_010", name: "Men's Leather Jacket", price: 120.00, image: "images/mens_jacket.jpg", category: "mens" }
];

function createProductCardHTML(product) {
    return `
        <div class="product-card" data-product-id="${product.id}">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <div class="card-actions">
                <a href="product-info.html?id=${product.id}" class="btn btn-info">Info</a>
                <button class="btn btn-add-to-cart">Add to Cart</button>
            </div>
        </div>
    `;
}

function renderProducts() {
    const productGrid = document.getElementById('product-grid');
    const categoryTitle = document.getElementById('category-title');
    if (!productGrid) return;

    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    let productsToRender = allProducts;
    let title = "All Products";

    if (category) {
        productsToRender = allProducts.filter(p => p.category === category);
        title = category.charAt(0).toUpperCase() + category.slice(1);
    }
    
    categoryTitle.textContent = title;

    if (productsToRender.length === 0) {
        productGrid.innerHTML = '<p>No products found in this category.</p>';
    } else {
        productGrid.innerHTML = productsToRender.map(createProductCardHTML).join('');
    }
}

document.addEventListener('DOMContentLoaded', renderProducts);