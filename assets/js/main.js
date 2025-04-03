document.addEventListener('DOMContentLoaded', function() {
    const snackList = document.getElementById('snack-list');
    
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
            })
            .catch(error => console.error('Error loading product data:', error));
    }
});

function viewDetails(productId) {
    window.location.href = `product.html?snack=${productId}`;
}