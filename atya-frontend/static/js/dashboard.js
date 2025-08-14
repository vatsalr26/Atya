document.addEventListener('DOMContentLoaded', () => {
    if (checkAuth()) {
        setupEventListeners();
        loadDashboard().then(() => {
            // After dashboard is loaded, check URL for filters
            loadFilterFromUrl();
            
            // Add loading state to buttons during navigation
            document.querySelectorAll('a[href^="#"]').forEach(link => {
                link.addEventListener('click', (e) => {
                    if (link.hash) {
                        const filter = link.hash.split('=')[1];
                        if (filter) {
                            filterApplications(filter);
                        }
                    }
                });
            });
        });
    }
});

function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

function setupEventListeners() {
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Navigation links
    document.querySelectorAll('nav a').forEach(link => {
        // Skip if it's a filter button
        if (link.closest('.filter-buttons')) return;
        
        link.addEventListener('click', (e) => {
            // Don't prevent default for external links
            if (!link.href || link.href.startsWith('http')) return;
            
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href && href !== '#') {
                window.location.href = href;
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });

    // Dashboard card interactions
    setupDashboardInteractions();
}

function setupDashboardInteractions() {
    // Edit Profile button
    const editProfileBtn = document.getElementById('editProfileBtn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', () => {
            // Redirect to profile page with edit mode enabled
            window.location.href = 'profile.html?edit=true';
        });
    }

    // Active Applications card
    const activeAppsCard = document.querySelector('.dashboard-card:nth-child(1)');
    if (activeAppsCard) {
        activeAppsCard.style.cursor = 'pointer';
        activeAppsCard.addEventListener('click', () => {
            filterApplications('active');
        });
    }

    // Under Review card
    const underReviewCard = document.querySelector('.dashboard-card:nth-child(2)');
    if (underReviewCard) {
        underReviewCard.style.cursor = 'pointer';
        underReviewCard.addEventListener('click', () => {
            filterApplications('review');
        });
    }

    // Accepted Offers card
    const acceptedOffersCard = document.querySelector('.dashboard-card:nth-child(3)');
    if (acceptedOffersCard) {
        acceptedOffersCard.style.cursor = 'pointer';
        acceptedOffersCard.addEventListener('click', () => {
            filterApplications('accepted');
        });
    }
}

function filterApplications(status) {
    const applications = document.querySelectorAll('.application-item');
    let count = 0;
    
    applications.forEach(app => {
        const statusElement = app.querySelector('.application-status');
        if (!statusElement) return;
        
        const appStatus = statusElement.textContent.toLowerCase();
        let shouldShow = false;
        
        switch(status) {
            case 'active':
                shouldShow = appStatus.includes('active') || appStatus.includes('new');
                break;
            case 'review':
                shouldShow = appStatus.includes('review') || appStatus.includes('in review');
                break;
            case 'accepted':
                shouldShow = appStatus.includes('accepted');
                break;
            default:
                shouldShow = true;
        }
        
        if (shouldShow) {
            app.classList.remove('hidden');
            count++;
        } else {
            app.classList.add('hidden');
        }
    });
    
    // Update the "No applications" message
    const noAppsMessage = document.getElementById('noApplicationsMessage');
    if (noAppsMessage) {
        noAppsMessage.classList.toggle('hidden', count > 0);
    }
    
    // Update the active filter indicator
    updateActiveFilterIndicator(status);
}

function updateActiveFilterIndicator(activeFilter) {
    // Remove active class from all filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-primary-teal', 'text-white');
        btn.classList.add('bg-white', 'text-neutral-grey', 'border');
    });
    
    // Add active class to the selected filter
    const activeBtn = document.querySelector(`.filter-btn[data-filter="${activeFilter}"]`);
    if (activeBtn) {
        activeBtn.classList.remove('bg-white', 'text-neutral-grey', 'border');
        activeBtn.classList.add('bg-primary-teal', 'text-white');
    }
}

function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}

async function initializeAppData() {
    // In a real app, you would fetch this from your API
    const userData = {
        name: 'Researcher Name',
        email: 'researcher@example.com',
        stats: {
            active: 5,
            review: 3,
            accepted: 1
        }
    };

    // Update UI with user data
    const nameElement = document.getElementById('researcherName');
    if (nameElement) nameElement.textContent = userData.name;
    
    const emailElement = document.getElementById('userEmail');
    if (emailElement) emailElement.textContent = userData.email;
    
    // Update stats
    const activeCount = document.getElementById('activeAppsCount');
    const reviewCount = document.getElementById('underReviewCount');
    const acceptedCount = document.getElementById('acceptedOffersCount');
    
    if (activeCount) activeCount.textContent = userData.stats.active;
    if (reviewCount) reviewCount.textContent = userData.stats.review;
    if (acceptedCount) acceptedCount.textContent = userData.stats.accepted;
}

async function loadDashboard() {
    try {
        // Get user data from localStorage
        let userData = {};
        try {
            const userDataStr = localStorage.getItem('user');
            if (userDataStr) {
                userData = JSON.parse(userDataStr);
            }
        } catch (e) {
            console.error('Error parsing user data from localStorage:', e);
        }
        
        const token = localStorage.getItem('token');
        
        // Check for force redirect from URL hash
        const hash = window.location.hash.substring(1);
        const forceUniversity = hash === 'force-university';
        const forceResearcher = hash === 'force-researcher';
        
        // Clear the hash to prevent infinite redirects
        if (forceUniversity || forceResearcher) {
            window.history.replaceState(null, null, ' ');
        }
        
        if (!token) {
            // If no token, redirect to login
            window.location.href = 'login.html';
            return;
        }
        
        // Debug: Log the entire localStorage for inspection
        console.log('=== DASHBOARD LOAD DEBUG ===');
        console.log('Full localStorage:', JSON.stringify(localStorage, null, 2));
        console.log('User data from localStorage:', userData);
        console.log('URL hash:', window.location.hash);
        
        // Handle force redirects first - these take highest priority
        if (forceUniversity) {
            console.log('Force redirect to university dashboard');
            // Update the role in localStorage to prevent future issues
            userData.role = 'UNIVERSITY_STAFF';
            localStorage.setItem('user', JSON.stringify(userData));
            // Force the role
            var isUniversityStaff = true;
        } else if (forceResearcher) {
            console.log('Force redirect to researcher dashboard');
            // Update the role in localStorage to prevent future issues
            userData.role = 'RESEARCHER';
            localStorage.setItem('user', JSON.stringify(userData));
            // Force the role
            var isUniversityStaff = false;
        } else {
            // If no force redirect, check the role from localStorage
            console.log('No force redirect, checking localStorage role');
            // Get the role and normalize it
            const userRole = (userData.role || '').toString().toUpperCase();
            console.log('User role from localStorage:', userRole);
            
            // Check if user is university staff (case-insensitive check)
            isUniversityStaff = userRole.includes('UNIVERSITY') || 
                              userRole.includes('STAFF') || 
                              (userData.role && (
                                  userData.role.toString().toLowerCase().includes('university') || 
                                  userData.role.toString().toLowerCase().includes('staff')
                              ));
        }
        
        console.log('Is university staff?', isUniversityStaff);
        
        // Force hide both dashboards first
        const universityDashboard = document.getElementById('universityDashboard');
        const researcherDashboard = document.getElementById('researcherDashboard');
        
        if (universityDashboard) universityDashboard.style.display = 'none';
        if (researcherDashboard) researcherDashboard.style.display = 'none';
        
        // Show the appropriate dashboard
        if (isUniversityStaff) {
            console.log('Showing university dashboard');
            if (universityDashboard) {
                universityDashboard.style.display = 'block';
                // Load university-specific data
                try {
                    await loadUniversityData();
                } catch (error) {
                    console.error('Error loading university data:', error);
                }
            } else {
                console.error('University dashboard element not found!');
            }
        } else {
            console.log('Showing researcher dashboard');
            if (researcherDashboard) {
                researcherDashboard.style.display = 'block';
                // Load researcher-specific data
                try {
                    await loadResearcherData();
                } catch (error) {
                    console.error('Error loading researcher data:', error);
                }
            } else {
                console.error('Researcher dashboard element not found!');
            }
        }

        // Load user profile data
        await loadUserProfile();
        
        // Setup UI elements
        setupDashboardInteractions();
        setupFilterButtons();
        
    } catch (error) {
        console.error('Error loading dashboard:', error);
        alert('Failed to load dashboard. Please try again.');
    }
}

function setupFilterButtons() {
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = button.getAttribute('data-filter');
            filterApplications(filter);
        });
    });
}

function filterApplications(status) {
    const applications = document.querySelectorAll('.application-item');
    let visibleCount = 0;
    
    // Add loading state
    const applicationsList = document.getElementById('applicationsList');
    if (applicationsList) {
        applicationsList.style.opacity = '0.6';
        applicationsList.style.pointerEvents = 'none';
    }
    
    // Small delay for better UX
    setTimeout(() => {
        applications.forEach(app => {
            const statusElement = app.querySelector('.application-status');
            if (!statusElement) return;
            
            const appStatus = statusElement.textContent.toLowerCase();
            let shouldShow = false;
            
            switch(status) {
                case 'active':
                    shouldShow = appStatus.includes('active') || appStatus.includes('new');
                    break;
                case 'review':
                    shouldShow = appStatus.includes('review') || appStatus.includes('under review');
                    break;
                case 'accepted':
                    shouldShow = appStatus.includes('accepted');
                    break;
                case 'all':
                default:
                    shouldShow = true;
            }
            
            if (shouldShow) {
                app.style.display = '';
                visibleCount++;
            } else {
                app.style.display = 'none';
            }
        });
        
        // Show/hide no applications message
        const noAppsMessage = document.getElementById('noApplicationsMessage');
        if (noAppsMessage) {
            noAppsMessage.classList.toggle('hidden', visibleCount > 0);
        }
        
        // Update active filter indicator
        updateActiveFilterIndicator(status);
        
        // Update URL without page reload
        if (history.pushState) {
            const newUrl = `${window.location.pathname}?filter=${status}`;
            window.history.pushState({ path: newUrl }, '', newUrl);
        }
        
        // Remove loading state
        if (applicationsList) {
            applicationsList.style.opacity = '';
            applicationsList.style.pointerEvents = '';
        }
    }, 100);
}

function loadFilterFromUrl() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const filter = params.get('filter');
    
    if (filter) {
        filterApplications(filter);
        
        // Update the active filter button
        const activeBtn = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
        if (activeBtn) {
            updateActiveFilterIndicator(filter);
        }
    }
}

window.addEventListener('hashchange', () => {
    loadFilterFromUrl();
});

async function loadResearcherData() {
    try {
        // In a real app, this would fetch data from an API
        // For now, we'll just show the mock data in the HTML
        console.log('Loading researcher data...');
        
        // Setup any researcher-specific UI elements
        setupFilterButtons();
        
    } catch (error) {
        console.error('Error loading researcher data:', error);
    }
}

async function loadUniversityData() {
    try {
        // In a real app, this would fetch data from an API
        console.log('Loading university data...');
        
        // Setup any university-specific UI elements
        const filterButtons = document.querySelectorAll('#universityDashboard .filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                if (filter) {
                    filterUniversityApplications(filter);
                }
            });
        });
    } catch (error) {
        console.error('Error loading university data:', error);
    }
}

function filterUniversityApplications(status) {
    const applications = document.querySelectorAll('#universityApplicationsList .application-item');

    applications.forEach(app => {
        const appStatus = app.querySelector('[data-status]')?.dataset.status || '';

        if (status === 'all' || appStatus.toLowerCase().includes(status)) {
            app.classList.remove('hidden');
        } else {
            app.classList.add('hidden');
        }
    });

    // Update active filter button
    document.querySelectorAll('#universityDashboard .filter-btn').forEach(btn => {
        if (btn.dataset.filter === status) {
            btn.classList.remove('bg-white', 'text-neutral-grey');
            btn.classList.add('bg-primary-teal', 'text-white');
        } else {
            btn.classList.remove('bg-primary-teal', 'text-white');
            btn.classList.add('bg-white', 'text-neutral-grey');
        }
    });
}

async function loadUserProfile() {
try {
const userData = JSON.parse(localStorage.getItem('user'));
if (!userData) return;

        // Update welcome message based on user role
        if (userData.role === 'university') {
            const welcomeElement = document.querySelector('#universityDashboard h1');
            if (welcomeElement) {
                const universityName = userData.universityName || 'University';
                welcomeElement.textContent = `Welcome, ${universityName}`;
            }
        } else {
            const welcomeElement = document.querySelector('#researcherDashboard h1');
            if (welcomeElement) {
                const name = userData.name || 'Researcher';
                welcomeElement.textContent = `Welcome back, ${name}`;
            }
        }
    } catch (error) {
        console.error('Error loading user profile:', error);
    }
}