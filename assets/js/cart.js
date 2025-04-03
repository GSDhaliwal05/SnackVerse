document.addEventListener('DOMContentLoaded', function() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout-button');

    if (cartItems.length === 0) {
        alert('Your cart is empty. Please add items to the cart before proceeding.');
        window.location.href = 'index.html';
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <p class="cart-item-quantity">Quantity: ${item.quantity}</p>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }

    function calculateSubtotal() {
        let subtotal = 0;
        cartItems.forEach(item => {
            subtotal += item.price * item.quantity;
        });
        totalPriceElement.innerText = `Subtotal: $${subtotal.toFixed(2)}`;
    }

    renderCartItems();
    calculateSubtotal();
});