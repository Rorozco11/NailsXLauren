const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const bar1 = document.getElementById('bar1');
const bar2 = document.getElementById('bar2');
const bar3 = document.getElementById('bar3');

menuToggle.addEventListener('change', function() {
    if (this.checked) {
        mobileMenu.style.height = '100vh';
        // Transform hamburger to X
        bar1.style.transform = 'rotate(45deg) translate(8px, 8px)';
        bar2.style.opacity = '0';
        bar3.style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        mobileMenu.style.height = '0';
        // Reset hamburger
        bar1.style.transform = 'none';
        bar2.style.opacity = '1';
        bar3.style.transform = 'none';
    }
});
