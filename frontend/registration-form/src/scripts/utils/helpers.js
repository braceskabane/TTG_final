/* =====================================================
   🛠️ HELPER UTILITIES
   =====================================================
   
   File ini berisi fungsi-fungsi bantuan untuk:
   1. Class manipulation (addClass, removeClass)
   2. Form validation UI (setError, clearError, setSuccess)
   3. Form data handling (getFormData, resetForm)
   4. Performance optimization (debounce)
   
   ===================================================== */


/* ========================================
   TIMING & PERFORMANCE
   ======================================== */

/**
 * Debounce function - Membatasi frekuensi eksekusi fungsi
 * 
 * Kenapa perlu? Agar validasi tidak terlalu sering dipanggil
 * saat user mengetik (hemat resource, lebih smooth)
 * 
 * Contoh penggunaan:
 * input.addEventListener('input', debounce(() => validate(), 300));
 * → Validasi hanya dipanggil 300ms setelah user berhenti mengetik
 * 
 * @param {Function} func - Fungsi yang akan di-debounce
 * @param {number} wait - Waktu tunggu dalam milliseconds
 * @returns {Function} - Fungsi yang sudah di-debounce
 */
export function debounce(func, wait = 300) {
    let timeout;
    
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


/* ========================================
   CLASS MANIPULATION
   ======================================== */
   
/**
 * Tambah class ke element
 * 
 * Cara kerja: JavaScript menambah class → CSS apply styling
 * 
 * Contoh:
 * addClass(input, 'error')
 * → Element dapat class "error"
 * → CSS detect: .form-input.error { border-color: red; }
 * → Input border jadi merah!
 * 
 * @param {HTMLElement} element - Element target
 * @param {string} className - Nama class yang ditambahkan
 */
export function addClass(element, className) {
    if (element && className) {
        element.classList.add(className);
    }
}

/**
 * Hapus class dari element
 * 
 * Cara kerja: JavaScript hapus class → CSS styling hilang
 * 
 * Contoh:
 * removeClass(input, 'error')
 * → Class "error" dihapus
 * → CSS .form-input.error tidak apply lagi
 * → Border kembali ke warna normal
 * 
 * @param {HTMLElement} element - Element target
 * @param {string} className - Nama class yang dihapus
 */
export function removeClass(element, className) {
    if (element && className) {
        element.classList.remove(className);
    }
}


/* ========================================
   FORM VALIDATION UI
   ======================================== */

/**
 * Set error state untuk input field
 * 
 * Cara kerja (JavaScript + CSS):
 * 1. JS: addClass(input, 'error')
 * 2. CSS: .form-input.error { border-color: var(--color-error); }
 * 3. Result: Border jadi merah!
 * 
 * 4. JS: errorElement.textContent = "Email tidak valid"
 * 5. JS: addClass(errorElement, 'active')
 * 6. CSS: .error-message.active { display: block; color: red; }
 * 7. Result: Error message muncul dengan warna merah!
 * 
 * @param {HTMLElement} input - Input element
 * @param {string} message - Error message text
 */
export function setError(input, message) {
    if (!input) return;
    
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup?.querySelector('.error-message');
    
    // STEP 1: Tambah class 'error' ke input
    // → CSS akan apply: border-color: var(--color-error)
    addClass(input, 'error');
    
    // STEP 2: Hapus class 'success' jika ada
    removeClass(input, 'success');
    
    // STEP 3: Set error message text & show it
    if (errorElement) {
        errorElement.textContent = message;
        addClass(errorElement, 'active');
        // → CSS akan apply: display: block; color: var(--color-error);
    }
}

/**
 * Clear error state dari input field
 * 
 * Cara kerja:
 * 1. JS: removeClass(input, 'error')
 * 2. CSS: Border kembali ke warna normal (gray)
 * 3. JS: errorElement.textContent = ''
 * 4. JS: removeClass(errorElement, 'active')
 * 5. CSS: Error message di-hide (display: none)
 * 
 * @param {HTMLElement} input - Input element
 */
export function clearError(input) {
    if (!input) return;
    
    const formGroup = input.closest('.form-group');
    const errorElement = formGroup?.querySelector('.error-message');
    
    // Hapus class 'error' → border kembali normal
    removeClass(input, 'error');
    
    // Clear & hide error message
    if (errorElement) {
        errorElement.textContent = '';
        removeClass(errorElement, 'active');
    }
}

/**
 * Set success state untuk input field
 * 
 * Cara kerja:
 * 1. JS: addClass(input, 'success')
 * 2. CSS: .form-input.success { border-color: var(--color-success); }
 * 3. Result: Border jadi hijau!
 * 
 * @param {HTMLElement} input - Input element
 */
export function setSuccess(input) {
    if (!input) return;
    
    // Tambah class 'success' → CSS apply border hijau
    addClass(input, 'success');
    
    // Hapus error jika ada
    removeClass(input, 'error');
    clearError(input);
}


/* ========================================
   FORM DATA HANDLING
   ======================================== */

/**
 * Ambil data dari form sebagai JavaScript object
 * 
 * Cara kerja:
 * 1. new FormData(form) → Buat FormData object
 * 2. Loop entries → Konversi jadi plain object
 * 
 * Input (HTML):
 * <input name="fullName" value="John Doe">
 * <input name="email" value="john@example.com">
 * 
 * Output (JavaScript):
 * {
 *   fullName: "John Doe",
 *   email: "john@example.com"
 * }
 * 
 * @param {HTMLFormElement} form - Form element
 * @returns {Object} - Form data as key-value pairs
 */
export function getFormData(form) {
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    return data;
}

/**
 * Reset form dan clear semua states
 * 
 * Cara kerja:
 * 1. form.reset() → Browser API, kosongkan semua input values
 * 2. Loop semua inputs → Clear error & success states
 * 3. Reset password strength indicator
 * 
 * @param {HTMLFormElement} form - Form element
 */
export function resetForm(form) {
    if (!form) return;
    
    // Reset semua input values (built-in browser function)
    form.reset();
    
    // Clear all error & success states
    const inputs = form.querySelectorAll('.form-input');
    inputs.forEach(input => {
        clearError(input);
        removeClass(input, 'success');
    });
    
    // Clear password strength indicator
    const strengthIndicator = form.querySelector('.password-strength');
    if (strengthIndicator) {
        strengthIndicator.textContent = '';
        strengthIndicator.className = 'password-strength';
    }
}
