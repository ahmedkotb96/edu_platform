// Tailwind CSS initialization
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'primary': '#667eea',
                'secondary': '#764ba2',
            }
        }
    }
}

// Page navigation
function showPage(page) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => {
        p.classList.add('hidden');
        if (p.id === page + '-page') {
            p.classList.remove('hidden');
        }
    });
    // Update active nav item
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.add('text-gray-500');
        item.classList.remove('text-gray-900');
    });
    const activeItem = document.querySelector(`.nav-item[onclick="showPage('${page}')"]`);
    if (activeItem) {
        activeItem.classList.add('text-gray-900');
        activeItem.classList.remove('text-gray-500');
    }
}

// Authentication modal functions
function showAuthModal(mode) {
    const modal = document.getElementById('auth-modal');
    const title = document.getElementById('modal-title');
    const content = document.getElementById('modal-content');
    const toggleText = document.getElementById('auth-toggle-text');
    const forgotText = document.getElementById('auth-forgot-text');

    modal.classList.remove('hidden');
    if (mode === 'signin') {
        title.innerText = 'Sign In';
        content.querySelector('#signin-form').classList.remove('hidden');
        content.querySelector('#signup-form').classList.add('hidden');
        content.querySelector('#forgot-password-form').classList.add('hidden');
        toggleText.classList.remove('hidden');
        forgotText.classList.add('hidden');
    } else if (mode === 'signup') {
        title.innerText = 'Sign Up';
        content.querySelector('#signin-form').classList.add('hidden');
        content.querySelector('#signup-form').classList.remove('hidden');
        content.querySelector('#forgot-password-form').classList.add('hidden');
        toggleText.classList.add('hidden');
        forgotText.classList.add('hidden');
    } else if (mode === 'forgot') {
        title.innerText = 'Forgot Password';
        content.querySelector('#signin-form').classList.add('hidden');
        content.querySelector('#signup-form').classList.add('hidden');
        content.querySelector('#forgot-password-form').classList.remove('hidden');
        toggleText.classList.add('hidden');
        forgotText.classList.remove('hidden');
    }
}

function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    modal.classList.add('hidden');
}

function toggleAuthMode() {
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const toggleText = document.getElementById('auth-toggle-text');
    const forgotText = document.getElementById('auth-forgot-text');

    if (signinForm.classList.contains('hidden')) {
        signinForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        forgotPasswordForm.classList.add('hidden');
        toggleText.classList.remove('hidden');
        forgotText.classList.add('hidden');
    } else {
        signinForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        forgotPasswordForm.classList.add('hidden');
        toggleText.classList.add('hidden');
        forgotText.classList.add('hidden');
    }
}

function showForgotPassword() {
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');
    const forgotPasswordForm = document.getElementById('forgot-password-form');
    const toggleText = document.getElementById('auth-toggle-text');
    const forgotText = document.getElementById('auth-forgot-text');

    signinForm.classList.add('hidden');
    signupForm.classList.add('hidden');
    forgotPasswordForm.classList.remove('hidden');
    toggleText.classList.add('hidden');
    forgotText.classList.remove('hidden');
}

// Authentication functions
function signin() {
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;
    console.log('Signing in with', email, password);
    closeAuthModal();
}

function signup() {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    console.log('Signing up with', name, email, password, confirmPassword);
    closeAuthModal();
}

function sendResetLink() {
    const email = document.getElementById('reset-email').value;
    console.log('Sending password reset link to', email);
    closeAuthModal();
}

function logout() {
    console.log('Logging out');
}

// Language switching
let currentLang = 'en';

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    updateContent();
    
    // Update button text
    const langBtn = document.getElementById('lang-switch');
    langBtn.textContent = currentLang === 'en' ? 'عربي' : 'English';
}

function updateContent() {
    // Update navigation
    document.querySelectorAll('[data-trans]').forEach(element => {
        const key = element.getAttribute('data-trans');
        const keys = key.split('.');
        let translation = translations[currentLang];
        
        try {
            keys.forEach(k => {
                if (translation && typeof translation === 'object') {
                    translation = translation[k];
                }
            });
            
            // Only update if translation is a string
            if (typeof translation === 'string') {
                element.textContent = translation;
            } else if (Array.isArray(translation)) {
                // Handle arrays (like lists)
                element.innerHTML = translation.join('<br>');
            } else if (translation === undefined) {
                console.warn(`Translation missing for key: ${key}`);
            }
        } catch (error) {
            console.warn(`Error updating translation for key: ${key}`, error);
        }
    });

    // Update classes for RTL/LTR
    if (currentLang === 'ar') {
        document.body.classList.add('font-arabic');
    } else {
        document.body.classList.remove('font-arabic');
    }
}

// Course filtering
function filterCourses() {
    const selectedCategory = document.querySelector('select[data-trans="courses.filterCategory"]').value;
    const selectedLevel = document.querySelector('select[data-trans="courses.filterLevel"]').value;
    const courseCards = document.querySelectorAll('.course-card');

    courseCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const cardLevel = card.getAttribute('data-level');
        
        const categoryMatch = selectedCategory === 'All Categories' || cardCategory === selectedCategory;
        const levelMatch = selectedLevel === 'All Levels' || cardLevel === selectedLevel;

        if (categoryMatch && levelMatch) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

// Dark mode functionality
function applyTheme(isDark) {
    const html = document.documentElement;
    const icon = document.querySelector('#dark-mode-toggle i');

    if (isDark) {
        html.classList.add('dark');
        if (icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    } else {
        html.classList.remove('dark');
        if (icon) {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

function toggleDarkMode() {
    const isDark = !document.documentElement.classList.contains('dark');
    localStorage.setItem('darkMode', isDark);
    applyTheme(isDark);
}

// Initialize dark mode on page load
document.addEventListener('DOMContentLoaded', () => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    applyTheme(darkMode);
    
    updateContent();
    
    // Add event listeners for filters
    const categorySelect = document.querySelector('select[data-trans="courses.filterCategory"]');
    const levelSelect = document.querySelector('select[data-trans="courses.filterLevel"]');
    
    if (categorySelect) categorySelect.addEventListener('change', filterCourses);
    if (levelSelect) levelSelect.addEventListener('change', filterCourses);
});

// Mobile menu functionality
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuPanel = mobileMenu.querySelector('.transform');
    const menuButton = document.getElementById('mobile-menu-button');
    const menuIcon = menuButton.querySelector('i');

    if (mobileMenu.classList.contains('hidden')) {
        // Show menu
        mobileMenu.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
        // Trigger slide-in animation after a small delay
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                menuPanel.classList.remove('translate-x-full');
            });
        });
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        // Hide menu
        menuPanel.classList.add('translate-x-full');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
        // Wait for animation to complete before hiding the menu
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }, 300);
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuPanel = mobileMenu.querySelector('.transform');
    const menuButton = document.getElementById('mobile-menu-button');
    const menuIcon = menuButton.querySelector('i');

    // Add the translate-x-full class to slide the panel out
    menuPanel.classList.add('translate-x-full');
    menuIcon.classList.remove('fa-times');
    menuIcon.classList.add('fa-bars');

    // Wait for the animation to complete before hiding the menu
    setTimeout(() => {
        mobileMenu.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
        // Reset to main menu when closing
        showMobileMainMenu();
    }, 300);
}

function showMobileMainMenu() {
    document.getElementById('mobile-menu-title').textContent = 'Menu';
    document.getElementById('mobile-main-menu').classList.remove('hidden');
    document.getElementById('mobile-signup-form').classList.add('hidden');
    document.getElementById('mobile-signin-form').classList.add('hidden');
}

function showMobileSignUp() {
    document.getElementById('mobile-menu-title').textContent = 'Sign Up';
    document.getElementById('mobile-main-menu').classList.add('hidden');
    document.getElementById('mobile-signup-form').classList.remove('hidden');
    document.getElementById('mobile-signin-form').classList.add('hidden');
}

function showMobileSignIn() {
    document.getElementById('mobile-menu-title').textContent = 'Sign In';
    document.getElementById('mobile-main-menu').classList.add('hidden');
    document.getElementById('mobile-signup-form').classList.add('hidden');
    document.getElementById('mobile-signin-form').classList.remove('hidden');
}

function handleMobileSignUp() {
    // Get form values
    const name = document.getElementById('mobile-signup-name').value;
    const email = document.getElementById('mobile-signup-email').value;
    const password = document.getElementById('mobile-signup-password').value;
    const confirmPassword = document.getElementById('mobile-signup-confirm-password').value;

    // Add your sign up logic here
    console.log('Mobile Sign Up:', { name, email, password, confirmPassword });
    
    // Close mobile menu after successful sign up
    closeMobileMenu();
}

function handleMobileSignIn() {
    // Get form values
    const email = document.getElementById('mobile-signin-email').value;
    const password = document.getElementById('mobile-signin-password').value;
    const rememberMe = document.getElementById('mobile-remember-me').checked;

    // Add your sign in logic here
    console.log('Mobile Sign In:', { email, password, rememberMe });
    
    // Close mobile menu after successful sign in
    closeMobileMenu();
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        const menuPanel = mobileMenu.querySelector('.transform');
        if (!menuPanel.contains(event.target) && !mobileMenuButton.contains(event.target)) {
            closeMobileMenu();
        }
    }
});
