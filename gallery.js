// Gallery Filtering
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

// Lightbox Functionality
function openLightbox(button) {
    const galleryItem = button.closest('.gallery-item');
    const img = galleryItem.querySelector('img');
    const title = galleryItem.querySelector('h3').textContent;
    const description = galleryItem.querySelector('p').textContent;

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxTitle.textContent = title;
    lightboxDescription.textContent = description;

    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close lightbox
document.querySelector('.close-lightbox').addEventListener('click', () => {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close lightbox when clicking outside
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') {
        document.getElementById('lightbox').style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Lightbox navigation
let currentImageIndex = 0;
const galleryItems = document.querySelectorAll('.gallery-item');

function showImage(index) {
    const items = Array.from(galleryItems);
    const item = items[index];
    const img = item.querySelector('img');
    const title = item.querySelector('h3').textContent;
    const description = item.querySelector('p').textContent;

    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxTitle.textContent = title;
    lightboxDescription.textContent = description;
}

function openLightbox(button) {
    const galleryItem = button.closest('.gallery-item');
    const items = Array.from(galleryItems);
    currentImageIndex = items.indexOf(galleryItem);
    
    showImage(currentImageIndex);
    document.getElementById('lightbox').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Previous image
document.querySelector('.lightbox-nav.prev').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
    showImage(currentImageIndex);
});

// Next image
document.querySelector('.lightbox-nav.next').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
    showImage(currentImageIndex);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.style.display === 'block') {
        if (e.key === 'Escape') {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        } else if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
            showImage(currentImageIndex);
        } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
            showImage(currentImageIndex);
        }
    }
});

// Project Info Modal
function showProjectInfo(button) {
    const galleryItem = button.closest('.gallery-item');
    const title = galleryItem.querySelector('h3').textContent;
    const category = galleryItem.querySelector('p').textContent;
    const categoryType = galleryItem.getAttribute('data-category');

    // Project data (in a real application, this would come from a database)
    const projectData = {
        'Modern Office Complex': {
            category: 'Commercial Construction',
            duration: '8 months',
            size: '25,000 sq ft',
            services: 'Full construction, Interior finishing',
            description: 'A state-of-the-art office complex featuring modern design, sustainable materials, and smart building technology. This project included complete construction from foundation to final interior finishes.'
        },
        'Luxury Family Home': {
            category: 'Residential Construction',
            duration: '12 months',
            size: '4,500 sq ft',
            services: 'Custom home, Smart home integration',
            description: 'A luxurious custom home built with premium materials and featuring the latest smart home technology. Includes custom cabinetry, high-end finishes, and energy-efficient systems.'
        },
        'Kitchen Transformation': {
            category: 'Renovation & Remodeling',
            duration: '6 weeks',
            size: '300 sq ft',
            services: 'Kitchen renovation, Custom cabinets',
            description: 'Complete kitchen renovation including custom cabinetry, new appliances, and modern design elements. Transformed an outdated kitchen into a functional and beautiful space.'
        },
        'Retail Center': {
            category: 'Commercial Construction',
            duration: '10 months',
            size: '15,000 sq ft',
            services: 'Commercial building, Interior design',
            description: 'Modern retail center with flexible spaces, excellent customer flow, and contemporary design. Features energy-efficient systems and sustainable building practices.'
        },
        'Custom Dream Home': {
            category: 'Residential Construction',
            duration: '14 months',
            size: '6,200 sq ft',
            services: 'Custom home, Luxury finishes',
            description: 'A dream home built to the highest standards with luxury finishes throughout. Features include a gourmet kitchen, home theater, and outdoor living spaces.'
        },
        'Modern Interior': {
            category: 'Interior Finishing',
            duration: '4 weeks',
            size: '2,000 sq ft',
            services: 'Interior design, Custom finishes',
            description: 'Complete interior transformation with modern design elements, custom lighting, and premium materials. Created a sophisticated and comfortable living environment.'
        },
        'Bathroom Remodel': {
            category: 'Renovation & Remodeling',
            duration: '3 weeks',
            size: '150 sq ft',
            services: 'Bathroom renovation, Plumbing',
            description: 'Luxury bathroom remodel with modern fixtures, custom tile work, and spa-like features. Includes new plumbing and electrical work.'
        },
        'Industrial Facility': {
            category: 'Commercial Construction',
            duration: '18 months',
            size: '50,000 sq ft',
            services: 'Industrial construction, Specialized systems',
            description: 'Large-scale industrial facility built for manufacturing operations. Features include specialized electrical systems, heavy-duty flooring, and advanced ventilation.'
        },
        'Eco-Friendly Home': {
            category: 'Residential Construction',
            duration: '16 months',
            size: '3,800 sq ft',
            services: 'Sustainable building, Green technology',
            description: 'Environmentally conscious home built with sustainable materials and green technology. Features solar panels, rainwater harvesting, and energy-efficient systems.'
        },
        'Luxury Interior Design': {
            category: 'Interior Finishing',
            duration: '8 weeks',
            size: '3,500 sq ft',
            services: 'Interior design, Custom furniture',
            description: 'Luxury interior design project featuring custom furniture, high-end materials, and sophisticated color schemes. Created an elegant and comfortable living space.'
        },
        'Complete Home Renovation': {
            category: 'Renovation & Remodeling',
            duration: '6 months',
            size: '2,800 sq ft',
            services: 'Full renovation, Structural work',
            description: 'Complete home renovation including structural improvements, new electrical and plumbing systems, and modern interior design throughout.'
        },
        'Luxury Hotel': {
            category: 'Commercial Construction',
            duration: '24 months',
            size: '75,000 sq ft',
            services: 'Hotel construction, Luxury finishes',
            description: 'Luxury hotel project featuring high-end finishes, custom amenities, and sophisticated design. Includes multiple dining areas, spa facilities, and guest rooms.'
        },
        'Smart Home Technology': {
            category: 'Residential Construction',
            duration: '18 months',
            size: '5,500 sq ft',
            services: 'Custom home, Smart technology',
            description: 'Cutting-edge smart home with integrated technology systems, automated controls, and advanced security features. Built with the latest smart home innovations.'
        },
        'Custom Cabinetry': {
            category: 'Interior Finishing',
            duration: '5 weeks',
            size: '1,200 sq ft',
            services: 'Custom cabinetry, Millwork',
            description: 'Custom cabinetry project featuring handcrafted woodwork, premium materials, and innovative storage solutions. Created functional and beautiful spaces.'
        }
    };

    const project = projectData[title] || {
        category: category,
        duration: 'Varies',
        size: 'Custom',
        services: 'Comprehensive construction services',
        description: 'This project showcases our expertise in construction and design. Contact us for more details about this specific project.'
    };

    // Populate modal
    document.getElementById('project-title').textContent = title;
    document.getElementById('project-category').textContent = project.category;
    document.getElementById('project-duration').textContent = project.duration;
    document.getElementById('project-size').textContent = project.size;
    document.getElementById('project-services').textContent = project.services;
    document.getElementById('project-description').textContent = project.description;

    // Show modal
    document.getElementById('project-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close project modal
document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('project-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
document.getElementById('project-modal').addEventListener('click', (e) => {
    if (e.target.id === 'project-modal') {
        document.getElementById('project-modal').style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style); 