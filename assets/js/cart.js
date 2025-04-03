document.addEventListener('DOMContentLoaded', function() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout-button');
    
    if (cartItems) {
        const cart = getCart();
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const productElement = document.createElement('div');
            productElement.classList.add('snack-card');
            productElement.innerHTML = `
                <img src="${item.image}" class="snack-image" alt="${item.name}">
                <h2 class="snack-name">${item.name}</h2>
                <p class="snack-price">$${item.price.toFixed(2)}</p>
                <p>Variation: ${item.variation}</p>
                <p>Quantity: ${item.quantity}</p>
                <button onclick="removeFromCart(${item.id}, '${item.variation}')">Remove</button>
            `;
            cartItems.appendChild(productElement);
            total += item.price * item.quantity;
        });
        totalPrice.innerHTML = `Total: $${total.toFixed(2)}`;
    }

    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            window.location.href = 'checkout.html';
        });
    }
});

function removeFromCart(productId, variation) {
    let cart = getCart();
    cart = cart.filter(item => !(item.id == productId && item.variation == variation));
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.reload();
}

function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}