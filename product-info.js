// js/product-info.js
// Relies on getCart() and saveCart() from the global script.js

const allProducts = [
    { id: "prod_tshirt_001", name: "Stylish T-Shirt", sku: "TSH-001-STYL", price: 59.99, image: "images/product1.jpg", description: "Experience ultimate comfort and style with our signature Stylish T-Shirt. Made from a premium organic cotton blend, it features a modern cut perfect for any casual occasion.", features: ["100% Organic Cotton", "Machine Washable", "Slim Fit Design"], category: "mens" },
    { id: "prod_headphone_002", name: "Wireless Headphones", sku: "HP-002-WIRE", price: 24.50, image: "images/product2.jpg", description: "Lightweight and powerful wireless headphones offering crystal-clear audio and deep bass. Enjoy hours of playback with a quick recharge.", features: ["Bluetooth 5.0", "10-Hour Battery", "Built-in Mic"], category: "electronics" },
    { id: "prod_watch_003", name: "Smart Watch", sku: "SW-003-SMART", price: 120.00, image: "images/product3.jpg", description: "A sleek smartwatch that tracks your fitness, monitors your heart rate, and keeps you connected.", features: ["Heart Rate Monitor", "Water Resistant", "Sleep Tracking"], category: "electronics" },
    { id: "prod_phone_nothing_004", name: "Nothing Phone (2)", sku: "NP-004-GLYF", price: 699.00, image: "images/nothing_phone.jpg", description: "A unique transparent design with the Glyph Interface, a powerful processor, and a stunning OLED display.", features: ["Snapdragon 8+ Gen 1", "Glyph Interface", "50MP Dual Camera"], category: "smartphones" },
    { id: "prod_phone_samsung_005", name: "Samsung Galaxy S24 Ultra", sku: "SMG-S24U", price: 1199.00, image: "images/samsung_s24_ultra.jpg", description: "The pinnacle of mobile technology with AI enhancements, a phenomenal camera system, and the iconic S Pen.", features: ["Integrated S Pen", "AI Photo Editing", "200MP Main Camera"], category: "smartphones" },
    { id: "prod_laptop_asus_006", name: "ASUS ROG Zephyrus G14", sku: "AS-ROG-G14", price: 1499.00, image: "images/asus_laptop.jpg", description: "A powerful and portable gaming laptop with a stunning display and top-tier performance for gamers and creators.", features: ["AMD Ryzen 9 CPU", "NVIDIA RTX GPU", "120Hz Display"], category: "electronics" }
];

function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const product = allProducts.find(p => p.id === productId);

    const titleTag = document.querySelector('title');
    const mainImage = document.getElementById('product-main-image');
    const productName = document.getElementById('product-name');
    const productSku = document.getElementById('product-sku');
    const productPrice = document.getElementById('product-price');
    const productDescription = document.getElementById('product-description-full');
    const featureList = document.getElementById('product-features-list');
    const addToCartBtn = document.getElementById('add-to-cart-btn');

    if (product) {
        titleTag.textContent = `Beefast - ${product.name}`;
        mainImage.src = product.image;
        mainImage.alt = product.name;
        productName.textContent = product.name;
        productSku.textContent = product.sku;
        productPrice.textContent = `$${product.price.toFixed(2)}`;
        productDescription.textContent = product.description;

        featureList.innerHTML = '';
        product.features.forEach(feature => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fas fa-check-circle"></i> ${feature}`;
            featureList.appendChild(li);
        });

        addToCartBtn.addEventListener('click', () => {
            const quantity = parseInt(document.getElementById('quantity').value, 10);
            const cart = getCart();
            const existingItem = cart.find(item => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    imageSrc: product.image,
                    quantity: quantity
                });
            }
            saveCart(cart);
            alert(`${quantity} x ${product.name} added to cart!`);
        });

    } else {
        productName.textContent = "Product Not Found";
        productDescription.textContent = "Sorry, the product you are looking for does not exist.";
        mainImage.src = 'images/placeholder.jpg';
        if (addToCartBtn) addToCartBtn.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', loadProductDetails);