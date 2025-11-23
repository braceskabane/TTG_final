/**
 * Main Application Entry Point
 * Initializes the registration form
 */

import { RegistrationForm } from './components/form.js';

/**
 * Initialize application when DOM is ready
 */
function initApp() {
    // Initialize registration form
    const registrationForm = new RegistrationForm('registrationForm');
    
    // Add global error handler
    // Misal ada fungsi kosong di component maka akan muncul di browser tapi tidak ditangkap di script
    window.addEventListener('error', (event) => {
        console.error('Global error:', event.error);
    });
    
    // Add unhandled promise rejection handler
    // Handle API gagal misal Database down dari proses async
    window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled promise rejection:', event.reason);
    });
    
    // Log initialization
    console.log('Registration form initialized successfully');
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
