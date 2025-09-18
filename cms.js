// CMS JavaScript for Portfolio Management

// Default data structure
const defaultData = {
    siteName: "Your Name",
    siteTitle: "Your Name — Portfolio",
    copyrightYear: 2024,
    navigation: [
        { text: "Home", href: "#home", isActive: true },
        {
            text: "Work",
            href: "#work",
            isActive: false,
            submenu: [
                { text: "Project 1", href: "#project1" },
                { text: "Project 2", href: "#project2" },
                { text: "Project 3", href: "#project3" }
            ]
        },
        { text: "About", href: "#about", isActive: false },
        { text: "Contact", href: "#contact", isActive: false }
    ],
    images: [
        {
            id: 1,
            url: "https://via.placeholder.com/1200x800/f0f0f0/999?text=Your+Image+1",
            alt: "Portfolio Image 1",
            span: 6,
            push: 3,
            type: "landscape"
        },
        {
            id: 2,
            url: "https://via.placeholder.com/800x1000/f0f0f0/999?text=Your+Image+2",
            alt: "Portfolio Image 2",
            span: 4,
            push: 4,
            type: "portrait"
        },
        {
            id: 3,
            url: "https://via.placeholder.com/1200x800/f0f0f0/999?text=Your+Image+3",
            alt: "Portfolio Image 3",
            span: 6,
            push: 3,
            type: "landscape"
        },
        {
            id: 4,
            url: "https://via.placeholder.com/1200x800/f0f0f0/999?text=Your+Image+4",
            alt: "Portfolio Image 4",
            span: 6,
            push: 3,
            type: "landscape"
        },
        {
            id: 5,
            url: "https://via.placeholder.com/800x800/f0f0f0/999?text=Your+Image+5",
            alt: "Portfolio Image 5",
            span: 4,
            push: 4,
            type: "square"
        }
    ],
    styling: {
        backgroundColor: "#fffdfa",
        textColor: "#000000",
        fontFamily: "'Helvetica Neue', Arial, sans-serif"
    }
};

// Global variables
let currentData = {};
let imageIdCounter = 6;

// Initialize CMS
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    populateForm();
    generatePreview();

    // Auto-save on form changes
    document.addEventListener('input', debounce(saveAndPreview, 500));
    document.addEventListener('change', debounce(saveAndPreview, 500));
});

// Load data from localStorage or use defaults
function loadData() {
    const savedData = localStorage.getItem('portfolioCMSData');
    if (savedData) {
        currentData = JSON.parse(savedData);
    } else {
        currentData = JSON.parse(JSON.stringify(defaultData));
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('portfolioCMSData', JSON.stringify(currentData));
    showSuccessMessage();
}

// Show success message
function showSuccessMessage() {
    const message = document.getElementById('successMessage');
    message.style.display = 'block';
    setTimeout(() => {
        message.style.display = 'none';
    }, 2000);
}

// Populate form with current data
function populateForm() {
    // Site information
    document.getElementById('siteName').value = currentData.siteName;
    document.getElementById('siteTitle').value = currentData.siteTitle;
    document.getElementById('copyrightYear').value = currentData.copyrightYear;

    // Styling
    document.getElementById('backgroundColor').value = currentData.styling.backgroundColor;
    document.getElementById('textColor').value = currentData.styling.textColor;
    document.getElementById('fontFamily').value = currentData.styling.fontFamily;

    // Navigation
    populateNavigationItems();

    // Images
    populateImageItems();
}

// Populate navigation items
function populateNavigationItems() {
    const container = document.getElementById('navigationItems');
    container.innerHTML = '';

    currentData.navigation.forEach((item, index) => {
        const navItem = createNavigationItem(item, index);
        container.appendChild(navItem);
    });
}

// Create navigation item HTML
function createNavigationItem(item, index) {
    const div = document.createElement('div');
    div.className = 'nav-item';

    let submenuHtml = '';
    if (item.submenu && item.submenu.length > 0) {
        submenuHtml = `
            <div style="margin-top: 10px;">
                <label style="font-size: 12px; color: #666;">Submenu Items (one per line):</label>
                <textarea onchange="updateNavSubmenu(${index}, this.value)" placeholder="Project 1|#project1&#10;Project 2|#project2">${item.submenu.map(sub => `${sub.text}|${sub.href}`).join('\n')}</textarea>
            </div>
        `;
    }

    div.innerHTML = `
        <div class="nav-item-header">
            <span style="font-weight: 500;">Menu Item ${index + 1}</span>
            <button type="button" class="btn btn-danger btn-small" onclick="removeNavItem(${index})">Remove</button>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div class="form-group">
                <label>Text</label>
                <input type="text" value="${item.text}" onchange="updateNavItem(${index}, 'text', this.value)">
            </div>
            <div class="form-group">
                <label>Link</label>
                <input type="text" value="${item.href}" onchange="updateNavItem(${index}, 'href', this.value)">
            </div>
        </div>
        <div class="form-group">
            <label>
                <input type="checkbox" ${item.isActive ? 'checked' : ''} onchange="updateNavItem(${index}, 'isActive', this.checked)">
                Active/Current Page
            </label>
        </div>
        <button type="button" class="btn btn-secondary btn-small" onclick="toggleSubmenu(${index})" style="margin-top: 10px;">
            ${item.submenu ? 'Remove' : 'Add'} Submenu
        </button>
        ${submenuHtml}
    `;

    return div;
}

// Populate image items
function populateImageItems() {
    const container = document.getElementById('portfolioImages');
    container.innerHTML = '';

    currentData.images.forEach((image, index) => {
        const imageItem = createImageItem(image, index);
        container.appendChild(imageItem);
    });
}

// Create image item HTML
function createImageItem(image, index) {
    const div = document.createElement('div');
    div.className = 'image-item';

    div.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <h4>Image ${index + 1}</h4>
            <button type="button" class="btn btn-danger btn-small" onclick="removeImage(${index})">Remove</button>
        </div>

        <div class="form-group">
            <label>Image URL</label>
            <input type="url" value="${image.url}" onchange="updateImage(${index}, 'url', this.value)">
            <div class="help-text">Use a direct link to your image (e.g., from Imgur, Google Drive, etc.)</div>
        </div>

        <div class="form-group">
            <label>Alt Text (for accessibility)</label>
            <input type="text" value="${image.alt}" onchange="updateImage(${index}, 'alt', this.value)">
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;">
            <div class="form-group">
                <label>Width (1-12)</label>
                <input type="number" min="1" max="12" value="${image.span}" onchange="updateImage(${index}, 'span', parseInt(this.value))">
                <div class="grid-helper">12 = full width, 6 = half width</div>
            </div>
            <div class="form-group">
                <label>Position (0-11)</label>
                <input type="number" min="0" max="11" value="${image.push}" onchange="updateImage(${index}, 'push', parseInt(this.value))">
                <div class="grid-helper">0 = left edge, 3 = centered</div>
            </div>
            <div class="form-group">
                <label>Image Type</label>
                <select onchange="updateImage(${index}, 'type', this.value)">
                    <option value="landscape" ${image.type === 'landscape' ? 'selected' : ''}>Landscape</option>
                    <option value="portrait" ${image.type === 'portrait' ? 'selected' : ''}>Portrait</option>
                    <option value="square" ${image.type === 'square' ? 'selected' : ''}>Square</option>
                </select>
            </div>
        </div>
    `;

    return div;
}

// Update functions
function updateNavItem(index, field, value) {
    if (currentData.navigation[index]) {
        currentData.navigation[index][field] = value;
        saveAndPreview();
    }
}

function updateNavSubmenu(index, value) {
    if (currentData.navigation[index]) {
        if (value.trim()) {
            const submenuItems = value.split('\n').map(line => {
                const [text, href] = line.split('|');
                return { text: text?.trim() || '', href: href?.trim() || '#' };
            }).filter(item => item.text);
            currentData.navigation[index].submenu = submenuItems;
        } else {
            delete currentData.navigation[index].submenu;
        }
        saveAndPreview();
    }
}

function toggleSubmenu(index) {
    if (currentData.navigation[index]) {
        if (currentData.navigation[index].submenu) {
            delete currentData.navigation[index].submenu;
        } else {
            currentData.navigation[index].submenu = [
                { text: "Submenu Item 1", href: "#item1" }
            ];
        }
        populateNavigationItems();
        saveAndPreview();
    }
}

function updateImage(index, field, value) {
    if (currentData.images[index]) {
        currentData.images[index][field] = value;
        saveAndPreview();
    }
}

function addNavItem() {
    currentData.navigation.push({
        text: "New Menu Item",
        href: "#new",
        isActive: false
    });
    populateNavigationItems();
    saveAndPreview();
}

function removeNavItem(index) {
    currentData.navigation.splice(index, 1);
    populateNavigationItems();
    saveAndPreview();
}

function addImage() {
    currentData.images.push({
        id: imageIdCounter++,
        url: "https://via.placeholder.com/800x600/f0f0f0/999?text=New+Image",
        alt: "New Portfolio Image",
        span: 6,
        push: 3,
        type: "landscape"
    });
    populateImageItems();
    saveAndPreview();
}

function removeImage(index) {
    currentData.images.splice(index, 1);
    populateImageItems();
    saveAndPreview();
}

// Collect form data
function collectFormData() {
    currentData.siteName = document.getElementById('siteName').value;
    currentData.siteTitle = document.getElementById('siteTitle').value;
    currentData.copyrightYear = parseInt(document.getElementById('copyrightYear').value);

    currentData.styling.backgroundColor = document.getElementById('backgroundColor').value;
    currentData.styling.textColor = document.getElementById('textColor').value;
    currentData.styling.fontFamily = document.getElementById('fontFamily').value;
}

// Generate HTML template
function generateHTML() {
    collectFormData();

    // Generate navigation HTML
    const navHTML = currentData.navigation.map(item => {
        const activeClass = item.isActive ? ' class="current"' : '';
        let submenuHTML = '';

        if (item.submenu && item.submenu.length > 0) {
            submenuHTML = `
                <ul class="sub-menu">
                    ${item.submenu.map(sub => `<li><a href="${sub.href}" class="_Submenu_no_spaces"><span>${sub.text}</span></a></li>`).join('')}
                </ul>
            `;
            return `<li class="dropdown"><a href="${item.href}"${activeClass}>${item.text}</a>${submenuHTML}</li>`;
        }

        return `<li><a href="${item.href}"${activeClass}>${item.text}</a></li>`;
    }).join('');

    // Generate mobile navigation HTML
    const mobileNavHTML = currentData.navigation.map(item =>
        `<li><a href="${item.href}">${item.text}</a></li>`
    ).join('');

    // Generate images HTML
    const imagesHTML = currentData.images.map(image => `
        <div class="row">
            <div class="col span-${image.span} push-${image.push}">
                <div class="image-container ${image.type}">
                    <img src="${image.url}" alt="${image.alt}" class="portfolio-image loaded">
                </div>
            </div>
        </div>
    `).join('');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover">
    <title>${currentData.siteTitle}</title>
    <style>
        ${generateCustomCSS()}
    </style>
</head>
<body>
    <header class="navbar">
        <a class="sitetitle" href="#home">
            <span>${currentData.siteName}</span>
        </a>
        <nav class="main-nav">
            <ul>
                ${navHTML}
            </ul>
        </nav>
        <div class="mobile-menu-toggle">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </header>

    <nav class="mobile-nav">
        <ul>
            ${mobileNavHTML}
        </ul>
    </nav>

    <main class="main-content">
        <div class="grid-container">
            ${imagesHTML}
        </div>
    </main>

    <footer class="footer">
        <div class="footer-content">
            <p>&copy; ${currentData.copyrightYear} ${currentData.siteName}. All rights reserved.</p>
        </div>
    </footer>

    <script>
        ${getPortfolioJS()}
    </script>
</body>
</html>`;
}

// Generate custom CSS with user's styling choices
function generateCustomCSS() {
    return `
        /* Reset and Base Styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        html {
            overflow-y: scroll;
            min-height: 100%;
            -webkit-text-size-adjust: none;
            overflow-x: hidden;
            scroll-behavior: smooth;
        }

        body {
            background-color: ${currentData.styling.backgroundColor};
            transition: background-color 300ms ease;
            min-height: 100%;
            width: 100%;
            font-family: ${currentData.styling.fontFamily};
            color: ${currentData.styling.textColor};
            line-height: 1.4;
        }

        /* Navigation Styles */
        .navbar {
            position: fixed;
            z-index: 100;
            width: 100%;
            top: 0;
            padding: 20px 5%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: ${currentData.styling.backgroundColor}cc;
            backdrop-filter: blur(10px);
        }

        .sitetitle {
            font-size: 16px;
            font-weight: normal;
            text-decoration: none;
            color: ${currentData.styling.textColor};
            z-index: 101;
        }

        .sitetitle:hover {
            text-decoration: underline;
        }

        .main-nav ul {
            list-style: none;
            display: flex;
            gap: 30px;
            margin: 0;
            padding: 0;
        }

        .main-nav a {
            text-decoration: none;
            color: ${currentData.styling.textColor};
            font-size: 16px;
            position: relative;
        }

        .main-nav a:hover,
        .main-nav a.current {
            text-decoration: underline;
        }

        /* Dropdown Menu */
        .dropdown {
            position: relative;
        }

        .dropdown:hover .sub-menu {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .sub-menu {
            position: absolute;
            top: 100%;
            left: 0;
            background-color: ${currentData.styling.backgroundColor}f0;
            backdrop-filter: blur(10px);
            min-width: 200px;
            padding: 10px 0;
            list-style: none;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            z-index: 1000;
        }

        .sub-menu li {
            padding: 5px 20px;
        }

        .sub-menu a {
            display: block;
            padding: 5px 0;
            white-space: nowrap;
        }

        /* Mobile Menu */
        .mobile-menu-toggle {
            display: none;
            flex-direction: column;
            cursor: pointer;
            z-index: 101;
        }

        .mobile-menu-toggle span {
            width: 25px;
            height: 2px;
            background-color: ${currentData.styling.textColor};
            margin: 3px 0;
            transition: 0.3s;
        }

        .mobile-nav {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background-color: ${currentData.styling.backgroundColor}f0;
            backdrop-filter: blur(20px);
            z-index: 99;
            padding-top: 80px;
        }

        .mobile-nav ul {
            list-style: none;
            padding: 0 5%;
        }

        .mobile-nav li {
            margin-bottom: 20px;
        }

        .mobile-nav a {
            text-decoration: none;
            color: ${currentData.styling.textColor};
            font-size: 24px;
            display: block;
            padding: 10px 0;
        }

        /* Main Content */
        .main-content {
            padding-top: 80px;
            padding-bottom: 5%;
        }

        /* Grid System */
        .grid-container {
            max-width: none;
            margin: 0;
            padding: 0 5%;
        }

        .row {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: 1%;
            margin-bottom: 5%;
            align-items: center;
        }

        .col {
            position: relative;
        }

        /* Column Spans */
        .span-1 { grid-column: span 1; }
        .span-2 { grid-column: span 2; }
        .span-3 { grid-column: span 3; }
        .span-4 { grid-column: span 4; }
        .span-5 { grid-column: span 5; }
        .span-6 { grid-column: span 6; }
        .span-7 { grid-column: span 7; }
        .span-8 { grid-column: span 8; }
        .span-9 { grid-column: span 9; }
        .span-10 { grid-column: span 10; }
        .span-11 { grid-column: span 11; }
        .span-12 { grid-column: span 12; }

        /* Column Push (Offset) */
        .push-1 { grid-column-start: 2; }
        .push-2 { grid-column-start: 3; }
        .push-3 { grid-column-start: 4; }
        .push-4 { grid-column-start: 5; }
        .push-5 { grid-column-start: 6; }
        .push-6 { grid-column-start: 7; }
        .push-7 { grid-column-start: 8; }
        .push-8 { grid-column-start: 9; }
        .push-9 { grid-column-start: 10; }
        .push-10 { grid-column-start: 11; }
        .push-11 { grid-column-start: 12; }

        /* Image Containers */
        .image-container {
            position: relative;
            overflow: hidden;
            width: 100%;
        }

        .portfolio-image {
            width: 100%;
            height: auto;
            display: block;
            transition: transform 0.3s ease;
        }

        .portfolio-image:hover {
            transform: scale(1.02);
        }

        /* Image Aspect Ratios */
        .landscape .portfolio-image {
            aspect-ratio: 3/2;
            object-fit: cover;
        }

        .portrait .portfolio-image {
            aspect-ratio: 4/5;
            object-fit: cover;
        }

        .square .portfolio-image {
            aspect-ratio: 1/1;
            object-fit: cover;
        }

        /* Footer */
        .footer {
            padding: 40px 5%;
            text-align: center;
            background-color: ${currentData.styling.backgroundColor};
            border-top: 1px solid #eee;
        }

        .footer-content p {
            font-size: 14px;
            color: ${currentData.styling.textColor}99;
        }

        /* Mobile Styles */
        @media (max-width: 600px) {
            .navbar {
                padding: 15px 5%;
            }

            .main-nav {
                display: none;
            }

            .mobile-menu-toggle {
                display: flex;
            }

            .main-content {
                padding-top: 60px;
            }

            .grid-container {
                padding: 0 3%;
            }

            .row {
                display: block;
                margin-bottom: 20px;
            }

            .col {
                width: 100%;
                margin-bottom: 20px;
            }
        }

        /* Focus States */
        a:focus,
        button:focus {
            outline: 2px solid ${currentData.styling.textColor};
            outline-offset: 2px;
        }
    `;
}

// Get portfolio JavaScript
function getPortfolioJS() {
    return `
        document.addEventListener('DOMContentLoaded', function() {
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            const mobileNav = document.querySelector('.mobile-nav');
            const body = document.body;
            let isMenuOpen = false;

            mobileMenuToggle.addEventListener('click', function() {
                isMenuOpen = !isMenuOpen;
                if (isMenuOpen) {
                    mobileNav.style.display = 'block';
                    body.style.overflow = 'hidden';
                } else {
                    mobileNav.style.display = 'none';
                    body.style.overflow = 'auto';
                }
            });

            const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
            mobileNavLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mobileNav.style.display = 'none';
                    body.style.overflow = 'auto';
                    isMenuOpen = false;
                });
            });

            window.addEventListener('resize', function() {
                if (window.innerWidth > 600 && isMenuOpen) {
                    mobileNav.style.display = 'none';
                    body.style.overflow = 'auto';
                    isMenuOpen = false;
                }
            });
        });
    `;
}

// Generate preview
function generatePreview() {
    const previewFrame = document.getElementById('previewFrame');
    const html = generateHTML();

    previewFrame.srcdoc = html;
}

// Save and preview
function saveAndPreview() {
    collectFormData();
    saveData();
    generatePreview();
}

// Download files
function downloadFiles() {
    collectFormData();

    const html = generateHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showSuccessMessage();
}

// Reset to defaults
function resetToDefaults() {
    if (confirm('Are you sure you want to reset all changes? This cannot be undone.')) {
        currentData = JSON.parse(JSON.stringify(defaultData));
        populateForm();
        saveAndPreview();
    }
}

// Utility function for debouncing
function debounce(func, wait) {
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
    `;