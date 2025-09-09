// Toggle mobile navigation
const hamburger = document.querySelector('.hamburger');
const navigation = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
    navigation.classList.toggle('show');
    hamburger.classList.toggle('active');
});

// Close navigation when clicking outside
document.addEventListener('click', (e) => {
    const isClickInsideNav = navigation.contains(e.target);
    const isClickOnHamburger = hamburger.contains(e.target);
    
    if (!isClickInsideNav && !isClickOnHamburger && navigation.classList.contains('show')) {
        navigation.classList.remove('show');
        hamburger.classList.remove('active');
    }
});

// Responsive navigation adjustments
function handleResize() {
    if (window.innerWidth >= 768) {
        navigation.classList.remove('show');
    }
}

window.addEventListener('resize', handleResize);