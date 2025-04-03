document.addEventListener('DOMContentLoaded', function() {
    const snackList = document.getElementById('snack-list');
    const productDetails = document.getElementById('product-details');
    const orderSummary = document.getElementById('order-summary');
    const backToHomeButton = document.getElementById('back-to-home');
    
    if (snackList) {
        fetch('data/products.json')
            .then(response => response.json())
            .then(products => {
                products.forEach(product => {
                    const productElement = document.createElement('div');
                    productElement.classList.add('snack-card');
                    productElement.innerHTML = `
                        <img src="${product.image}" class="snack-image" alt="${product.name}">
                        <h2 class="snack-name">${product.name}</h2>
                        <p class="snack-price">$${product.price.toFixed(2)}</p>
                        <button class="view-details-btn" onclick="viewDetails(${product.id})">View Details</button>
                    `;
                    snackList.appendChild(productElement);
                });
            });
    }

    if (productDetails) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('snack');
        fetch('data/products.json')
            .then(response => response.json())
            .then(products => {
                const product = products.find(p => p.id == productId);
                if (product) {
                    document.getElementById('snack-title').textContent = product.name;
                    document.getElementById('snack-image').src = product.image;
                    document.getElementById('snack-description').textContent = product.description;
                    document.getElementById('snack-price').textContent = `$${product.price.toFixed(2)}`;
                    const snackVariations = document.getElementById('snack-variations');
                    product.variations.forEach(variation => {
                        const variationButton = document.createElement('button');
                        variationButton.textContent = variation.name;
                        variationButton.onclick = () => selectVariation(product, variation);
                        snackVariations.appendChild(variationButton);
                    });
                    document.getElementById('add-to-cart-btn').onclick = () => addToCart(product.id);
                } else {
                    productDetails.innerHTML = '<p>Product not found.</p>';
                }
            });
    }

    if (orderSummary) {
        const order = JSON.parse(localStorage.getItem('order'));
        if (order) {
            orderSummary.innerHTML = `
                <h2>Order Summary</h2>
                <p>Name: ${order.name}</p>
                <p>Phone: ${order.phone}</p>
                <p>Address: ${order.address}</p>
                <h3>Items:</h3>
                ${order.items.map(item => `
                    <div class="snack-card">
                        <img src="${item.image}" class="snack-image" alt="${item.name}">
                        <h2 class="snack-name">${item.name}</h2>
                        <p class="snack-price">$${item.price.toFixed(2)}</p>
                        <p>Quantity: ${item.quantity}</p>
                    </div>
                `).join('')}
            `;
        } else {
            orderSummary.innerHTML = '<p>No order found.</p>';
        }
    }

    if (backToHomeButton) {
        backToHomeButton.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
});

function viewDetails(productId) {
    window.location.href = `product.html?snack=${productId}`;
}

function selectVariation(product, variation) {
    document.getElementById('snack-image').src = variation.image;
    document.getElementById('snack-description').textContent = `${product.description} - ${variation.name}`;
    document.querySelectorAll('#snack-variations button').forEach(button => {
        button.classList.remove('selected');
    });
    event.target.classList.add('selected');
}

function addToCart(productId) {
    fetch('data/products.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id == productId);
            const variation = document.querySelector('#snack-variations button.selected').textContent;
            if (product && variation) {
                const cart = getCart();
                const existingItem = cart.find(item => item.id == productId && item.variation == variation);
                if (existingItem) {
                    existingItem.quantity++;
                } else {
                    const selectedVariation = product.variations.find(v => v.name == variation);
                    cart.push({
                        ...product,
                        variation: variation,
                        image: selectedVariation.image,
                        quantity: 1
                    });
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                alert('Product added to cart.');
            }
        });
}

function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}