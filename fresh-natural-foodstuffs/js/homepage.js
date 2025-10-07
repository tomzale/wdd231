// Homepage specific functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeHomepage();
});

function initializeHomepage() {
    loadFeaturedProducts();
    initializeCategoryCards();
    initializeTimeGreeting();
}

// Load featured products on homepage
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) return;

    const featuredProducts = getFeaturedProducts(8); // Get 8 featured products
    
    if (featuredProducts.length === 0) {
        featuredContainer.innerHTML = '<p class="no-products">No featured products available at the moment.</p>';
        return;
    }

    featuredContainer.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
    
    // Add event listeners to the product cards
    initializeProductCardInteractions();
}

// Create product card HTML for homepage
function createProductCard(product) {
    const discount = calculateDiscount(product.originalPrice, product.price);
    const stars = generateStarRating(product.rating);
    
    return `
        <div class="product-card" data-product-id="${product.id}">
            ${product.expressDelivery ? '<span class="express-badge">JUMIA 4 EXPRESS</span>' : ''}
            ${discount > 0 ? `<span class="product-badge">${discount}% OFF</span>` : ''}
            
            <div class="product-img">
                <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
            </div>
            
            <div class="product-info">
                <h3>${product.name}</h3>
                
                <div class="product-rating">
                    <div class="rating-stars">
                        ${stars}
                    </div>
                    <span class="rating-count">(${product.ratingCount})</span>
                </div>
                
                <div class="product-price">
                    <span class="current-price">${formatCurrency(product.price)}</span>
                    ${product.originalPrice > product.price ? 
                        `<span class="original-price">${formatCurrency(product.originalPrice)}</span>` : ''}
                    ${discount > 0 ? `<span class="discount">${discount}% off</span>` : ''}
                </div>
                
                <p class="product-description">${product.description}</p>
                
                <div class="product-actions">
                    <button class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <a href="product-detail.html?id=${product.id}" class="btn btn-outline view-details-btn">
                        View Details
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Initialize product card interactions
function initializeProductCardInteractions() {
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = parseInt(this.getAttribute('data-product-id'));
            cartManager.addToCart(productId, 1);
        });
    });

    // View details buttons
    document.querySelectorAll('.view-details-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Navigation is handled by the link href
            // We can add analytics or tracking here if needed
        });
    });

    // Product card clicks (for quick view or navigation)
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on buttons or links
            if (e.target.closest('button') || e.target.closest('a')) {
                return;
            }
            
            const productId = this.getAttribute('data-product-id');
            window.location.href = `product-detail.html?id=${productId}`;
        });
    });
}

// Initialize category cards
function initializeCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') return; // Let the link handle navigation
            
            const link = this.querySelector('a');
            if (link) {
                window.location.href = link.href;
            }
        });
    });
}

// Initialize time-based greeting
function initializeTimeGreeting() {
    updateTimeGreeting();
    
    // Update greeting every minute (in case user keeps page open for a long time)
    setInterval(updateTimeGreeting, 60000);
}

// Add smooth animations for homepage elements
function initializeHomepageAnimations() {
    // Animate elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements that should animate in
    document.querySelectorAll('.category-card, .product-card, .service-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeHomepage);
} else {
    initializeHomepage();
}

// Initialize animations after a short delay to ensure DOM is ready
setTimeout(initializeHomepageAnimations, 100);