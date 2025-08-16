// Use configuration from config.js
const API_BASE_URL = window.APP_CONFIG.API_URL;

// Test credentials for demo purposes (remove in production)
const TEST_CREDENTIALS = {
    researcher: {
        email: 'researcher@example.com',
        password: 'researcher123',
        role: 'RESEARCHER'
    },
    university: {
        email: 'university@example.com',
        password: 'university123',
        role: 'UNIVERSITY_STAFF'
    }
};

async function apiRequest(endpoint, method = 'GET', data = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // This is important for cookies
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || 'Something went wrong');
        }
        
        return result;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

export const auth = {
    register: (userData) => apiRequest('/auth/register', 'POST', userData),
    login: async (credentials) => {
        // Auto-login with test credentials if in development
        if (window.APP_CONFIG.ENV === 'development') {
            const testUser = Object.values(TEST_CREDENTIALS).find(
                user => user.email === credentials.email
            );
            
            if (testUser && testUser.password === credentials.password) {
                const mockUser = {
                    id: 'test-user-id',
                    email: testUser.email,
                    role: testUser.role,
                    token: 'test-token-12345'
                };
                
                localStorage.setItem('token', mockUser.token);
                localStorage.setItem('user', JSON.stringify(mockUser));
                return mockUser;
            }
        }
        
        // Normal API call for production
        return apiRequest('/auth/login', 'POST', credentials);
    },
    
    // Get current user from localStorage
    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },
    
    // Logout
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};