document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('order-form');

    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const order = {
                name: orderForm.name.value,
                phone: orderForm.phone.value,
                address: orderForm.address.value,
                items: getCart()
            };
            localStorage.setItem('order', JSON.stringify(order));
            localStorage.removeItem('cart');
            window.location.href = 'confirmation.html';
        });
    }
});

function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}