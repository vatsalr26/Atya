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
                
                // Store the token and user data in localStorage
                localStorage.setItem('token', response.access_token);
                
                // Get user data from localStorage if it exists and has a role
                let user = JSON.parse(localStorage.getItem('user') || '{}');
                
                // If we don't have a user with role in localStorage, create a new one
                if (!user.role) {
                    // Check if the email is from a university domain as a fallback
                    const isUniversityEmail = email.endsWith('.edu') || email.includes('university') || email.includes('college');
                    
                    user = {
                        email: email,
                        name: email.split('@')[0],
                        role: isUniversityEmail ? 'UNIVERSITY_STAFF' : 'RESEARCHER',
                        universityName: isUniversityEmail ? 'University' : null
                    };
                }
                
                localStorage.setItem('user', JSON.stringify(user));
                
                // Redirect to the appropriate dashboard based on role
                const userRole = (user.role || '').toUpperCase();
                if (userRole.includes('UNIVERSITY') || userRole.includes('STAFF')) {
                    window.location.href = 'university-dashboard.html';
                } else {
                    window.location.href = 'dashboard.html';
                }
            } catch (error) {
                alert(error.message || 'Login failed');
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
                
                alert('Registration successful! You will be redirected to the appropriate dashboard.');
                
                // Redirect directly based on role
                if (role === 'UNIVERSITY_STAFF') {
                    window.location.href = 'university-dashboard.html';
                } else {
                    window.location.href = 'dashboard.html';
                }
            } catch (error) {
                console.error('Registration error:', error);
                alert(error.message || 'Registration failed');
            }
        });
    }
});