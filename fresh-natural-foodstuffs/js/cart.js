// Cart page functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeCartPage();
});

function initializeCartPage() {
    loadCartItems();
    initializeCartInteractions();
    loadRecentlyViewed();
    loadAlsoViewed();
    updateCartSummary();
}

// Load cart items from cart manager
function loadCartItems() {
    const cartItemsList = document.getElementById('cart-items-list');
    const emptyCart = document.getElementById('empty-cart');
    const cartItems = cartManager.getCartItems();
    
    if (!cartItemsList) return;
    
    if (cartItems.length === 0) {
        // Show empty cart message
        if (emptyCart) {
            emptyCart.style.display = 'block';
        }
        cartItemsList.innerHTML = '';
        return;
    }
    
    // Hide empty cart message
    if (emptyCart) {
        emptyCart.style.display = 'none';
    }
    
    // Generate cart items HTML
    cartItemsList.innerHTML = cartItems.map(item => createCartItemHTML(item)).join('');
    
    // Update cart count in header
    updateCartItemsCount(cartItems.length);
}

// Create HTML for a cart item
function createCartItemHTML(item) {
    const product = getProductById(item.id);
    if (!product) return '';
    
    const itemTotal = item.price * item.quantity;
    
    return `
        <div class="cart-item" data-product-id="${item.id}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            
            <div class="cart-item-details">
                <h3 class="cart-item-name">${item.name}</h3>
                <div class="cart-item-price">${formatCurrency(item.price)}</div>
                
                <div class="cart-item-stock">
                    <span class="in-stock"><i class="fas fa-check-circle"></i> In Stock</span>
                    ${product.lowStock ? '<span class="low-stock">Few units left</span>' : ''}
                    ${item.expressDelivery ? '<span class="express-badge">JUMIA 4 EXPRESS</span>' : ''}
                </div>
            </div>
            
            <div class="cart-item-controls">
                <div class="cart-item-quantity">
                    <div class="quantity-controls">
                        <button class="quantity-btn decrease-qty" data-product-id="${item.id}">-</button>
                        <input type="number" class="cart-quantity" value="${item.quantity}" min="1" data-product-id="${item.id}">
                        <button class="quantity-btn increase-qty" data-product-id="${item.id}">+</button>
                    </div>
                    <div class="cart-item-total">${formatCurrency(itemTotal)}</div>
                </div>
                
                <button class="remove-item" data-product-id="${item.id}">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
        </div>
    `;
}

// Initialize cart interactions
function initializeCartInteractions() {
    initializeQuantityControls();
    initializeRemoveButtons();
    initializeClearCart();
    initializeCheckoutButton();
}

// Initialize quantity controls in cart
function initializeQuantityControls() {
    // Decrease quantity buttons
    document.querySelectorAll('.decrease-qty').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-product-id'));
            const currentItem = cartManager.getCartItems().find(item => item.id === productId);
            
            if (currentItem && currentItem.quantity > 1) {
                cartManager.updateQuantity(productId, currentItem.quantity - 1);
                reloadCart();
            }
        });
    });
    
    // Increase quantity buttons
    document.querySelectorAll('.increase-qty').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-product-id'));
            const currentItem = cartManager.getCartItems().find(item => item.id === productId);
            
            if (currentItem) {
                cartManager.updateQuantity(productId, currentItem.quantity + 1);
                reloadCart();
            }
        });
    });
    
    // Quantity input changes
    document.querySelectorAll('.cart-quantity').forEach(input => {
        input.addEventListener('change', function() {
            const productId = parseInt(this.getAttribute('data-product-id'));
            const quantity = parseInt(this.value) || 1;
            
            cartManager.updateQuantity(productId, quantity);
            reloadCart();
        });
        
        input.addEventListener('input', function() {
            // Allow only numbers
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    });
}

// Initialize remove item buttons
function initializeRemoveButtons() {
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-product-id'));
            
            // Show confirmation
            if (confirm('Are you sure you want to remove this item from your cart?')) {
                cartManager.removeFromCart(productId);
                reloadCart();
            }
        });
    });
}

// Initialize clear cart button
function initializeClearCart() {
    const clearCartBtn = document.getElementById('clear-cart');
    if (!clearCartBtn) return;
    
    clearCartBtn.addEventListener('click', function() {
        if (cartManager.getCartItems().length === 0) return;
        
        if (confirm('Are you sure you want to clear your entire cart?')) {
            cartManager.clearCart();
            reloadCart();
        }
    });
}

// Initialize checkout (WhatsApp) button
function initializeCheckoutButton() {
    const checkoutBtn = document.getElementById('checkout-whatsapp');
    if (!checkoutBtn) return;
    
    checkoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const cartItems = cartManager.getCartItems();
        if (cartItems.length === 0) {
            alert('Your cart is empty. Add some products before checking out.');
            return;
        }
        
        const whatsappUrl = generateWhatsAppMessage(cartItems);
        window.open(whatsappUrl, '_blank');
        
        // Optional: Clear cart after checkout
        // cartManager.clearCart();
        // reloadCart();
    });
}

// Update cart summary (subtotal, delivery, total)
function updateCartSummary() {
    const cartItems = cartManager.getCartItems();
    const subtotal = cartManager.getCartTotal();
    
    // Calculate delivery fee (free for orders over ₦10,000, otherwise ₦500)
    const deliveryFee = subtotal >= 10000 ? 0 : 500;
    const total = subtotal + deliveryFee;
    
    // Update summary elements
    const subtotalElement = document.getElementById('cart-subtotal');
    const deliveryFeeElement = document.getElementById('delivery-fee');
    const totalElement = document.getElementById('cart-total');
    
    if (subtotalElement) {
        subtotalElement.textContent = formatCurrency(subtotal);
    }
    
    if (deliveryFeeElement) {
        deliveryFeeElement.textContent = deliveryFee === 0 ? 'FREE' : formatCurrency(deliveryFee);
    }
    
    if (totalElement) {
        totalElement.textContent = formatCurrency(total);
    }
    
    // Update checkout button text with total
    const checkoutBtn = document.getElementById('checkout-whatsapp');
    if (checkoutBtn) {
        checkoutBtn.innerHTML = `<i class="fab fa-whatsapp"></i> Checkout (${formatCurrency(total)})`;
    }
}

// Update cart items count
function updateCartItemsCount(count) {
    const countElement = document.getElementById('cart-items-count');
    if (countElement) {
        countElement.textContent = count;
    }
}

// Reload entire cart (after updates)
function reloadCart() {
    loadCartItems();
    updateCartSummary();
}

// Load recently viewed products
function loadRecentlyViewed() {
    const recentlyViewedContainer = document.getElementById('recently-viewed');
    if (!recentlyViewedContainer) return;
    
    const recentlyViewedIds = JSON.parse(localStorage.getItem('freshNaturalRecentlyViewed')) || [];
    const recentlyViewedProducts = recentlyViewedIds
        .map(id => getProductById(id))
        .filter(product => product && !cartManager.getCartItems().some(item => item.id === product.id))
        .slice(0, 3); // Show only 3 recently viewed products
    
    if (recentlyViewedProducts.length === 0) {
        recentlyViewedContainer.innerHTML = '<p class="no-products">No recently viewed products.</p>';
        return;
    }
    
    recentlyViewedContainer.innerHTML = recentlyViewedProducts.map(product => `
        <div class="recent-product" data-product-id="${product.id}">
            <div class="recent-product-image">
                <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
            </div>
            <div class="recent-product-details">
                <div class="recent-product-name">${product.name}</div>
                <div class="recent-product-price">${formatCurrency(product.price)}</div>
            </div>
        </div>
    `).join('');
    
    // Add click events to recently viewed products
    document.querySelectorAll('.recent-product').forEach(item => {
        item.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            window.location.href = `product-detail.html?id=${productId}`;
        });
    });
}

// Load "customers who viewed this also viewed" products
function loadAlsoViewed() {
    const alsoViewedContainer = document.getElementById('also-viewed');
    if (!alsoViewedContainer) return;
    
    // Get random products (excluding those in cart)
    const cartProductIds = cartManager.getCartItems().map(item => item.id);
    const alsoViewedProducts = products
        .filter(product => !cartProductIds.includes(product.id))
        .sort(() => Math.random() - 0.5)
        .slice(0, 3); // Show 3 random products
    
    if (alsoViewedProducts.length === 0) {
        alsoViewedContainer.innerHTML = '<p class="no-products">No recommendations available.</p>';
        return;
    }
    
    alsoViewedContainer.innerHTML = alsoViewedProducts.map(product => `
        <div class="also-product" data-product-id="${product.id}">
            <div class="also-product-image">
                <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
            </div>
            <div class="also-product-details">
                <div class="also-product-name">${product.name}</div>
                <div class="also-product-price">${formatCurrency(product.price)}</div>
            </div>
        </div>
    `).join('');
    
    // Add click events to also viewed products
    document.querySelectorAll('.also-product').forEach(item => {
        item.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            window.location.href = `product-detail.html?id=${productId}`;
        });
    });
}

// Add CSS for cart page
const cartStyles = document.createElement('style');
cartStyles.textContent = `
    .no-products {
        text-align: center;
        color: var(--text-light);
        padding: 2rem;
        font-style: italic;
    }
    
    .cart-item {
        transition: all 0.3s ease;
    }
    
    .cart-item:hover {
        background-color: var(--bg-light-secondary);
    }
    
    .recent-product, .also-product {
        cursor: pointer;
        transition: all 0.2s ease;
    }
    
    .recent-product:hover, .also-product:hover {
        background-color: var(--bg-light-secondary);
        transform: translateX(5px);
    }
    
    @media (max-width: 768px) {
        .cart-item-controls {
            border-top: 1px solid var(--border-light);
            padding-top: 1rem;
            margin-top: 1rem;
        }
    }
`;
document.head.appendChild(cartStyles);