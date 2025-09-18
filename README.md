# Portfolio Website

A clean, minimalist portfolio website with integrated CMS, inspired by Igor Pjörrt's design. Features a responsive grid layout perfect for showcasing photography, artwork, or design projects.

🌐 **[Live Demo](https://portfolioclaude.netlify.app)** (will be available after deployment)

## 🚀 Quick Start

1. **Portfolio Website**: Open `index.html` to view the main portfolio
2. **Content Management**: Open `cms.html` to edit content easily
3. **Deploy**: Push to any hosting service or use the CMS to download updated files

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Clean Grid Layout**: Flexible 12-column grid system for varied content layouts
- **Mobile-First Navigation**: Hamburger menu for mobile devices, dropdown menus for desktop
- **Image Optimization**: Lazy loading and responsive images
- **Smooth Animations**: Subtle hover effects and transitions
- **SEO Friendly**: Semantic HTML structure
- **Performance Optimized**: Lightweight CSS and JavaScript

## Files Included

- `my-portfolio.html` - Main HTML file
- `style.css` - Complete stylesheet
- `script.js` - JavaScript for interactivity
- `index.html` - Original site source (for reference)
- `README.md` - This file

## Customization Guide

### 1. Basic Information

**Update the site title and name:**
- In `my-portfolio.html`, change:
  - `<title>Your Name — Portfolio</title>`
  - `<span>Your Name</span>` in the header
  - Footer copyright text

### 2. Navigation Menu

**Update menu items:**
- Modify the navigation in both desktop and mobile menus
- Add or remove menu items as needed
- Update the dropdown submenu with your actual projects

### 3. Images

**Replace placeholder images:**
- Replace all `https://via.placeholder.com/...` URLs with your actual images
- Recommended image sizes:
  - Landscape: 1200x800px or similar 3:2 ratio
  - Portrait: 800x1000px or similar 4:5 ratio
  - Square: 800x800px or 1:1 ratio
- Update alt text for accessibility

### 4. Grid Layout

**Modify the layout:**
- Change `span-X` classes to adjust column widths (1-12)
- Change `push-X` classes to adjust positioning
- Add or remove rows as needed

**Example grid modifications:**
```html
<!-- Full width image -->
<div class="col span-12">

<!-- Centered half-width image -->
<div class="col span-6 push-3">

<!-- Two equal columns -->
<div class="col span-6">
<div class="col span-6">

<!-- Three equal columns -->
<div class="col span-4">
<div class="col span-4">
<div class="col span-4">
```

### 5. Colors and Styling

**Update colors in `style.css`:**
- Background color: `#fffdfa` (search and replace)
- Text color: `#000` (search and replace)
- Accent colors for hovers and borders

**Fonts:**
- Current font: 'Helvetica Neue', Arial, sans-serif
- To change: update the `font-family` property in the `body` selector

### 6. Adding Content Sections

**Add new sections:**
```html
<!-- About Section -->
<section id="about" class="content-section">
    <div class="row">
        <div class="col span-8 push-2">
            <h2>About</h2>
            <p>Your bio text here...</p>
        </div>
    </div>
</section>
```

### 7. Contact Information

**Add contact details:**
- Add a contact section with your email, social media links
- Consider adding a contact form

## Image Optimization Tips

1. **File Formats:**
   - Use WebP for better compression (with JPG fallback)
   - Use SVG for logos and icons

2. **Image Sizes:**
   - Export images at 2x resolution for high-DPI displays
   - Use appropriate compression (70-80% quality for JPEGs)

3. **Performance:**
   - Images load lazily by default
   - Consider using a CDN for faster loading

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Local Development

1. Download all files to a folder
2. Open `my-portfolio.html` in a web browser
3. For best results, serve from a local web server:
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js
   npx serve .
   ```

## Deployment

### GitHub Pages
1. Upload files to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Your site will be available at `https://username.github.io/repository-name`

### Netlify
1. Drag and drop the folder to Netlify
2. Your site will be automatically deployed

### Other Hosting
- Upload files to any web hosting service
- Make sure `my-portfolio.html` is renamed to `index.html` for the main page

## License

This template is free to use for personal and commercial projects. No attribution required, but appreciated!

## Credits

Design inspiration from Igor Pjörrt's portfolio website.
Template created for easy customization and deployment.

---

**Need help?** Check the comments in the CSS and JavaScript files for more detailed customization options.