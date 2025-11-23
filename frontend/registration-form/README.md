# 📝 Registration Form - Front-End Test

Form pendaftaran pengguna yang modern, responsif, dan accessible dengan validasi lengkap.

![Form Preview](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

## ✨ Features

### 🔐 Validasi Form
- ✅ **Email validation** - Format email harus valid (RFC 5322 compliant)
- ✅ **Password strength** - Minimal 8 karakter dengan indikator kekuatan
- ✅ **Password match** - Konfirmasi password harus sama
- ✅ **Name validation** - Nama lengkap dengan validasi karakter
- ✅ **Real-time validation** - Validasi langsung saat mengetik (debounced)
- ✅ **Error messages** - Pesan error yang jelas dan membantu

### 🎨 User Experience
- 👁️ **Password toggle** - Show/hide password dengan SVG icon modern
- 📊 **Password strength indicator** - Visual feedback (Lemah/Sedang/Kuat)
- ⚡ **Instant feedback** - Validasi real-time dengan debouncing
- 🎯 **Auto focus** - Fokus otomatis ke field error pertama
- ✨ **Smooth animations** - Shake, fade, dan scale animations
- ✅ **Success message** - "Pendaftaran Berhasil" muncul **DI BAWAH form** setelah validasi

### 📱 Responsive & Accessible
- 📱 **Mobile-first design** - Optimized untuk semua ukuran layar
- 🔍 **Zoom friendly** - Tetap rapi saat di-zoom 200%-400%
- 🛡️ **Resize + Zoom protection** - Layout static pada extreme cases
- ♿ **WCAG compliant** - Memenuhi standar aksesibilitas
- ⌨️ **Keyboard navigation** - Full keyboard support
- 🎯 **Focus indicators** - Jelas untuk keyboard users
- 🌐 **Semantic HTML** - Struktur HTML yang benar
- 🚫 **No horizontal scroll** - Bahkan saat window kecil + zoom tinggi

## 🏗️ Struktur Proyek

```
registration-form/
├── public/
│   └── index.html              # Main HTML file
│
├── src/
│   ├── styles/
│   │   ├── variables.css       # CSS custom properties (design tokens)
│   │   ├── base.css           # Base styles & reset
│   │   ├── zoom-protection.css # Advanced zoom & resize handling
│   │   └── components/
│   │       ├── input.css       # Input & form field styles
│   │       ├── button.css      # Button component styles
│   │       └── form.css        # Form layout & success message
│   │
│   └── scripts/
│       ├── main.js            # Application entry point
│       ├── components/
│       │   └── form.js        # Form logic & event handlers
│       └── utils/
│           ├── validation.js  # Validation functions
│           └── helpers.js     # Helper utilities
│
└── README.md                   # Project documentation
```

## 🚀 Cara Menggunakan

### Option 1: Buka Langsung di Browser
```bash
# Navigate ke folder project
cd registration-form

# Buka index.html di browser
# Atau double-click file: public/index.html
```

### Option 2: Menggunakan Live Server (Recommended)
```bash
# Install Live Server extension di VS Code
# Klik kanan pada public/index.html
# Pilih "Open with Live Server"
```

### Option 3: Simple HTTP Server
```bash
# Python 3
python -m http.server 8000

# Node.js (dengan http-server)
npx http-server

# Buka browser: http://localhost:8000/public/
```

## 🎯 Cara Test Form

### Test Case 1: Email Validation
1. Masukkan email invalid: `test`, `test@`, `@test.com`
2. Lihat error message: "Format email tidak valid"
3. Masukkan email valid: `user@example.com`
4. Error message hilang, border hijau muncul

### Test Case 2: Password Strength
1. Ketik password: `abc123` (6 karakter)
2. Lihat error: "Password harus minimal 8 karakter"
3. Ketik password: `password` (8 karakter, lemah)
4. Indikator menunjukkan: "Kekuatan Password: Lemah"
5. Ketik password: `Pass1234!` (kuat)
6. Indikator menunjukkan: "Kekuatan Password: Kuat"

### Test Case 3: Password Match
1. Password: `MyPassword123`
2. Konfirmasi: `MyPassword456`
3. Error: "Password tidak cocok"
4. Perbaiki konfirmasi: `MyPassword123`
5. Success! Border hijau muncul

### Test Case 4: Zoom Accessibility ⭐
1. Buka form di browser
2. Tekan `Ctrl` + `+` (Windows/Linux) atau `Cmd` + `+` (Mac)
3. Zoom hingga 200%, 300%, bahkan 400%
4. Form tetap rapi dan tidak ada horizontal scroll
5. Semua element masih clickable dan readable

### Test Case 5: Extreme Edge Case (Resize + Zoom) 🛡️
1. Resize browser window ke 300px (sangat kecil)
2. Zoom ke 200% atau 300%
3. Layout menjadi **static** (tidak berubah lagi)
4. **Tidak ada horizontal scroll** sama sekali
5. Form tetap usable dan readable
6. **Bonus:** Lihat `ZOOM-RESIZE-GUIDE.md` untuk detail teknis

### Test Case 6: Submit Form
1. Isi semua field dengan data valid
2. Klik "Daftar Sekarang"
3. Loading animation muncul (1 detik)
4. Form tetap terlihat
5. Success message muncul **DI BAWAH form**: "Pendaftaran Berhasil!"
6. User dapat melihat data yang telah diisi DAN pesan sukses

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern CSS dengan custom properties
- **JavaScript (ES6+)** - Modules, classes, async/await
- **No frameworks** - Pure vanilla JavaScript
- **No dependencies** - Zero npm packages

## 📐 Design Decisions

### CSS Architecture
- **CSS Custom Properties** untuk design tokens
- **Component-based** styling (BEM-like)
- **Mobile-first** responsive approach
- **Relative units** (rem/em) untuk accessibility

### JavaScript Architecture
- **ES6 Modules** untuk code organization
- **Class-based** components
- **Separation of concerns** (validation, helpers, components)
- **Reusable utilities**

### Accessibility Features
- ✅ ARIA labels pada buttons
- ✅ Semantic HTML (form, label, input)
- ✅ Keyboard navigation support
- ✅ Focus indicators
- ✅ Error announcements
- ✅ Zoom support (200%-400%)
- ✅ No horizontal scroll on zoom
- ✅ Relative font sizing

## 🎨 Color Palette

```css
Primary:    #4F46E5 (Indigo)
Success:    #10B981 (Green)
Error:      #EF4444 (Red)
Warning:    #F59E0B (Amber)
Background: Linear gradient (Purple → Violet)
```

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## 🔧 Customization

### Mengubah Warna
Edit file: `src/styles/variables.css`
```css
:root {
    --color-primary: #your-color;
    --color-success: #your-color;
    /* ... */
}
```

### Mengubah Validasi
Edit file: `src/scripts/utils/validation.js`
```javascript
// Contoh: ubah minimum password length
if (password.length < 10) { // dari 8 ke 10
    result.errors.push('Password harus minimal 10 karakter');
}
```

## 📝 Validation Rules

| Field | Rules |
|-------|-------|
| **Nama Lengkap** | Min 3 karakter, max 100, hanya huruf dan spasi |
| **Email** | Format email valid (RFC 5322) |
| **Password** | Min 8 karakter |
| **Konfirmasi** | Harus sama dengan password |

### Password Strength Calculation
- **Weak (Lemah)**: < 50 points
- **Medium (Sedang)**: 50-74 points  
- **Strong (Kuat)**: ≥ 75 points

Points diberikan untuk:
- ✅ Length ≥ 8 characters: +25 points
- ✅ Uppercase letters: +25 points
- ✅ Lowercase letters: +25 points
- ✅ Numbers: +15 points
- ✅ Special characters: +10 points

## 🎓 Learning Points

Project ini mendemonstrasikan:

1. ✅ **Clean Code** - Well-commented, organized
2. ✅ **Modular Architecture** - Reusable components
3. ✅ **Accessibility** - WCAG compliant, zoom-friendly
4. ✅ **Best Practices** - Semantic HTML, CSS variables
5. ✅ **Error Handling** - Comprehensive validation
6. ✅ **User Experience** - Real-time feedback, animations
7. ✅ **Responsive Design** - Mobile-first approach
8. ✅ **Modern JavaScript** - ES6+ features

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Author

Created as a front-end technical test submission.

---

**⭐ Tip**: Untuk demo terbaik, buka di browser dan coba zoom in/out untuk melihat responsive behavior!
