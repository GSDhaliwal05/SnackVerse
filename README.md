# SnackVerse

This is a static e-commerce website built with HTML, CSS, and JavaScript. It is hosted on GitHub Pages and includes the following features:

- Homepage with a list of snacks
- Snack Details Page with variation selection
- Shopping Cart Page
- Checkout Page
- Order Confirmation Page
- Responsive Design
- Automatic deployment with GitHub Actions

## Folder & File Structure

```
/snackverse
│── index.html (Homepage - snack listing)
│── product.html (Snack details with variation selection)
│── cart.html (Shopping cart page)
│── checkout.html (Checkout form for COD orders)
│── confirmation.html (Order confirmation page)
│── /assets
│   │── /css/style.css (Custom styles)
│   │── /js/main.js (Handles cart logic)
│   │── /js/cart.js (Cart functionality)
│   │── /js/checkout.js (Handles checkout form submission)
│── /data
│   │── products.json (Stores snack product data)
│── .github/workflows/deploy.yml (GitHub Actions for auto-deployment)
│── README.md (Project documentation)
```

## Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions. Any changes pushed to the main branch will trigger a deployment.

## License

This project is licensed under the MIT License.