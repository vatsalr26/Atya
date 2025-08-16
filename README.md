# Atya Research Platform

A comprehensive platform connecting researchers with universities for international research opportunities. This repository contains both the frontend and backend components of the Atya platform.

## 🚀 Quick Start (First-Time Setup)

### 1. Prerequisites
- **Node.js** (v16+ recommended) - [Download](https://nodejs.org/)
- **Python 3.8+** - [Download](https://www.python.org/downloads/)
- **PostgreSQL** (v13+) - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/)
- **npm** (comes with Node.js) or **yarn**

### 2. Clone the Repository
```bash
git clone <repository-url>
cd atya-research-platform
```

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [User Guide](#user-guide)
- [Development](#development)
- [Deployment](#deployment)
- [License](#license)

## Features

- **For Researchers**
  - Browse and apply to research opportunities worldwide
  - Create and manage research profiles
  - Track application status in real-time
  - Receive notifications about application updates

- **For Universities**
  - Post and manage open research positions
  - Review and manage applications
  - Connect with qualified researchers
  - Streamline the hiring process

## Tech Stack

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT
- **API**: RESTful

### Frontend
- **Core**: Vanilla JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Icons**: Heroicons
- **Build Tool**: Vite

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

#### For All Operating Systems
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) (v8+ comes with Node.js)
- [Python 3.8+](https://www.python.org/downloads/)
- [Git](https://git-scm.com/)
- [PostgreSQL](https://www.postgresql.org/download/)

#### Windows Specific
- Install [Windows Subsystem for Linux (WSL)](https://learn.microsoft.com/en-us/windows/wsl/install) (recommended) or use Git Bash
- Install [Python for Windows](https://www.python.org/downloads/windows/)
- Install [PostgreSQL for Windows](https://www.postgresql.org/download/windows/)

#### macOS Specific
- Install [Homebrew](https://brew.sh/) (recommended package manager)
- Install dependencies via Homebrew:
  ```bash
  brew install node python3 postgresql
  ```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install -y nodejs npm python3 python3-pip postgresql postgresql-contrib
```

### Test Credentials

For quick testing, you can use these demo accounts:

**Researcher Account**
- Email: researcher@example.com
- Password: researcher123
- Role: RESEARCHER

**University Staff Account**
- Email: university@example.com
- Password: university123
- Role: UNIVERSITY_STAFF

These credentials work in development mode without requiring a backend.

### Backend Setup

1. **Navigate to the backend directory**
   ```bash
   cd Research-Application
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up PostgreSQL**
   - Start PostgreSQL service:
     - **Windows**: Open Services and start "postgresql-x64-13"
     - **macOS**: `brew services start postgresql`
     - **Linux**: `sudo service postgresql start`
   - Create a new database and user:
     ```bash
     psql postgres -c "CREATE USER atya_user WITH PASSWORD 'your_password';"
     psql postgres -c "CREATE DATABASE atya_db OWNER atya_user;"
     ```

4. **Configure environment variables**
   Create a `.env` file in the `Research-Application` directory:
   ```env
   # Database
   DATABASE_URL="postgresql://atya_user:your_password@localhost:5432/atya_db?schema=public"
   
   # Authentication
   JWT_SECRET="generate-a-secure-secret-key-here"
   JWT_EXPIRATION="1d"
   
   # Server
   PORT=3000
   NODE_ENV=development
   
   # CORS (for local development)
   CORS_ORIGIN="http://localhost:8000"
   ```

5. **Run database migrations**
   ```bash
   npx prisma migrate dev --name init
   ```

6. **Seed the database (optional)**
   ```bash
   npx prisma db seed
   ```
   This will create test users and sample data.

### Frontend Setup

1. **Navigate to the frontend directory**
   ```bash
   cd ../atya-frontend
   ```

2. **Install Python dependencies**
   The frontend uses a simple Python HTTP server. Ensure you have Python installed, then:
   ```bash
   # Install required Python packages (if any)
   pip install -r requirements.txt  # if exists
   ```

3. **Configure environment variables**
   Create a `.env` file in the `atya-frontend` directory:
   ```env
   # API Configuration
   VITE_API_URL=http://localhost:3000
   
   # Environment
   NODE_ENV=development
   
   # Optional: Google/LinkedIn OAuth (if implemented)
   # VITE_GOOGLE_CLIENT_ID=your-google-client-id
   # VITE_LINKEDIN_CLIENT_ID=your-linkedin-client-id
   ```

4. **Install Node.js dependencies** (if any build step is required)
   ```bash
   npm install
   ```
   
5. **Build the frontend (if required)**
   ```bash
   npm run build
   ```

## Running the Application

### 1. Start the Backend Server

```bash
# In the backend directory
cd Research-Application
npm run start:dev
```

This will start the NestJS development server with hot-reload enabled. The API will be available at:
- API: `http://localhost:3000`
- API Documentation: `http://localhost:3000/api` (if Swagger is configured)
- Database GUI: `http://localhost:5555` (if Prisma Studio is started with `npx prisma studio`)

### 2. Start the Frontend Development Server

```bash
# In a new terminal window
cd atya-frontend
python3 serve.py
```

This will start a simple HTTP server. The frontend will be available at:
- Website: `http://localhost:8000`

### 3. Access the Application

- Open your browser and navigate to `http://localhost:8000`
- You can use the following test accounts:

#### Test Accounts

**Researcher Account**
- Email: researcher@example.com
- Password: researcher123
- Role: RESEARCHER

**University Staff Account**
- Email: university@example.com
- Password: university123
- Role: UNIVERSITY_STAFF

## Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Ensure PostgreSQL is running
   - Verify the database credentials in `.env` match your PostgreSQL setup
   - Check if the database and user exist

2. **Port Conflicts**
   - If port 3000 or 8000 is in use, update the respective `.env` files

3. **Missing Dependencies**
   - Run `npm install` in both frontend and backend directories
   - Ensure Python 3.8+ is installed for the frontend server

4. **CORS Errors**
   - Ensure the frontend URL is in the `CORS_ORIGIN` in the backend `.env`
   - Restart the backend server after making changes

## Development Workflow

### Backend Development

- Run in development mode: `npm run start:dev`
- Run tests: `npm test`
- Generate API documentation: `npm run docs`
- Access Prisma Studio: `npx prisma studio`

### Frontend Development

- The frontend uses vanilla JavaScript with ES modules
- Styles are managed with Tailwind CSS
- Run the development server: `python3 serve.py`
- For production build: `npm run build` (if configured)

## Project Structure

```
.
├── Research-Application/    # Backend (NestJS)
│   ├── prisma/             # Database schema and migrations
│   ├── src/                # Source files
│   │   ├── auth/           # Authentication module
│   │   ├── users/          # User management
│   │   ├── universities/   # University management
│   │   ├── open-calls/     # Research opportunities
│   │   └── applications/   # Application processing
│   └── ...
│
└── atya-frontend/          # Frontend
    ├── static/             # Static assets
    │   ├── js/             # JavaScript modules
    │   └── *.html          # Application pages
    └── serve.py            # Development server
```

## API Documentation

The API follows RESTful conventions and requires authentication for protected routes.

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token

### Open Calls

- `GET /open-calls` - List all open calls
- `GET /open-calls/:id` - Get call details
- `POST /open-calls` - Create new call (University Staff only)

### Applications

- `POST /applications` - Submit application
- `GET /applications/me` - View my applications
- `PATCH /applications/:id/status` - Update status (University Staff only)

### Universities

- `GET /universities` - List all universities
- `POST /universities` - Create university (Admin only)

## User Guide

### For Researchers

1. **Registration**
   - Visit `/register` and select "Researcher" role
   - Complete your profile
   - Start browsing open calls

2. **Applying for Positions**
   - Browse available positions at `/open-calls`
   - Click "Apply" and submit your proposal
   - Track your applications at `/dashboard`

### For University Staff

1. **Registration**
   - Visit `/register` and select "University Staff"
   - If your university exists, select it
   - If not, create a new university

2. **Managing Open Calls**
   - Create new calls at `/create-call`
   - View applications at `/university-applications`
   - Update application status as needed

## Development

### Backend Development

- Run in development mode: `npm run start:dev`
- Run tests: `npm test`
- Generate API documentation: `npm run docs`

### Frontend Development

- The frontend uses vanilla JavaScript with ES modules
- Styles are managed with Tailwind CSS
- Run the development server: `python3 serve.py`

## Deployment

### Backend Deployment

1. **Set up a production database**
   - Use a managed PostgreSQL service or set up your own server
   - Create a new database and user

2. **Configure environment variables** in your production environment:
   ```env
   NODE_ENV=production
   DATABASE_URL="postgresql://user:password@your-db-host:5432/your-db-name"
   JWT_SECRET="your-secure-jwt-secret"
   PORT=3000
   ```

3. **Deploy to your server**
   ```bash
   # Install dependencies
   npm install --production
   
   # Run migrations
   npx prisma migrate deploy
   
   # Build the application
   npm run build
   
   # Start the production server
   npm run start:prod
   ```

### Frontend Deployment

1. **Configure environment variables** in `.env.production`:
   ```env
   VITE_API_URL=https://your-deployed-backend.com
   VITE_ENV=production
   ```

2. **Build for production**:
   ```bash
   npm run build
   ```
   This will create optimized files in the `dist` directory.

3. **Deploy to a web server**:
   - Copy the contents of the `dist` directory to your web server
   - Configure your web server to serve `index.html` for all routes (HTML5 History Mode)
   - Example nginx configuration:
     ```nginx
     server {
         listen 80;
         server_name your-domain.com;
         root /path/to/your/dist;
         index index.html;

         location / {
             try_files $uri $uri/ /index.html;
         }
     }
     ```

4. **Set up SSL** (recommended):
   - Use Let's Encrypt to get free SSL certificates
   - Configure your web server to use HTTPS

### Deployment Options

1. **Vercel/Netlify** (Frontend):
   - Connect your GitHub repository
   - Set the build command: `npm run build`
   - Set the output directory: `dist`
   - Add environment variables from `.env.production`

2. **Heroku/Railway** (Backend):
   - Connect your GitHub repository
   - Set environment variables
   - Configure the build command: `npm run build`
   - Set the start command: `npm run start:prod`

3. **Docker** (Optional):
   Create a `Dockerfile` in the backend directory:
   ```dockerfile
   FROM node:16-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "run", "start:prod"]
   ```

   Then build and run:
   ```bash
   docker build -t atya-backend .
   docker run -p 3000:3000 -e DATABASE_URL=... atya-backend
   ```

## License

MIT License - see the [LICENSE](LICENSE) file for details
