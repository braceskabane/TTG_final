/**
 * Form Component
 * Handles registration form logic and validation
 */

import {
    isValidEmail,
    validatePassword,
    passwordsMatch,
    validateFullName,
    getPasswordStrengthLabel
} from '../utils/validation.js';

import {
    setError,
    clearError,
    setSuccess,
    getFormData,
    resetForm,
    addClass,
    removeClass,
    debounce
} from '../utils/helpers.js';

export class RegistrationForm {
    // Panggil id class form dari HTML
    constructor(formId) {
        // Siapkan data dan state internal
        this.form = document.getElementById(formId);
        this.inputs = {};
        this.isSubmitting = false; //validasi button kirim
        
        this.init();
    }
    
    /**
     * Initialize form DOM elements and event listeners
     */
    init() {
        if (!this.form) {
            console.error('Form not found');
            return;
        }
        
        // Get all form inputs (DOM operation) Agar javacript bisa akses dan manipulasi konten form
        this.inputs = {
            fullName: this.form.querySelector('#fullName'),
            email: this.form.querySelector('#email'),
            password: this.form.querySelector('#password'),
            confirmPassword: this.form.querySelector('#confirmPassword')
        };
        
        // Setup event listeners
        this.setupEventListeners();
    }
    
    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Form submit
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        this.inputs.fullName?.addEventListener('blur', () => this.validateFullName()); 
        this.inputs.email?.addEventListener('blur', () => this.validateEmail());
        this.inputs.password?.addEventListener('input', debounce(() => this.validatePasswordField(), 300));
        this.inputs.password?.addEventListener('blur', () => this.validatePasswordField());
        this.inputs.confirmPassword?.addEventListener('blur', () => this.validateConfirmPassword()); // ketika input kehilangan fokus atau klik di luar input 
        this.inputs.confirmPassword?.addEventListener('input', debounce(() => this.validateConfirmPassword(), 300)); // Terjadi setiap kali user mengetik
        
        // Clear errors on input setiap user mengetik
        Object.values(this.inputs).forEach(input => {
            input?.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    clearError(input);
                }
            });
        });
        
        // Password toggle visibility
        this.setupPasswordToggles();
    }
    
    /**
     * Setup password visibility toggles
     */
    setupPasswordToggles() {
        const toggleButtons = this.form.querySelectorAll('.toggle-password');
        
        toggleButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault(); //pastikan button tidak submit form
                
                const passwordWrapper = button.closest('.password-wrapper'); // cari yang masih didalam container tersebut
                const input = passwordWrapper?.querySelector('.form-input'); // didalam wrapper hanya ada 1 input
                
                if (input) {
                    const type = input.type === 'password' ? 'text' : 'password';
                    input.type = type;
                    
                    // Update icon with SVG
                    const icon = button.querySelector('.eye-icon');
                    if (icon) {
                        // Eye icon for showing password (when type is 'password')
                        // Eye-off icon for hiding password (when type is 'text')
                        icon.innerHTML = type === 'password' 
                            ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`
                            : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
                    }
                }
            });
        });
    }
    
    /**
     * Validate full name
     */
    validateFullName() {
        const input = this.inputs.fullName; // DOM element input fullName
        const value = input.value.trim(); // " daffa " -> "daffa"
        
        const result = validateFullName(value);
        
        if (!result.isValid) {
            setError(input, result.error); // tampilkan error di UI 
            return false;
        }
        
        setSuccess(input);
        return true;
    }
    
    /**
     * Validate email
     */
    validateEmail() {
        const input = this.inputs.email;
        const value = input.value.trim();
        
        if (!value) {
            setError(input, 'Email tidak boleh kosong');
            return false;
        }
        
        if (!isValidEmail(value)) {
            setError(input, 'Format email tidak valid');
            return false;
        }
        
        setSuccess(input);
        return true;
    }
    
    /**
     * Validate password
     */
    validatePasswordField() {
        const input = this.inputs.password;
        const value = input.value;
        const strengthIndicator = this.form.querySelector('#passwordStrength');
        
        if (!value) {
            setError(input, 'Password tidak boleh kosong');
            if (strengthIndicator) {
                strengthIndicator.textContent = '';
                strengthIndicator.className = 'password-strength';
            }
            return false;
        }
        
        const result = validatePassword(value);
        
        // Update strength indicator with active class to make it visible
        if (strengthIndicator) {
            const label = getPasswordStrengthLabel(result.strength);
            strengthIndicator.textContent = `Kekuatan Password: ${label}`;
            strengthIndicator.className = `password-strength active ${result.strength}`;
        }
        
        if (!result.isValid) {
            setError(input, result.errors[0] || 'Password tidak valid');
            return false;
        }
        
        setSuccess(input);
        
        // Re-validate confirm password if it has value
        if (this.inputs.confirmPassword.value) {
            this.validateConfirmPassword();
        }
        
        return true;
    }
    
    /**
     * Validate confirm password
     */
    validateConfirmPassword() {
        const input = this.inputs.confirmPassword;
        const value = input.value;
        const passwordValue = this.inputs.password.value;
        
        if (!value) {
            setError(input, 'Konfirmasi password tidak boleh kosong');
            return false;
        }
        
        if (!passwordsMatch(passwordValue, value)) {
            setError(input, 'Password tidak cocok');
            return false;
        }
        
        setSuccess(input);
        return true;
    }
    
    /**
     * Validate all fields
     */
    validateAll() {
        const isFullNameValid = this.validateFullName();
        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePasswordField();
        const isConfirmPasswordValid = this.validateConfirmPassword();
        
        return isFullNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;
    }
    
    /**
     * Handle form submission
     */
    async handleSubmit(e) {
        e.preventDefault();
        
        // Prevent double submission
        if (this.isSubmitting) {
            return;
        }
        
        // Validate all fields
        const isValid = this.validateAll();
        
        if (!isValid) {
            // Focus on first error
            const firstError = this.form.querySelector('.error');
            if (firstError) {
                firstError.focus();
            }
            return;
        }
        
        // Get form data
        const formData = getFormData(this.form);
        
        // Simulate form submission
        this.isSubmitting = true;
        const submitButton = this.form.querySelector('button[type="submit"]');
        
        if (submitButton) {
            submitButton.disabled = true;
            addClass(submitButton, 'loading');
        }
        
        try {
            // Simulate API call
            await this.submitForm(formData);
            
            // Show success message DI BAWAH form
            this.showSuccessMessage();
            
            // Reset semua input value (kosongkan form)
            this.clearFormInputs();
            
        } catch (error) {
            console.error('Submission error:', error);
            alert('Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            this.isSubmitting = false;
            
            if (submitButton) {
                submitButton.disabled = false;
                removeClass(submitButton, 'loading');
            }
        }
    }
    
    /**
     * Submit form (simulate API call)
     */
    async submitForm(data) {
        // Simulate API call delay
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form submitted:', data);
                resolve({ success: true });
            }, 1000);
        });
    }
    
    /**
     * Show success message
     */
    showSuccessMessage() {
        const successMessage = document.getElementById('successMessage');
        
        if (successMessage) {
            // Success message muncul DI BAWAH form (bukan replace form)
            // Form tetap terlihat, user bisa lihat data yang sudah diisi
            
            // Show success message
            successMessage.style.display = 'block';
            addClass(successMessage, 'active');
            
            // Scroll to success message agar user melihat pesan sukses
            setTimeout(() => {
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }
    
    /**
     * Clear all form inputs (kosongkan semua input value)
     */
    clearFormInputs() {
        // Reset form (kosongkan semua input)
        this.form.reset();
        
        // Clear semua error dan success states
        Object.values(this.inputs).forEach(input => {
            if (input) {
                clearError(input);
                removeClass(input, 'success');
                removeClass(input, 'error');
            }
        });
        
        // Reset password strength indicator
        const strengthIndicator = this.form.querySelector('#passwordStrength');
        if (strengthIndicator) {
            strengthIndicator.textContent = '';
            strengthIndicator.className = 'password-strength';
        }
    }
    
    /**
     * Reset form and hide success message
     * (Optional: bisa dipanggil manual jika diperlukan)
     */
    resetAndShowForm() {
        const successMessage = document.getElementById('successMessage');
        
        if (successMessage) {
            successMessage.style.display = 'none';
            removeClass(successMessage, 'active');
        }
        
        // Reset semua input field
        resetForm(this.form);
        
        // Reset password strength indicator
        const strengthIndicator = this.form.querySelector('#passwordStrength');
        if (strengthIndicator) {
            strengthIndicator.textContent = '';
            strengthIndicator.className = 'password-strength';
        }
    }
}
