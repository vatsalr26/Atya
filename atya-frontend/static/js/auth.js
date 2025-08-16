import { auth } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const authForms = document.querySelectorAll('.auth-form');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active tab
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show correct form
            const tabName = btn.dataset.tab;
            authForms.forEach(form => {
                form.classList.toggle('active', form.id === `${tabName}Form`);
            });
        });
    });

    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            try {
                const response = await auth.login({ email, password });
                
                // Store the token in localStorage
                if (response.access_token || response.token) {
                    localStorage.setItem('token', response.access_token || response.token);
                }
                
                // Debug: Log the full API response
                console.log('Login API response:', response);
                
                // Create user object from API response or use existing data
                let user = {
                    email: email,
                    name: response.name || email.split('@')[0],
                    // Default to RESEARCHER if role not provided
                    role: (response.role || 'RESEARCHER').toUpperCase(),
                    universityName: response.universityName || null
                };
                
                console.log('Initial user object:', user);
                
                // Fallback to email-based role detection if role is still not properly set
                if (!user.role || user.role === 'RESEARCHER') {
                    const isUniversityEmail = email.endsWith('.edu') || 
                                          email.includes('university') || 
                                          email.includes('college') ||
                                          email.includes('staff');
                    
                    if (isUniversityEmail) {
                        user.role = 'UNIVERSITY_STAFF';
                        user.universityName = user.universityName || 'University';
                        console.log('Assigned UNIVERSITY_STAFF role based on email');
                    } else {
                        user.role = 'RESEARCHER';
                        console.log('Assigned RESEARCHER role as default');
                    }
                }
                
                localStorage.setItem('user', JSON.stringify(user));
                
                // Ensure user data is properly saved before redirect
                console.log('Final user data before redirect:', user);
                localStorage.setItem('user', JSON.stringify(user));
                
                // Add a small delay to ensure localStorage is updated
                setTimeout(() => {
                    // Redirect to the appropriate dashboard based on role
                    const userRole = user.role || 'RESEARCHER';
                    console.log('Redirecting with role:', userRole);
                    
                    if (userRole.includes('UNIVERSITY') || userRole.includes('STAFF') || userRole.includes('ADMIN')) {
                        console.log('Redirecting to university dashboard');
                        window.location.href = 'university-dashboard.html';
                    } else {
                        console.log('Redirecting to researcher dashboard');
                        window.location.href = 'dashboard.html';
                    }
                }, 100);
            } catch (error) {
                console.error('Login failed:', error.message || 'Unknown error');
            }
        });
    }

    // Registration form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const role = document.getElementById('registerRole').value;
            
            try {
                const response = await auth.register({ email, password, role });
                
                // Create a user object with the registered role
                const user = {
                    email: email,
                    name: email.split('@')[0],
                    role: role, // This will be 'RESEARCHER' or 'UNIVERSITY_STAFF'
                    universityName: role === 'UNIVERSITY_STAFF' ? 'University' : null
                };
                
                // Store the user data in localStorage
                console.log('Storing user after registration:', user);
                localStorage.setItem('user', JSON.stringify(user));
                
                // Also store the token if available in the response
                if (response.access_token) {
                    localStorage.setItem('token', response.access_token);
                }
                
                console.log('Registration successful! Redirecting to dashboard...');
                
                // Redirect directly based on role
                if (role === 'UNIVERSITY_STAFF') {
                    window.location.href = 'university-dashboard.html';
                } else {
                    window.location.href = 'dashboard.html';
                }
            } catch (error) {
                console.error('Registration error:', error);
                console.error('Registration failed:', error.message || 'Unknown error');
            }
        });
    }
});