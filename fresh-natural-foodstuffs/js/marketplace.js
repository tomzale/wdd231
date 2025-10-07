// Marketplace page functionality

// Global variables for marketplace
let currentProducts = [];
let filteredProducts = [];
let currentSort = 'popularity';
let currentCategory = 'all';
let currentPage = 1;
const productsPerPage = 12;

document.addEventListener('DOMContentLoaded', function() {
    initializeMarketplace();
});

function initializeMarketplace() {
    loadMarketplaceProducts();
    initializeFilters();
    initializeSearch();
    initializeSorting();
    initializeLoadMore();
    
    // Check for URL parameters
    checkUrlParameters();
}

// Load all marketplace products
function loadMarketplaceProducts() {
    currentProducts = [...products]; // Create a copy of all products
    filteredProducts = [...currentProducts];
    
    updateProductsCount();
    displayProducts();
}

// Display products in the marketplace grid
function displayProducts() {
    const productsContainer = document.getElementById('marketplace-products');
    if (!productsContainer) return;

    // Calculate pagination
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(0, endIndex);

    if (productsToShow.length === 0) {
        productsContainer.innerHTML = `
            <div class="no-products-message">
                <i class="fas fa-search"></i>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search terms</p>
                <button class="btn btn-primary" id="clear-all-filters">Clear All Filters</button>
            </div>
        `;
        
        document.getElementById('clear-all-filters')?.addEventListener('click', clearAllFilters);
        return;
    }

    // Generate product cards
    productsContainer.innerHTML = productsToShow.map(product => createMarketplaceProductCard(product)).join('');
    
    // Update load more button visibility
    updateLoadMoreButton();
    
    // Initialize product interactions
    initializeProductCardInteractions();
}

// Create product card for marketplace
function createMarketplaceProductCard(product) {
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
                
                <div class="stock-info">
                    ${product.inStock ? 
                        `<span class="in-stock"><i class="fas fa-check-circle"></i> In Stock</span>` : 
                        `<span class="out-of-stock"><i class="fas fa-times-circle"></i> Out of Stock</span>`
                    }
                    ${product.lowStock ? `<span class="low-stock">Few units left</span>` : ''}
                </div>
                
                <div class="product-actions">
                    <button class="btn btn-primary add-to-cart-btn" data-product-id="${product.id}" 
                        ${!product.inStock ? 'disabled' : ''}>
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

// Initialize filters
function initializeFilters() {
    initializeCategoryFilters();
    initializePriceFilter();
    initializeDiscountFilters();
    initializeExpressFilter();
}

// Category filters
function initializeCategoryFilters() {
    const categoryFilters = document.querySelectorAll('.category-filter');
    
    categoryFilters.forEach(filter => {
        filter.addEventListener('change', function() {
            if (this.value === 'all') {
                // If "All" is checked, uncheck others
                document.querySelectorAll('.category-filter').forEach(f => {
                    if (f !== this) f.checked = false;
                });
            } else {
                // If a specific category is checked, uncheck "All"
                document.getElementById('category-all').checked = false;
            }
            
            applyFilters();
        });
    });
}

// Price filter
function initializePriceFilter() {
    const applyPriceBtn = document.getElementById('apply-price');
    if (!applyPriceBtn) return;

    applyPriceBtn.addEventListener('click', function() {
        applyFilters();
    });

    // Also apply on Enter key in price inputs
    const priceInputs = document.querySelectorAll('#min-price, #max-price');
    priceInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                applyFilters();
            }
        });
    });
}

// Discount filters
function initializeDiscountFilters() {
    const discountFilters = document.querySelectorAll('input[id^="discount-"]');
    
    discountFilters.forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });
}

// Express delivery filter
function initializeExpressFilter() {
    const expressFilter = document.getElementById('express-delivery');
    if (!expressFilter) return;

    expressFilter.addEventListener('change', applyFilters);
}

// Apply all filters
function applyFilters() {
    currentPage = 1; // Reset to first page when filters change
    
    // Get active category
    const activeCategoryFilter = document.querySelector('.category-filter:checked');
    currentCategory = activeCategoryFilter ? activeCategoryFilter.value : 'all';
    
    // Start with all products
    filteredProducts = [...currentProducts];
    
    // Apply category filter
    if (currentCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === currentCategory);
    }
    
    // Apply price filter
    const minPrice = parseInt(document.getElementById('min-price').value) || 0;
    const maxPrice = parseInt(document.getElementById('max-price').value) || Number.MAX_SAFE_INTEGER;
    
    filteredProducts = filteredProducts.filter(product => 
        product.price >= minPrice && product.price <= maxPrice
    );
    
    // Apply discount filters
    const discountFilters = document.querySelectorAll('input[id^="discount-"]:checked');
    if (discountFilters.length > 0) {
        filteredProducts = filteredProducts.filter(product => {
            const discount = calculateDiscount(product.originalPrice, product.price);
            return Array.from(discountFilters).some(filter => {
                const minDiscount = parseInt(filter.id.replace('discount-', ''));
                return discount >= minDiscount;
            });
        });
    }
    
    // Apply express delivery filter
    const expressFilter = document.getElementById('express-delivery');
    if (expressFilter && expressFilter.checked) {
        filteredProducts = filteredProducts.filter(product => product.expressDelivery);
    }
    
    // Apply search filter if there's a search query
    const searchQuery = sessionStorage.getItem('searchQuery');
    if (searchQuery) {
        filteredProducts = searchProducts(searchQuery);
        sessionStorage.removeItem('searchQuery'); // Clear after use
    }
    
    // Apply sorting
    applySorting();
    
    // Update display
    updateProductsCount();
    displayProducts();
}

// Apply sorting to filtered products
function applySorting() {
    switch (currentSort) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'newest':
            // Assuming newer products have higher IDs
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
        case 'popularity':
        default:
            // Sort by rating (popularity)
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
    }
}

// Initialize sorting
function initializeSorting() {
    const sortSelect = document.getElementById('sort-select');
    if (!sortSelect) return;

    sortSelect.addEventListener('change', function() {
        currentSort = this.value;
        applySorting();
        displayProducts();
    });
}

// Initialize search
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    if (!searchInput || !searchBtn) return;

    // Search on button click
    searchBtn.addEventListener('click', performMarketplaceSearch);
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performMarketplaceSearch();
        }
    });
    
    // Live search with debounce
    searchInput.addEventListener('input', debounce(performMarketplaceSearch, 500));
}

function performMarketplaceSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    const query = searchInput.value.trim();
    
    if (query) {
        filteredProducts = searchProducts(query);
    } else {
        // If search is cleared, reset to current filters
        applyFilters();
        return;
    }
    
    updateProductsCount();
    displayProducts();
}

// Initialize load more functionality
function initializeLoadMore() {
    const loadMoreBtn = document.getElementById('load-more');
    if (!loadMoreBtn) return;

    loadMoreBtn.addEventListener('click', function() {
        currentPage++;
        displayProducts();
    });
}

// Update products count display
function updateProductsCount() {
    const countElement = document.getElementById('products-count');
    if (countElement) {
        countElement.textContent = `${filteredProducts.length} products found`;
    }
}

// Update load more button visibility
function updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('load-more');
    if (!loadMoreBtn) return;

    const totalProducts = filteredProducts.length;
    const displayedProducts = Math.min(currentPage * productsPerPage, totalProducts);
    
    if (displayedProducts >= totalProducts) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

// Clear all filters
function clearAllFilters() {
    // Reset category filter
    document.getElementById('category-all').checked = true;
    document.querySelectorAll('.category-filter').forEach(f => {
        if (f.id !== 'category-all') f.checked = false;
    });
    
    // Reset price filter
    document.getElementById('min-price').value = '1200';
    document.getElementById('max-price').value = '2922000';
    
    // Reset discount filters
    document.querySelectorAll('input[id^="discount-"]').forEach(f => f.checked = false);
    
    // Reset express filter
    document.getElementById('express-delivery').checked = false;
    
    // Reset search
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';
    
    // Apply reset filters
    applyFilters();
}

// Check URL parameters for pre-filtering
function checkUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category && categories.some(cat => cat.id === category)) {
        // Check the corresponding category filter
        const categoryFilter = document.getElementById(`category-${category}`);
        if (categoryFilter) {
            categoryFilter.checked = true;
            document.getElementById('category-all').checked = false;
        }
        
        applyFilters();
    }
}

// Initialize product card interactions (similar to homepage)
function initializeProductCardInteractions() {
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = parseInt(this.getAttribute('data-product-id'));
            cartManager.addToCart(productId, 1);
        });
    });

    // Product card clicks for navigation
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('button') || e.target.closest('a')) {
                return;
            }
            
            const productId = this.getAttribute('data-product-id');
            window.location.href = `product-detail.html?id=${productId}`;
        });
    });
}