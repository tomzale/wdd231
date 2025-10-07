// Product detail page functionality

let currentProduct = null;
let currentImageIndex = 0;
let currentQuantity = 1;

document.addEventListener('DOMContentLoaded', function() {
    initializeProductDetail();
});

function initializeProductDetail() {
    loadProductDetails();
    initializeQuantitySelector();
    initializeImageGallery();
    initializeActionButtons();
    loadSimilarProducts();
}

// Load product details from URL parameter
function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        showProductNotFound();
        return;
    }
    
    currentProduct = getProductById(parseInt(productId));
    
    if (!currentProduct) {
        showProductNotFound();
        return;
    }
    
    displayProductDetails();
}

// Display product details on the page
function displayProductDetails() {
    if (!currentProduct) return;
    
    // Update breadcrumb
    updateBreadcrumb();
    
    // Update product images
    displayProductImages();
    
    // Update product info
    updateProductInfo();
    
    // Update page title
    document.title = `${currentProduct.name} | Fresh & Natural Foodstuffs`;
    
    // Add product to recently viewed
    addToRecentlyViewed(currentProduct.id);
}

// Update breadcrumb navigation
function updateBreadcrumb() {
    const categoryBreadcrumb = document.getElementById('product-category-breadcrumb');
    const nameBreadcrumb = document.getElementById('product-name-breadcrumb');
    
    if (categoryBreadcrumb) {
        const category = categories.find(cat => cat.id === currentProduct.category);
        categoryBreadcrumb.textContent = category ? category.name : 'Category';
    }
    
    if (nameBreadcrumb) {
        nameBreadcrumb.textContent = currentProduct.name;
    }
}

// Display product images in gallery
function displayProductImages() {
    const mainImage = document.getElementById('main-product-image');
    const thumbnailsContainer = document.getElementById('image-thumbnails');
    
    if (!mainImage || !thumbnailsContainer) return;
    
    // Set main image
    if (currentProduct.images.length > 0) {
        mainImage.src = currentProduct.images[0];
        mainImage.alt = currentProduct.name;
    }
    
    // Create thumbnails
    thumbnailsContainer.innerHTML = currentProduct.images.map((image, index) => `
        <div class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
            <img src="${image}" alt="${currentProduct.name} - View ${index + 1}">
        </div>
    `).join('');
    
    // Set first image as active
    currentImageIndex = 0;
}

// Initialize image gallery functionality
function initializeImageGallery() {
    const thumbnailsContainer = document.getElementById('image-thumbnails');
    if (!thumbnailsContainer) return;
    
    // Thumbnail click events
    thumbnailsContainer.addEventListener('click', function(e) {
        const thumbnail = e.target.closest('.thumbnail');
        if (!thumbnail) return;
        
        const index = parseInt(thumbnail.getAttribute('data-index'));
        setActiveImage(index);
    });
}

// Set active image in gallery
function setActiveImage(index) {
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (!mainImage || index >= currentProduct.images.length) return;
    
    // Update main image
    mainImage.src = currentProduct.images[index];
    currentImageIndex = index;
    
    // Update active thumbnail
    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

// Update product information
function updateProductInfo() {
    // Product name
    const nameElement = document.getElementById('product-detail-name');
    if (nameElement) {
        nameElement.textContent = currentProduct.name;
    }
    
    // Rating
    const ratingCountElement = document.getElementById('product-rating-count');
    if (ratingCountElement) {
        ratingCountElement.textContent = `(${currentProduct.ratingCount} reviews)`;
    }
    
    // Update star rating display
    const ratingStars = document.querySelector('.rating-stars');
    if (ratingStars) {
        ratingStars.innerHTML = generateStarRating(currentProduct.rating);
    }
    
    // Prices
    const currentPriceElement = document.getElementById('product-detail-price');
    const originalPriceElement = document.getElementById('product-detail-original-price');
    const discountElement = document.getElementById('product-detail-discount');
    
    if (currentPriceElement) {
        currentPriceElement.textContent = formatCurrency(currentProduct.price);
    }
    
    if (originalPriceElement) {
        if (currentProduct.originalPrice > currentProduct.price) {
            originalPriceElement.textContent = formatCurrency(currentProduct.originalPrice);
            originalPriceElement.style.display = 'inline';
        } else {
            originalPriceElement.style.display = 'none';
        }
    }
    
    if (discountElement) {
        const discount = calculateDiscount(currentProduct.originalPrice, currentProduct.price);
        if (discount > 0) {
            discountElement.textContent = `${discount}% off`;
            discountElement.style.display = 'inline';
        } else {
            discountElement.style.display = 'none';
        }
    }
    
    // Stock information
    const stockStatusElement = document.getElementById('stock-status');
    const lowStockElement = document.getElementById('low-stock-message');
    
    if (stockStatusElement) {
        if (currentProduct.inStock) {
            stockStatusElement.innerHTML = '<i class="fas fa-check-circle"></i> In Stock';
            stockStatusElement.className = 'in-stock';
        } else {
            stockStatusElement.innerHTML = '<i class="fas fa-times-circle"></i> Out of Stock';
            stockStatusElement.className = 'out-of-stock';
        }
    }
    
    if (lowStockElement) {
        lowStockElement.style.display = currentProduct.lowStock ? 'inline' : 'none';
    }
    
    // Description
    const descriptionElement = document.getElementById('product-detail-description');
    if (descriptionElement) {
        descriptionElement.textContent = currentProduct.description;
    }
}

// Initialize quantity selector
function initializeQuantitySelector() {
    const decreaseBtn = document.getElementById('decrease-qty');
    const increaseBtn = document.getElementById('increase-qty');
    const quantityInput = document.getElementById('quantity');
    
    if (!decreaseBtn || !increaseBtn || !quantityInput) return;
    
    decreaseBtn.addEventListener('click', function() {
        if (currentQuantity > 1) {
            currentQuantity--;
            quantityInput.value = currentQuantity;
        }
    });
    
    increaseBtn.addEventListener('click', function() {
        currentQuantity++;
        quantityInput.value = currentQuantity;
    });
    
    quantityInput.addEventListener('change', function() {
        const value = parseInt(this.value) || 1;
        currentQuantity = Math.max(1, value);
        this.value = currentQuantity;
    });
    
    quantityInput.addEventListener('input', function() {
        // Allow only numbers
        this.value = this.value.replace(/[^0-9]/g, '');
    });
}

// Initialize action buttons (Add to Cart, Buy Now)
function initializeActionButtons() {
    const addToCartBtn = document.getElementById('add-to-cart-detail');
    const buyNowBtn = document.getElementById('buy-now-whatsapp');
    
    if (!addToCartBtn || !buyNowBtn) return;
    
    // Add to Cart button
    addToCartBtn.addEventListener('click', function() {
        if (!currentProduct) return;
        
        cartManager.addToCart(currentProduct.id, currentQuantity);
        
        // Show success feedback
        this.innerHTML = '<i class="fas fa-check"></i> Added to Cart';
        this.classList.add('btn-success');
        
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
            this.classList.remove('btn-success');
        }, 2000);
    });
    
    // Buy Now (WhatsApp) button
    buyNowBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (!currentProduct) return;
        
        // Create a temporary cart item for WhatsApp message
        const tempCartItem = {
            id: currentProduct.id,
            name: currentProduct.name,
            price: currentProduct.price,
            quantity: currentQuantity
        };
        
        const whatsappUrl = generateWhatsAppMessage([tempCartItem]);
        window.open(whatsappUrl, '_blank');
    });
    
    // Disable buttons if product is out of stock
    if (!currentProduct.inStock) {
        addToCartBtn.disabled = true;
        addToCartBtn.innerHTML = '<i class="fas fa-times"></i> Out of Stock';
        
        buyNowBtn.style.opacity = '0.6';
        buyNowBtn.style.pointerEvents = 'none';
    }
}

// Load similar products
function loadSimilarProducts() {
    const similarContainer = document.getElementById('similar-products');
    if (!similarContainer || !currentProduct) return;
    
    const similarProducts = getSimilarProducts(currentProduct.id, 4);
    
    if (similarProducts.length === 0) {
        similarContainer.innerHTML = '<p class="no-products">No similar products found.</p>';
        return;
    }
    
    similarContainer.innerHTML = similarProducts.map(product => createSimilarProductCard(product)).join('');
    
    // Initialize interactions for similar products
    initializeSimilarProductInteractions();
}

// Create product card for similar products section
function createSimilarProductCard(product) {
    const discount = calculateDiscount(product.originalPrice, product.price);
    
    return `
        <div class="product-card" data-product-id="${product.id}">
            ${product.expressDelivery ? '<span class="express-badge">JUMIA 4 EXPRESS</span>' : ''}
            ${discount > 0 ? `<span class="product-badge">${discount}% OFF</span>` : ''}
            
            <div class="product-img">
                <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
            </div>
            
            <div class="product-info">
                <h3>${product.name}</h3>
                
                <div class="product-price">
                    <span class="current-price">${formatCurrency(product.price)}</span>
                    ${product.originalPrice > product.price ? 
                        `<span class="original-price">${formatCurrency(product.originalPrice)}</span>` : ''}
                </div>
                
                <div class="product-actions">
                    <button class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <a href="product-detail.html?id=${product.id}" class="btn btn-outline">
                        View Details
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Initialize interactions for similar products
function initializeSimilarProductInteractions() {
    // Add to cart buttons in similar products
    document.querySelectorAll('#similar-products .add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = parseInt(this.getAttribute('data-product-id'));
            cartManager.addToCart(productId, 1);
        });
    });
    
    // Navigation for similar product cards
    document.querySelectorAll('#similar-products .product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('button') || e.target.closest('a')) {
                return;
            }
            
            const productId = this.getAttribute('data-product-id');
            window.location.href = `product-detail.html?id=${productId}`;
        });
    });
}

// Show product not found message
function showProductNotFound() {
    const productDetailContent = document.querySelector('.product-detail-content');
    
    if (productDetailContent) {
        productDetailContent.innerHTML = `
            <div class="product-not-found">
                <i class="fas fa-exclamation-triangle"></i>
                <h2>Product Not Found</h2>
                <p>The product you're looking for doesn't exist or may have been removed.</p>
                <a href="marketplace.html" class="btn btn-primary">Browse Products</a>
            </div>
        `;
    }
    
    // Hide similar products section
    const similarProducts = document.querySelector('.similar-products');
    if (similarProducts) {
        similarProducts.style.display = 'none';
    }
}

// Add product to recently viewed in localStorage
function addToRecentlyViewed(productId) {
    let recentlyViewed = JSON.parse(localStorage.getItem('freshNaturalRecentlyViewed')) || [];
    
    // Remove if already exists (to avoid duplicates)
    recentlyViewed = recentlyViewed.filter(id => id !== productId);
    
    // Add to beginning
    recentlyViewed.unshift(productId);
    
    // Keep only last 10 products
    if (recentlyViewed.length > 10) {
        recentlyViewed = recentlyViewed.slice(0, 10);
    }
    
    localStorage.setItem('freshNaturalRecentlyViewed', JSON.stringify(recentlyViewed));
}

// Add CSS for success state
const successStyle = document.createElement('style');
successStyle.textContent = `
    .btn-success {
        background-color: #28a745 !important;
    }
    
    .product-not-found {
        text-align: center;
        padding: 4rem 2rem;
        color: var(--text-light);
    }
    
    .product-not-found i {
        font-size: 4rem;
        color: var(--secondary);
        margin-bottom: 1rem;
    }
    
    .product-not-found h2 {
        color: var(--text-dark);
        margin-bottom: 1rem;
    }
    
    .out-of-stock {
        color: var(--accent);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
    }
`;
document.head.appendChild(successStyle);