// Load environment variables
window.APP_CONFIG = {
    API_URL: 'http://localhost:3000',
    ENV: 'development'
};

// You can also load from a config file if needed
// This will be overridden by the actual config in production
if (window.location.hostname !== 'localhost') {
    window.APP_CONFIG.API_URL = 'https://api.your-deployed-backend.com';
    window.APP_CONFIG.ENV = 'production';
}
