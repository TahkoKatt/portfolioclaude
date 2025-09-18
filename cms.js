// Enhanced CMS JavaScript for Portfolio Management with Slideshow Support

// Default data structure for slideshow-based portfolio
const defaultData = {
    siteName: "Your Name",
    siteTitle: "Your Name — Portfolio",
    copyrightYear: 2024,

    // Home slideshow
    homeSlideshow: [
        {
            id: 1,
            url: "https://via.placeholder.com/1200x800/f0f0f0/999?text=Portfolio+Image+1",
            alt: "Portfolio Image 1",
            size: "large",
            orientation: "landscape"
        },
        {
            id: 2,
            url: "https://via.placeholder.com/800x1000/f0f0f0/999?text=Portfolio+Image+2",
            alt: "Portfolio Image 2",
            size: "medium",
            orientation: "portrait"
        },
        {
            id: 3,
            url: "https://via.placeholder.com/1200x800/f0f0f0/999?text=Portfolio+Image+3",
            alt: "Portfolio Image 3",
            size: "large",
            orientation: "landscape"
        },
        {
            id: 4,
            url: "https://via.placeholder.com/800x800/f0f0f0/999?text=Portfolio+Image+4",
            alt: "Portfolio Image 4",
            size: "small",
            orientation: "square"
        },
        {
            id: 5,
            url: "https://via.placeholder.com/1400x700/f0f0f0/999?text=Portfolio+Image+5",
            alt: "Portfolio Image 5",
            size: "xlarge",
            orientation: "landscape"
        }
    ],

    // Work projects
    projects: [
        {
            id: 1,
            title: "Project Title 1",
            description: "This is a description of the first project. You can edit this text in the CMS to describe your work, the process, and the outcome.",
            images: [
                {
                    id: 11,
                    url: "https://via.placeholder.com/1200x800/e8f4fd/3498db?text=Project+1+-+Image+1",
                    alt: "Project 1 Image 1",
                    size: "large",
                    orientation: "landscape"
                },
                {
                    id: 12,
                    url: "https://via.placeholder.com/800x1000/e8f4fd/3498db?text=Project+1+-+Image+2",
                    alt: "Project 1 Image 2",
                    size: "medium",
                    orientation: "portrait"
                },
                {
                    id: 13,
                    url: "https://via.placeholder.com/1200x800/e8f4fd/3498db?text=Project+1+-+Image+3",
                    alt: "Project 1 Image 3",
                    size: "large",
                    orientation: "landscape"
                }
            ]
        },
        {
            id: 2,
            title: "Project Title 2",
            description: "Description of the second project goes here. Explain the concept, execution, and results of this work.",
            images: [
                {
                    id: 21,
                    url: "https://via.placeholder.com/800x800/f0e8e8/e74c3c?text=Project+2+-+Image+1",
                    alt: "Project 2 Image 1",
                    size: "medium",
                    orientation: "square"
                },
                {
                    id: 22,
                    url: "https://via.placeholder.com/1200x800/f0e8e8/e74c3c?text=Project+2+-+Image+2",
                    alt: "Project 2 Image 2",
                    size: "large",
                    orientation: "landscape"
                }
            ]
        },
        {
            id: 3,
            title: "Project Title 3",
            description: "Details about the third project. Describe the creative process, challenges overcome, and the final result.",
            images: [
                {
                    id: 31,
                    url: "https://via.placeholder.com/800x1200/e8f8e8/27ae60?text=Project+3+-+Image+1",
                    alt: "Project 3 Image 1",
                    size: "large",
                    orientation: "portrait"
                },
                {
                    id: 32,
                    url: "https://via.placeholder.com/1400x700/e8f8e8/27ae60?text=Project+3+-+Image+2",
                    alt: "Project 3 Image 2",
                    size: "xlarge",
                    orientation: "landscape"
                },
                {
                    id: 33,
                    url: "https://via.placeholder.com/800x800/e8f8e8/27ae60?text=Project+3+-+Image+3",
                    alt: "Project 3 Image 3",
                    size: "medium",
                    orientation: "square"
                },
                {
                    id: 34,
                    url: "https://via.placeholder.com/1200x800/e8f8e8/27ae60?text=Project+3+-+Image+4",
                    alt: "Project 3 Image 4",
                    size: "large",
                    orientation: "landscape"
                }
            ]
        }
    ],

    // About section
    about: {
        text: [
            "Write your bio here. This section can be edited in the CMS to tell your story, describe your background, and share your artistic vision.",
            "You can add multiple paragraphs, discuss your influences, education, and what drives your creative work."
        ],
        image: {
            url: "https://via.placeholder.com/600x800/f0f0f0/999?text=Your+Photo",
            alt: "Artist Photo"
        }
    },

    // Contact section
    contact: {
        introText: "Get in touch for collaborations, commissions, or inquiries.",
        email: "your.email@example.com",
        phone: "+1 (555) 123-4567",
        location: "Your City, Country",
        socialLinks: [
            { name: "Instagram", url: "#" },
            { name: "LinkedIn", url: "#" },
            { name: "Behance", url: "#" }
        ]
    },

    // Styling options
    styling: {
        backgroundColor: "#fffdfa",
        textColor: "#000000",
        fontFamily: "'Helvetica Neue', Arial, sans-serif"
    }
};

// Global variables
let currentData = {};
let imageIdCounter = 100;
let projectIdCounter = 10;

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
        try {
            currentData = JSON.parse(savedData);
            // Ensure all required sections exist
            if (!currentData.homeSlideshow) currentData.homeSlideshow = defaultData.homeSlideshow;
            if (!currentData.projects) currentData.projects = defaultData.projects;
            if (!currentData.about) currentData.about = defaultData.about;
            if (!currentData.contact) currentData.contact = defaultData.contact;
        } catch (e) {
            console.error('Error loading saved data:', e);
            currentData = JSON.parse(JSON.stringify(defaultData));
        }
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

    // Home slideshow
    populateHomeSlideshowItems();

    // Projects
    populateProjectItems();

    // About section
    populateAboutSection();

    // Contact section
    populateContactSection();
}

// Populate home slideshow items
function populateHomeSlideshowItems() {
    const container = document.getElementById('homeSlideshowItems');
    container.innerHTML = '';

    currentData.homeSlideshow.forEach((image, index) => {
        const imageItem = createSlideshowImageItem(image, index, 'home');
        container.appendChild(imageItem);
    });
}

// Populate project items
function populateProjectItems() {
    const container = document.getElementById('projectItems');
    container.innerHTML = '';

    currentData.projects.forEach((project, projectIndex) => {
        const projectItem = createProjectItem(project, projectIndex);
        container.appendChild(projectItem);
    });
}

// Create slideshow image item HTML
function createSlideshowImageItem(image, index, context) {
    const div = document.createElement('div');
    div.className = 'image-item';

    div.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <h4>Image ${index + 1}</h4>
            <button type="button" class="btn btn-danger btn-small" onclick="removeSlideshowImage('${context}', ${index})">Remove</button>
        </div>

        <div class="form-group">
            <label>Image URL</label>
            <input type="url" value="${image.url}" onchange="updateSlideshowImage('${context}', ${index}, 'url', this.value)">
            <div class="help-text">Use a direct link to your image</div>
        </div>

        <div class="form-group">
            <label>Alt Text</label>
            <input type="text" value="${image.alt}" onchange="updateSlideshowImage('${context}', ${index}, 'alt', this.value)">
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div class="form-group">
                <label>Size</label>
                <select onchange="updateSlideshowImage('${context}', ${index}, 'size', this.value)">
                    <option value="small" ${image.size === 'small' ? 'selected' : ''}>Small (40%)</option>
                    <option value="medium" ${image.size === 'medium' ? 'selected' : ''}>Medium (60%)</option>
                    <option value="large" ${image.size === 'large' ? 'selected' : ''}>Large (80%)</option>
                    <option value="xlarge" ${image.size === 'xlarge' ? 'selected' : ''}>XLarge (95%)</option>
                </select>
            </div>
            <div class="form-group">
                <label>Orientation</label>
                <select onchange="updateSlideshowImage('${context}', ${index}, 'orientation', this.value)">
                    <option value="landscape" ${image.orientation === 'landscape' ? 'selected' : ''}>Landscape</option>
                    <option value="portrait" ${image.orientation === 'portrait' ? 'selected' : ''}>Portrait</option>
                    <option value="square" ${image.orientation === 'square' ? 'selected' : ''}>Square</option>
                </select>
            </div>
        </div>
    `;

    return div;
}

// Create project item HTML
function createProjectItem(project, projectIndex) {
    const div = document.createElement('div');
    div.className = 'project-item';
    div.style.cssText = 'background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e9ecef;';

    div.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <h3>Project ${projectIndex + 1}</h3>
            <button type="button" class="btn btn-danger btn-small" onclick="removeProject(${projectIndex})">Remove Project</button>
        </div>

        <div class="form-group">
            <label>Project Title</label>
            <input type="text" value="${project.title}" onchange="updateProject(${projectIndex}, 'title', this.value)">
        </div>

        <div class="form-group">
            <label>Project Description</label>
            <textarea onchange="updateProject(${projectIndex}, 'description', this.value)" rows="3">${project.description}</textarea>
        </div>

        <div style="margin-top: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <h4>Project Images</h4>
                <button type="button" class="btn btn-secondary btn-small" onclick="addProjectImage(${projectIndex})">Add Image</button>
            </div>
            <div id="project${projectIndex}Images">
                ${project.images.map((image, imageIndex) =>
                    createProjectImageItemHTML(image, projectIndex, imageIndex)
                ).join('')}
            </div>
        </div>
    `;

    return div;
}

// Create project image item HTML
function createProjectImageItemHTML(image, projectIndex, imageIndex) {
    return `
        <div class="image-item" style="margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <h5>Image ${imageIndex + 1}</h5>
                <button type="button" class="btn btn-danger btn-small" onclick="removeProjectImage(${projectIndex}, ${imageIndex})">Remove</button>
            </div>

            <div class="form-group">
                <label>Image URL</label>
                <input type="url" value="${image.url}" onchange="updateProjectImage(${projectIndex}, ${imageIndex}, 'url', this.value)">
            </div>

            <div class="form-group">
                <label>Alt Text</label>
                <input type="text" value="${image.alt}" onchange="updateProjectImage(${projectIndex}, ${imageIndex}, 'alt', this.value)">
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <div class="form-group">
                    <label>Size</label>
                    <select onchange="updateProjectImage(${projectIndex}, ${imageIndex}, 'size', this.value)">
                        <option value="small" ${image.size === 'small' ? 'selected' : ''}>Small</option>
                        <option value="medium" ${image.size === 'medium' ? 'selected' : ''}>Medium</option>
                        <option value="large" ${image.size === 'large' ? 'selected' : ''}>Large</option>
                        <option value="xlarge" ${image.size === 'xlarge' ? 'selected' : ''}>XLarge</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Orientation</label>
                    <select onchange="updateProjectImage(${projectIndex}, ${imageIndex}, 'orientation', this.value)">
                        <option value="landscape" ${image.orientation === 'landscape' ? 'selected' : ''}>Landscape</option>
                        <option value="portrait" ${image.orientation === 'portrait' ? 'selected' : ''}>Portrait</option>
                        <option value="square" ${image.orientation === 'square' ? 'selected' : ''}>Square</option>
                    </select>
                </div>
            </div>
        </div>
    `;
}

// Populate about section
function populateAboutSection() {
    document.getElementById('aboutText').value = currentData.about.text.join('\n\n');
    document.getElementById('aboutImage').value = currentData.about.image.url;
    document.getElementById('aboutImageAlt').value = currentData.about.image.alt;
}

// Populate contact section
function populateContactSection() {
    document.getElementById('contactIntro').value = currentData.contact.introText;
    document.getElementById('contactEmail').value = currentData.contact.email;
    document.getElementById('contactPhone').value = currentData.contact.phone;
    document.getElementById('contactLocation').value = currentData.contact.location;

    // Social links
    const socialContainer = document.getElementById('socialLinks');
    socialContainer.innerHTML = '';
    currentData.contact.socialLinks.forEach((link, index) => {
        const linkItem = createSocialLinkItem(link, index);
        socialContainer.appendChild(linkItem);
    });
}

// Create social link item
function createSocialLinkItem(link, index) {
    const div = document.createElement('div');
    div.className = 'social-link-item';
    div.style.cssText = 'background: #f0f0f0; padding: 10px; border-radius: 4px; margin-bottom: 10px;';

    div.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
            <span>Social Link ${index + 1}</span>
            <button type="button" class="btn btn-danger btn-small" onclick="removeSocialLink(${index})">Remove</button>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div class="form-group">
                <label>Name</label>
                <input type="text" value="${link.name}" onchange="updateSocialLink(${index}, 'name', this.value)">
            </div>
            <div class="form-group">
                <label>URL</label>
                <input type="url" value="${link.url}" onchange="updateSocialLink(${index}, 'url', this.value)">
            </div>
        </div>
    `;

    return div;
}

// Update functions
function updateSlideshowImage(context, index, field, value) {
    if (context === 'home') {
        if (currentData.homeSlideshow[index]) {
            currentData.homeSlideshow[index][field] = value;
            saveAndPreview();
        }
    }
}

function updateProject(projectIndex, field, value) {
    if (currentData.projects[projectIndex]) {
        currentData.projects[projectIndex][field] = value;
        saveAndPreview();
    }
}

function updateProjectImage(projectIndex, imageIndex, field, value) {
    if (currentData.projects[projectIndex] && currentData.projects[projectIndex].images[imageIndex]) {
        currentData.projects[projectIndex].images[imageIndex][field] = value;
        saveAndPreview();
    }
}

function updateAboutSection() {
    const aboutText = document.getElementById('aboutText').value;
    const aboutImage = document.getElementById('aboutImage').value;
    const aboutImageAlt = document.getElementById('aboutImageAlt').value;

    currentData.about.text = aboutText.split('\n\n').filter(p => p.trim());
    currentData.about.image.url = aboutImage;
    currentData.about.image.alt = aboutImageAlt;

    saveAndPreview();
}

function updateContactSection() {
    currentData.contact.introText = document.getElementById('contactIntro').value;
    currentData.contact.email = document.getElementById('contactEmail').value;
    currentData.contact.phone = document.getElementById('contactPhone').value;
    currentData.contact.location = document.getElementById('contactLocation').value;

    saveAndPreview();
}

function updateSocialLink(index, field, value) {
    if (currentData.contact.socialLinks[index]) {
        currentData.contact.socialLinks[index][field] = value;
        saveAndPreview();
    }
}

// Add/Remove functions
function addHomeSlideshowImage() {
    currentData.homeSlideshow.push({
        id: imageIdCounter++,
        url: "https://via.placeholder.com/800x600/f0f0f0/999?text=New+Image",
        alt: "New Portfolio Image",
        size: "large",
        orientation: "landscape"
    });
    populateHomeSlideshowItems();
    saveAndPreview();
}

function removeSlideshowImage(context, index) {
    if (context === 'home') {
        currentData.homeSlideshow.splice(index, 1);
        populateHomeSlideshowItems();
        saveAndPreview();
    }
}

function addProject() {
    currentData.projects.push({
        id: projectIdCounter++,
        title: "New Project",
        description: "Project description goes here.",
        images: [{
            id: imageIdCounter++,
            url: "https://via.placeholder.com/800x600/f0f0f0/999?text=Project+Image",
            alt: "Project Image",
            size: "large",
            orientation: "landscape"
        }]
    });
    populateProjectItems();
    saveAndPreview();
}

function removeProject(projectIndex) {
    currentData.projects.splice(projectIndex, 1);
    populateProjectItems();
    saveAndPreview();
}

function addProjectImage(projectIndex) {
    if (currentData.projects[projectIndex]) {
        currentData.projects[projectIndex].images.push({
            id: imageIdCounter++,
            url: "https://via.placeholder.com/800x600/f0f0f0/999?text=New+Image",
            alt: "New Project Image",
            size: "large",
            orientation: "landscape"
        });
        populateProjectItems();
        saveAndPreview();
    }
}

function removeProjectImage(projectIndex, imageIndex) {
    if (currentData.projects[projectIndex] && currentData.projects[projectIndex].images[imageIndex]) {
        currentData.projects[projectIndex].images.splice(imageIndex, 1);
        populateProjectItems();
        saveAndPreview();
    }
}

function addSocialLink() {
    currentData.contact.socialLinks.push({
        name: "New Platform",
        url: "#"
    });
    populateContactSection();
    saveAndPreview();
}

function removeSocialLink(index) {
    currentData.contact.socialLinks.splice(index, 1);
    populateContactSection();
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

    // Update about and contact sections
    updateAboutSection();
    updateContactSection();
}

// Generate HTML template
function generateHTML() {
    collectFormData();

    // Generate home slideshow HTML
    const homeSlideshowHTML = currentData.homeSlideshow.map(image => `
        <div class="slide" data-size="${image.size}" data-orientation="${image.orientation}">
            <img src="${image.url}" alt="${image.alt}">
        </div>
    `).join('');

    // Generate projects HTML
    const projectsHTML = currentData.projects.map((project, index) => {
        const projectImages = project.images.map(image => `
            <div class="slide" data-size="${image.size}" data-orientation="${image.orientation}">
                <img src="${image.url}" alt="${image.alt}">
            </div>
        `).join('');

        return `
            <div class="project" id="project-${index + 1}">
                <div class="project-slideshow-container">
                    <div class="slideshow" id="project${index + 1}Slideshow">
                        ${projectImages}
                    </div>

                    <button class="slide-btn prev-btn" onclick="changeSlide('project${index + 1}Slideshow', -1)">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </button>
                    <button class="slide-btn next-btn" onclick="changeSlide('project${index + 1}Slideshow', 1)">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </button>

                    <div class="slide-counter">
                        <span id="project${index + 1}SlideCounter">1 / ${project.images.length}</span>
                    </div>
                </div>

                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                </div>
            </div>
        `;
    }).join('');

    // Generate navigation submenu
    const submenuHTML = currentData.projects.map((project, index) =>
        `<li><a href="#project-${index + 1}">${project.title}</a></li>`
    ).join('');

    // Generate about text
    const aboutTextHTML = currentData.about.text.map(paragraph =>
        `<p>${paragraph}</p>`
    ).join('');

    // Generate social links
    const socialLinksHTML = currentData.contact.socialLinks.map(link =>
        `<a href="${link.url}" target="_blank">${link.name}</a>`
    ).join('');

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
                <li><a href="#home" class="current">Home</a></li>
                <li class="dropdown">
                    <a href="#work">Work</a>
                    <ul class="sub-menu">
                        ${submenuHTML}
                    </ul>
                </li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
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
            <li><a href="#home">Home</a></li>
            <li><a href="#work">Work</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>

    <section id="home" class="section active">
        <div class="slideshow-container">
            <div class="slideshow" id="homeSlideshow">
                ${homeSlideshowHTML}
            </div>

            <button class="slide-btn prev-btn" onclick="changeSlide('homeSlideshow', -1)">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2"/>
                </svg>
            </button>
            <button class="slide-btn next-btn" onclick="changeSlide('homeSlideshow', 1)">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2"/>
                </svg>
            </button>

            <div class="slide-counter">
                <span id="homeSlideshowCounter">1 / ${currentData.homeSlideshow.length}</span>
            </div>
        </div>
    </section>

    <section id="work" class="section">
        <div class="work-container">
            <h2 class="section-title">Selected Work</h2>
            ${projectsHTML}
        </div>
    </section>

    <section id="about" class="section">
        <div class="about-container">
            <div class="about-content">
                <h2 class="section-title">About</h2>
                <div class="about-text">
                    ${aboutTextHTML}
                </div>
            </div>
            <div class="about-image">
                <img src="${currentData.about.image.url}" alt="${currentData.about.image.alt}">
            </div>
        </div>
    </section>

    <section id="contact" class="section">
        <div class="contact-container">
            <h2 class="section-title">Contact</h2>
            <div class="contact-content">
                <div class="contact-info">
                    <p>${currentData.contact.introText}</p>
                    <div class="contact-details">
                        <p><strong>Email:</strong> ${currentData.contact.email}</p>
                        <p><strong>Phone:</strong> ${currentData.contact.phone}</p>
                        <p><strong>Location:</strong> ${currentData.contact.location}</p>
                    </div>
                    <div class="social-links">
                        ${socialLinksHTML}
                    </div>
                </div>
            </div>
        </div>
    </section>

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

// Generate custom CSS (using the new slideshow CSS)
function generateCustomCSS() {
    // Return the complete new CSS with user's styling options
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
            z-index: 1000;
            width: 100%;
            top: 0;
            padding: 20px 5%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: ${currentData.styling.backgroundColor}f0;
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .sitetitle {
            font-size: 16px;
            font-weight: normal;
            text-decoration: none;
            color: ${currentData.styling.textColor};
            z-index: 1001;
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
            transition: all 0.3s ease;
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
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 4px;
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
            z-index: 1001;
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
            background-color: ${currentData.styling.backgroundColor}f8;
            backdrop-filter: blur(20px);
            z-index: 999;
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

        /* Section Layout */
        .section {
            min-height: 100vh;
            padding-top: 80px;
            padding-left: 5%;
            padding-right: 5%;
            display: none;
        }

        .section.active {
            display: block;
        }

        .section-title {
            font-size: 24px;
            font-weight: normal;
            margin-bottom: 40px;
            text-align: center;
        }

        /* Slideshow Styles */
        .slideshow-container {
            position: relative;
            width: 100%;
            height: calc(100vh - 160px);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .slideshow {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .slide {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            opacity: 0;
            transition: opacity 0.5s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .slide.active {
            opacity: 1;
            z-index: 1;
        }

        .slide:first-child {
            opacity: 1;
        }

        .slide img {
            display: block;
            transition: transform 0.3s ease;
            object-fit: contain;
            max-width: 100%;
            max-height: 100%;
        }

        /* Image Size Variations */
        .slide[data-size="small"] img {
            max-width: 40%;
            max-height: 40%;
        }

        .slide[data-size="medium"] img {
            max-width: 60%;
            max-height: 60%;
        }

        .slide[data-size="large"] img {
            max-width: 80%;
            max-height: 80%;
        }

        .slide[data-size="xlarge"] img {
            max-width: 95%;
            max-height: 95%;
        }

        /* Orientation-specific adjustments */
        .slide[data-orientation="portrait"] img {
            max-height: 85%;
        }

        .slide[data-orientation="landscape"] img {
            max-width: 90%;
        }

        .slide[data-orientation="square"] img {
            max-width: 70%;
            max-height: 70%;
        }

        /* Slideshow Navigation */
        .slide-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: ${currentData.styling.backgroundColor}e6;
            border: 1px solid rgba(0, 0, 0, 0.2);
            border-radius: 50%;
            width: 50px;
            height: 50px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            z-index: 10;
            color: ${currentData.styling.textColor};
        }

        .slide-btn:hover {
            background: ${currentData.styling.backgroundColor};
            border-color: rgba(0, 0, 0, 0.4);
            transform: translateY(-50%) scale(1.05);
        }

        .prev-btn {
            left: 20px;
        }

        .next-btn {
            right: 20px;
        }

        .slide-counter {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${currentData.styling.backgroundColor}e6;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 14px;
            border: 1px solid rgba(0, 0, 0, 0.1);
            color: ${currentData.styling.textColor};
        }

        /* Work Section */
        .work-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 0;
        }

        .project {
            margin-bottom: 120px;
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 60px;
            align-items: center;
        }

        .project:nth-child(even) {
            grid-template-columns: 1fr 2fr;
        }

        .project:nth-child(even) .project-slideshow-container {
            order: 2;
        }

        .project:nth-child(even) .project-info {
            order: 1;
        }

        .project-slideshow-container {
            position: relative;
            height: 60vh;
            min-height: 400px;
        }

        .project .slideshow {
            height: 100%;
        }

        .project .slide-btn {
            width: 40px;
            height: 40px;
        }

        .project .prev-btn {
            left: 15px;
        }

        .project .next-btn {
            right: 15px;
        }

        .project-info {
            padding: 20px 0;
        }

        .project-title {
            font-size: 28px;
            font-weight: normal;
            margin-bottom: 20px;
            line-height: 1.2;
            color: ${currentData.styling.textColor};
        }

        .project-description {
            font-size: 16px;
            line-height: 1.6;
            color: ${currentData.styling.textColor}cc;
        }

        /* About Section */
        .about-container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 60px 0;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 80px;
            align-items: center;
        }

        .about-content {
            padding: 20px 0;
        }

        .about-text p {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
            color: ${currentData.styling.textColor}cc;
        }

        .about-image img {
            width: 100%;
            height: auto;
            object-fit: cover;
            aspect-ratio: 4/5;
        }

        /* Contact Section */
        .contact-container {
            max-width: 600px;
            margin: 0 auto;
            padding: 60px 0;
            text-align: center;
        }

        .contact-content {
            margin-top: 40px;
        }

        .contact-info p {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 30px;
            color: ${currentData.styling.textColor}cc;
        }

        .contact-details {
            margin: 40px 0;
        }

        .contact-details p {
            margin-bottom: 10px;
            font-size: 16px;
            color: ${currentData.styling.textColor};
        }

        .social-links {
            margin-top: 40px;
        }

        .social-links a {
            display: inline-block;
            margin: 0 15px;
            color: ${currentData.styling.textColor};
            text-decoration: none;
            font-size: 16px;
            transition: all 0.3s ease;
        }

        .social-links a:hover {
            text-decoration: underline;
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

            .section {
                padding-top: 60px;
                padding-left: 3%;
                padding-right: 3%;
            }

            .slideshow-container {
                height: calc(100vh - 120px);
            }

            .slide-btn {
                width: 40px;
                height: 40px;
            }

            .prev-btn {
                left: 10px;
            }

            .next-btn {
                right: 10px;
            }

            .project {
                grid-template-columns: 1fr;
                gap: 30px;
                margin-bottom: 80px;
            }

            .project:nth-child(even) {
                grid-template-columns: 1fr;
            }

            .project:nth-child(even) .project-slideshow-container {
                order: 1;
            }

            .project:nth-child(even) .project-info {
                order: 2;
            }

            .project-slideshow-container {
                height: 50vh;
                min-height: 300px;
            }

            .about-container {
                grid-template-columns: 1fr;
                gap: 40px;
                padding: 40px 0;
            }

            .about-image {
                order: 1;
            }

            .about-content {
                order: 2;
            }

            .section-title {
                font-size: 20px;
                margin-bottom: 30px;
            }

            .project-title {
                font-size: 22px;
            }

            /* Mobile image sizing adjustments */
            .slide[data-size="small"] img {
                max-width: 70%;
                max-height: 70%;
            }

            .slide[data-size="medium"] img {
                max-width: 85%;
                max-height: 85%;
            }

            .slide[data-size="large"] img {
                max-width: 95%;
                max-height: 95%;
            }

            .slide[data-size="xlarge"] img {
                max-width: 100%;
                max-height: 100%;
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

// Get portfolio JavaScript (the new slideshow JS)
function getPortfolioJS() {
    return `
        // Portfolio JavaScript with Slideshow Functionality
        const slideshowStates = {};

        document.addEventListener('DOMContentLoaded', function() {
            initializeSlideshows();
            initializeNavigation();
            initializeMobileMenu();
            initializeKeyboardNavigation();
            updateActiveNavigation();
        });

        function initializeSlideshows() {
            const slideshows = document.querySelectorAll('.slideshow');

            slideshows.forEach(slideshow => {
                const slideshowId = slideshow.id;
                const slides = slideshow.querySelectorAll('.slide');

                if (slides.length > 0) {
                    slideshowStates[slideshowId] = {
                        currentSlide: 0,
                        totalSlides: slides.length
                    };

                    updateSlideCounter(slideshowId);
                    showSlide(slideshowId, 0);
                }
            });
        }

        function changeSlide(slideshowId, direction) {
            const state = slideshowStates[slideshowId];
            if (!state) return;

            let newSlide = state.currentSlide + direction;

            if (newSlide >= state.totalSlides) {
                newSlide = 0;
            } else if (newSlide < 0) {
                newSlide = state.totalSlides - 1;
            }

            showSlide(slideshowId, newSlide);
        }

        function showSlide(slideshowId, slideIndex) {
            const slideshow = document.getElementById(slideshowId);
            if (!slideshow) return;

            const slides = slideshow.querySelectorAll('.slide');
            const state = slideshowStates[slideshowId];

            if (!state || slideIndex >= state.totalSlides || slideIndex < 0) return;

            slides.forEach(slide => slide.classList.remove('active'));
            slides[slideIndex].classList.add('active');

            state.currentSlide = slideIndex;
            updateSlideCounter(slideshowId);
        }

        function updateSlideCounter(slideshowId) {
            const counterElement = document.getElementById(slideshowId + 'Counter');
            const state = slideshowStates[slideshowId];

            if (counterElement && state) {
                counterElement.textContent = \`\${state.currentSlide + 1} / \${state.totalSlides}\`;
            }
        }

        function initializeNavigation() {
            window.addEventListener('hashchange', handleHashChange);

            const navLinks = document.querySelectorAll('nav a[href^="#"]');
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href && href.startsWith('#')) {
                        e.preventDefault();
                        showSection(href.substring(1));
                        window.history.pushState(null, null, href);
                        updateActiveNavigation();
                    }
                });
            });

            const initialSection = window.location.hash ? window.location.hash.substring(1) : 'home';
            showSection(initialSection);
        }

        function handleHashChange() {
            const section = window.location.hash ? window.location.hash.substring(1) : 'home';
            showSection(section);
            updateActiveNavigation();
        }

        function showSection(sectionId) {
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => section.classList.remove('active'));

            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
                setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
            } else {
                document.getElementById('home').classList.add('active');
            }
        }

        function updateActiveNavigation() {
            const currentHash = window.location.hash || '#home';
            const navLinks = document.querySelectorAll('.main-nav a, .mobile-nav a');
            navLinks.forEach(link => {
                link.classList.remove('current');
                if (link.getAttribute('href') === currentHash) {
                    link.classList.add('current');
                }
            });
        }

        function initializeMobileMenu() {
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            const mobileNav = document.querySelector('.mobile-nav');
            const body = document.body;
            let isMenuOpen = false;

            if (!mobileMenuToggle || !mobileNav) return;

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
        }

        function initializeKeyboardNavigation() {
            document.addEventListener('keydown', function(e) {
                const activeSection = document.querySelector('.section.active');
                if (!activeSection) return;

                const slideshow = activeSection.querySelector('.slideshow');
                if (!slideshow) return;

                const slideshowId = slideshow.id;

                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    changeSlide(slideshowId, -1);
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    changeSlide(slideshowId, 1);
                }
            });
        }
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
    showDeploymentInstructions();
}

// Show deployment instructions
function showDeploymentInstructions() {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.8); z-index: 10000; display: flex;
        align-items: center; justify-content: center;
    `;

    modal.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 8px; max-width: 500px; margin: 20px;">
            <h2 style="margin-bottom: 20px; color: #2c3e50;">Deploy Your Changes</h2>
            <p style="margin-bottom: 15px; line-height: 1.6;">Your updated <code>index.html</code> file has been downloaded. To deploy to your live site:</p>

            <ol style="margin: 20px 0; line-height: 1.8; padding-left: 20px;">
                <li>Go to <a href="https://github.com/TahkoKatt/portfolioclaude" target="_blank" style="color: #3498db;">your GitHub repo</a></li>
                <li>Click the <strong>index.html</strong> file</li>
                <li>Click the <strong>pencil icon</strong> (Edit)</li>
                <li>Delete all content and <strong>paste the new HTML</strong></li>
                <li>Scroll down and click <strong>"Commit changes"</strong></li>
                <li>Your site will auto-update in 1-2 minutes! ✨</li>
            </ol>

            <p style="margin: 15px 0; padding: 10px; background: #e8f5e8; border-left: 4px solid #27ae60; font-size: 14px;">
                💡 <strong>Tip:</strong> Keep this CMS tab open to make more changes anytime!
            </p>

            <button onclick="this.parentElement.parentElement.remove()"
                    style="background: #3498db; color: white; border: none; padding: 10px 20px;
                           border-radius: 4px; cursor: pointer; margin-top: 15px;">
                Got it!
            </button>
        </div>
    `;

    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
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