// Products page functionality

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const productsGrid = document.getElementById('products-grid');
    const noResults = document.getElementById('no-results');

    let currentFilter = 'all';
    let currentSearch = '';

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            currentSearch = this.value.toLowerCase().trim();
            filterProducts();
        });
    }

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update current filter
            currentFilter = this.getAttribute('data-category');
            
            // Filter products
            filterProducts();
        });
    });

    function filterProducts() {
        let visibleCount = 0;
        
        productCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            // Check if card matches filter
            const matchesFilter = currentFilter === 'all' || category === currentFilter;
            
            // Check if card matches search
            const matchesSearch = currentSearch === '' || 
                                title.includes(currentSearch) || 
                                description.includes(currentSearch);
            
            if (matchesFilter && matchesSearch) {
                showCard(card);
                visibleCount++;
            } else {
                hideCard(card);
            }
        });
        
        // Show/hide no results message
        if (visibleCount === 0) {
            noResults.style.display = 'block';
            productsGrid.style.display = 'none';
        } else {
            noResults.style.display = 'none';
            productsGrid.style.display = 'grid';
        }
        
        // Update URL with current filter (optional)
        updateURL();
    }

    function showCard(card) {
        card.classList.remove('hidden');
        card.classList.add('show');
        
        // Remove show class after animation
        setTimeout(() => {
            card.classList.remove('show');
        }, 500);
    }

    function hideCard(card) {
        card.classList.add('hidden');
        card.classList.remove('show');
    }

    function updateURL() {
        const url = new URL(window.location);
        
        if (currentFilter !== 'all') {
            url.searchParams.set('category', currentFilter);
        } else {
            url.searchParams.delete('category');
        }
        
        if (currentSearch !== '') {
            url.searchParams.set('search', currentSearch);
        } else {
            url.searchParams.delete('search');
        }
        
        // Update URL without reloading page
        window.history.replaceState({}, '', url);
    }

    // Load filter from URL on page load
    function loadFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        const searchParam = urlParams.get('search');
        
        if (categoryParam) {
            currentFilter = categoryParam;
            const filterButton = document.querySelector(`[data-category="${categoryParam}"]`);
            if (filterButton) {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                filterButton.classList.add('active');
            }
        }
        
        if (searchParam) {
            currentSearch = searchParam;
            if (searchInput) {
                searchInput.value = searchParam;
            }
        }
        
        filterProducts();
    }

    // Clear search function
    window.clearSearch = function() {
        currentSearch = '';
        currentFilter = 'all';
        
        if (searchInput) {
            searchInput.value = '';
        }
        
        filterButtons.forEach(btn => btn.classList.remove('active'));
        filterButtons[0].classList.add('active'); // Activate "all" button
        
        filterProducts();
    };

    // Request quote function
    window.requestQuote = function(productName) {
        const phone = '201012006376';
        const message = `السلام عليكم، أريد طلب عرض سعر لـ: ${productName}\n\nشكراً لكم`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
    };

    // Lazy loading for product images
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    // Observe all product images
    const productImages = document.querySelectorAll('.product-image img');
    productImages.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });

    // Add loading animation to grid during filtering
    function addLoadingState() {
        productsGrid.classList.add('loading');
        setTimeout(() => {
            productsGrid.classList.remove('loading');
        }, 300);
    }

    // Enhanced filter with animation
    const originalFilterProducts = filterProducts;
    filterProducts = function() {
        addLoadingState();
        setTimeout(originalFilterProducts, 100);
    };

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + F to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Escape to clear search
        if (e.key === 'Escape') {
            if (searchInput && searchInput === document.activeElement) {
                clearSearch();
                searchInput.blur();
            }
        }
    });

    // Product card click analytics (optional)
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't track if clicking on button
            if (e.target.closest('.btn')) return;
            
            const productName = this.querySelector('h3').textContent;
            console.log(`Product viewed: ${productName}`);
            
            // Here you could send analytics data to your tracking service
            // Example: gtag('event', 'product_view', { product_name: productName });
        });
    });

    // Auto-complete suggestions (basic implementation)
    const productNames = Array.from(productCards).map(card => 
        card.querySelector('h3').textContent
    );

    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            // Could implement dropdown with suggestions here
        });
    }

    // Sort functionality (if needed in future)
    window.sortProducts = function(sortBy) {
        const cards = Array.from(productCards);
        
        cards.sort((a, b) => {
            const aTitle = a.querySelector('h3').textContent;
            const bTitle = b.querySelector('h3').textContent;
            
            switch (sortBy) {
                case 'name-asc':
                    return aTitle.localeCompare(bTitle, 'ar');
                case 'name-desc':
                    return bTitle.localeCompare(aTitle, 'ar');
                default:
                    return 0;
            }
        });
        
        // Re-append sorted cards
        cards.forEach(card => productsGrid.appendChild(card));
    };

    // Initialize page
    loadFromURL();

    // Add smooth scroll to top when filtering
    const originalShowCard = showCard;
    showCard = function(card) {
        originalShowCard(card);
        
        // Scroll to top of products section if user is below it
        const productsSection = document.querySelector('.products-section');
        const rect = productsSection.getBoundingClientRect();
        
        if (rect.top < -100) {
            productsSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    };

    console.log('Products page loaded successfully!');
});

