/**
 * Validation Utilities
 * Contains all validation logic for form inputs
 */

/**
 * Validates email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email is valid
 */
export function isValidEmail(email) {
    if (!email || typeof email !== 'string') {
        return false;
    }
    
    // RFC 5322 compliant email regex (simplified)
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    
    return emailRegex.test(email.trim());
}

/**
 * Validates password strength
 * @param {string} password - Password to validate
 * @returns {Object} - Validation result with isValid, errors, and strength
 */
export function validatePassword(password) {
    const result = {
        isValid: false,
        errors: [],
        strength: 'weak',
        score: 0
    };
    
    if (!password || typeof password !== 'string') {
        result.errors.push('Password tidak boleh kosong');
        return result;
    }
    
    // Check minimum length
    if (password.length < 8) {
        result.errors.push('Password harus minimal 8 karakter');
    } else {
        result.score += 25;
    }
    
    // Check for uppercase letters
    if (/[A-Z]/.test(password)) {
        result.score += 25;
    }
    
    // Check for lowercase letters
    if (/[a-z]/.test(password)) {
        result.score += 25;
    }
    
    // Check for numbers
    if (/[0-9]/.test(password)) {
        result.score += 15;
    }
    
    // Check for special characters
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        result.score += 10;
    }
    
    // Determine strength
    if (result.score >= 75) {
        result.strength = 'strong';
    } else if (result.score >= 50) {
        result.strength = 'medium';
    } else {
        result.strength = 'weak';
    }
    
    // Is valid if minimum length is met
    result.isValid = password.length >= 8;
    
    return result;
}

/**
 * Validates if passwords match
 * @param {string} password - Original password
 * @param {string} confirmPassword - Confirmation password
 * @returns {boolean} - True if passwords match
 */
export function passwordsMatch(password, confirmPassword) {
    if (!password || !confirmPassword) {
        return false;
    }
    
    return password === confirmPassword;
}

/**
 * Validates full name
 * @param {string} name - Name to validate
 * @returns {Object} - Validation result
 */
export function validateFullName(name) {
    const result = {
        isValid: false,
        error: ''
    };
    
    if (!name || typeof name !== 'string') {
        result.error = 'Nama lengkap tidak boleh kosong';
        return result;
    }
    
    const trimmedName = name.trim();
    
    if (trimmedName.length === 0) {
        result.error = 'Nama lengkap tidak boleh kosong';
        return result;
    }
    
    if (trimmedName.length < 3) {
        result.error = 'Nama lengkap minimal 3 karakter';
        return result;
    }
    
    if (trimmedName.length > 100) {
        result.error = 'Nama lengkap maksimal 100 karakter';
        return result;
    }
    
    // Check for valid characters (letters, spaces, hyphens, apostrophes)
    if (!/^[a-zA-Z\s'-]+$/.test(trimmedName)) {
        result.error = 'Nama lengkap hanya boleh berisi huruf, spasi, tanda hubung, dan apostrof';
        return result;
    }
    
    result.isValid = true;
    return result;
}

/**
 * Get password strength label dalam Bahasa Indonesia
 * 
 * @param {string} strength - Strength level (weak, medium, strong)
 * @returns {string} - Label dalam Bahasa Indonesia
 */
export function getPasswordStrengthLabel(strength) {
    const labels = {
        weak: 'Lemah',
        medium: 'Sedang',
        strong: 'Kuat'
    };
    
    return labels[strength] || '';
}

