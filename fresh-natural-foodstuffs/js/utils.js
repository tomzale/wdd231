// Utility Functions

// Product data
const products = [
    {
        id: 1,
        name: "Fresh Yam",
        category: "roots-tubers",
        price: 3500,
        originalPrice: 4000,
        description: "Fresh and healthy yam, perfect for your meals. Directly sourced from local farms in Edo State.",
        images: [
            "images/products/yam1.jpg",
            "images/products/yam2.jpg",
            "images/products/yam4.jpg",
            ],
        rating: 4.5,
        ratingCount: 33,
        inStock: true,
        lowStock: false,
        expressDelivery: true,
        featured: true
    },
    {
        id: 2,
        name: "Dried Stockfish",
        category: "fish-seafood",
        price: 4500,
        originalPrice: 5000,
        description: "Premium quality dried stockfish for delicious soups. Perfect for traditional Nigerian dishes.",
        images: [
           "images/products/drystockfish.jpg",
            "images/products/dryfishshop.jpg",
            "images/products/dried_fishR.jpg",
            "images/products/bonga_fish1.jpg",
            "images/products/bonga_fish2.jpg",
            "images/products/dried_fish4.jpg",
            "images/products/dried_fish5.jpg",
             "images/products/dried_fish_export.jpg"
        ],
        rating: 4.7,
        ratingCount: 28,
        inStock: true,
        lowStock: true,
        expressDelivery: true,
        featured: true
    },
    {
        id: 3,
        name: "Brown Beans",
        category: "grains-legumes",
        price: 1800,
        originalPrice: 2000,
        description: "Nutritious brown beans, rich in protein and fiber. Perfect for healthy family meals.",
        images: [
            "images/products/beans2.jpg",
            "images/products/beans1.jpg"
        ],
        rating: 4.3,
        ratingCount: 42,
        inStock: true,
        lowStock: false,
        expressDelivery: true,
        featured: true
    },
    {
        id: 4,
        name: "Fresh Palm Oil",
        category: "oils-spices",
        price: 2500,
        originalPrice: 2800,
        description: "Pure, natural palm oil extracted from fresh palm fruits. No additives or preservatives.",
        images: [
            "images/products/redoil.jpg",
            "images/products/palm_oil2.jpg"],
        rating: 4.6,
        ratingCount: 19,
        inStock: true,
        lowStock: false,
        expressDelivery: true,
        featured: true
    },
    {
        id: 5,
        name: "Live Chicken",
        category: "meat-poultry",
        price: 5000,
        originalPrice: 5500,
        description: "Healthy, free-range chicken available for order. Fresh and ready for your special occasions.",
        images: [
            "images/products/live_chicken.jpg",
            "images/products/chicken2.jpg",

        ],
        rating: 4.4,
        ratingCount: 15,
        inStock: true,
        lowStock: true,
        expressDelivery: false,
        featured: false
    },
    {
        id: 6,
        name: "Fresh Snails",
        category: "others",
        price: 3000,
        originalPrice: 3500,
        description: "Fresh, cleaned snails perfect for your delicacies. Sourced from local snail farms.",
        images: [
            "images/products/snailBig1.jpg",
            "images/products/snail2.jpg",
            "images/products/snail1.jpg",
            "images/products/snailBowl.jpg"
        ],
        rating: 4.2,
        ratingCount: 8,
        inStock: true,
        lowStock: false,
        expressDelivery: true,
        featured: false
    },
    {
        id: 7,
        name: "Plantain",
        category: "roots-tubers",
        price: 1200,
        originalPrice: 1500,
        description: "Fresh, ripe plantain for frying or boiling. Perfect for side dishes and snacks.",
        images: [
            "images/products/plantain2.jpg",
           
        ],
        rating: 4.1,
        ratingCount: 25,
        inStock: true,
        lowStock: false,
        expressDelivery: true,
        featured: false
    },
    {
        id: 8,
        name: "Egusi (Melon)",
        category: "grains-legumes",
        price: 2200,
        originalPrice: 2500,
        description: "High-quality egusi for your traditional soups. Ground and ready to use.",
        images: [
            "images/products/egusi2.jpg",
            "images/products/egusi1.jpg"
        ],
        rating: 4.5,
        ratingCount: 31,
        inStock: true,
        lowStock: false,
        expressDelivery: true,
        featured: false
    },
    {
        id: 9,
        name: "Crayfish",
        category: "fish-seafood",
        price: 1800,
        originalPrice: 2000,
        description: "Fresh, dried crayfish for flavoring your soups and stews. Rich in protein and flavor.",
        images: [
            "images/products/crayfish3.jpg",
            "images/products/crayfish2.jpg",
            "images/products/crayfish1.jpg"
        ],
        rating: 4.6,
        ratingCount: 22,
        inStock: true,
        lowStock: true,
        expressDelivery: true,
        featured: false
    },
    {
        id: 10,
        name: "Fresh Cow Meat",
        category: "meat-poultry",
        price: 2800,
        originalPrice: 3200,
        description: "Fresh cow meat, available in different cuts. Perfect for grilling, frying, or stewing.",
        images: [
            "images/products/meat1.jpg",
            "images/products/cowleg1.jpg",
        ],
        rating: 4.3,
        ratingCount: 18,
        inStock: true,
        lowStock: false,
        expressDelivery: false,
        featured: false
    },
    {
        id: 11,
        name: "Garri",
        category: "grains-legumes",
        price: 1500,
        originalPrice: 1800,
        description: "Premium quality garri, perfect for eba or soaking. Made from fresh cassava.",
        images: [
            "images/products/garri1.jpg",
            "images/products/garri2.jpg",
            "images/products/garri_bag1.jpg"
        ],
        rating: 4.4,
        ratingCount: 37,
        inStock: true,
        lowStock: false,
        expressDelivery: true,
        featured: false
    },
    {
        id: 12,
        name: "Coco Yam",
        category: "roots-tubers",
        price: 1200,
        originalPrice: 1500,
        description: "Fresh coco yam, perfect for boiling, frying, or making porridge.",
        images: [
            "images/products/cocoyam2.jpg",
            "images/products/cocoyam1.jpg"
        ],
        rating: 4.2,
        ratingCount: 14,
        inStock: true,
        lowStock: false,
        expressDelivery: true,
        featured: false
    }
];

// Categories data
const categories = [
    { id: "all", name: "All Categories" },
    { id: "fish-seafood", name: "Fish & Seafood" },
    { id: "roots-tubers", name: "Roots & Tubers" },
    { id: "grains-legumes", name: "Grains & Legumes" },
    { id: "meat-poultry", name: "Meat & Poultry" },
    { id: "oils-spices", name: "Oils & Spices" },
    { id: "others", name: "Others" }
];

// Cart management
class CartManager {
    constructor() {
        this.cart = this.loadCart();
    }

    loadCart() {
        const cart = localStorage.getItem('freshNaturalCart');
        return cart ? JSON.parse(cart) : [];
    }

    saveCart() {
        localStorage.setItem('freshNaturalCart', JSON.stringify(this.cart));
        this.updateCartCount();
    }

    updateCartCount() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        
        cartCountElements.forEach(element => {
            element.textContent = totalItems;
        });
    }

    addToCart(productId, quantity = 1) {
        const product = products.find(p => p.id === productId);
        if (!product) return false;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                quantity: quantity,
                expressDelivery: product.expressDelivery
            });
        }

        this.saveCart();
        this.showAddToCartNotification(product.name);
        return true;
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
    }

    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
            }
        }
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
    }

    getCartItems() {
        return this.cart;
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    showAddToCartNotification(productName) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'add-to-cart-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>${productName} added to cart</span>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--primary);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(120%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(120%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize cart manager
const cartManager = new CartManager();

// Time-based greeting
function updateTimeGreeting() {
    const greetingElement = document.getElementById('time-greeting');
    if (!greetingElement) return;

    const now = new Date();
    const hour = now.getHours();
    let greeting;

    if (hour < 12) {
        greeting = "Good Morning!";
    } else if (hour < 18) {
        greeting = "Good Afternoon!";
    } else {
        greeting = "Good Evening!";
    }

    greetingElement.textContent = greeting;
}

// Format currency
function formatCurrency(amount) {
    return '₦' + amount.toLocaleString('en-NG');
}

// Calculate discount percentage
function calculateDiscount(originalPrice, currentPrice) {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

// Generate star rating HTML
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    let stars = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    // Half star
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Get product by ID
function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}

// Get similar products (by category)
function getSimilarProducts(productId, limit = 4) {
    const product = getProductById(productId);
    if (!product) return [];
    
    return products
        .filter(p => p.id !== productId && p.category === product.category)
        .slice(0, limit);
}

// Get featured products
function getFeaturedProducts(limit = 4) {
    return products.filter(product => product.featured).slice(0, limit);
}

// Filter products by category
function filterProductsByCategory(category) {
    if (category === 'all') return products;
    return products.filter(product => product.category === category);
}

// Search products
function searchProducts(query) {
    const lowerQuery = query.toLowerCase();
    return products.filter(product => 
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.category.toLowerCase().includes(lowerQuery)
    );
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateTimeGreeting();
    cartManager.updateCartCount();
});

// async function for loading product data
async function loadProducts() {
    try {
        console.log("Loading products...");

        // Simulate fetching data (this could be replaced with an actual API)
        const response = await new Promise((resolve) => {
            setTimeout(() => resolve({ data: products }), 1000);
        });

        console.log("✅ Products loaded successfully:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ Error loading products:", error);
        return [];
    }
}


// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        products,
        categories,
        cartManager,
        updateTimeGreeting,
        formatCurrency,
        calculateDiscount,
        generateStarRating,
        getProductById,
        getSimilarProducts,
        getFeaturedProducts,
        filterProductsByCategory,
        searchProducts
    };
}