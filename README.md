# Atya Research Platform

A comprehensive platform connecting researchers with universities for international research opportunities. This repository contains both the frontend and backend components of the Atya platform.

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

- Node.js (v16+ recommended)
- npm (v8+ recommended)
- PostgreSQL (v13+)
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/atya-research-platform.git
   cd atya-research-platform/Research-Application
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the `Research-Application` directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/atya_db"
   JWT_SECRET="your-super-secret-key"
   PORT=3000
   ```

4. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

5. **Seed the database (optional)**
   ```bash
   npx prisma db seed
   ```

### Frontend Setup

1. **Navigate to the frontend directory**
   ```bash
   cd ../atya-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoint**
   Create a `.env` file in the `atya-frontend` directory:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

## Running the Application

1. **Start the backend server**
   ```bash
   cd Research-Application
   npm run start:dev
   ```
   The API will be available at `http://localhost:3000`

2. **Start the frontend development server**
   ```bash
   cd ../atya-frontend
   python3 serve.py
   ```
   The frontend will be available at `http://localhost:8000`

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

### Backend

1. Set up a production database
2. Configure environment variables
3. Build and start:
   ```bash
   npm run build
   npm run start:prod
   ```

### Frontend

1. Build for production:
   ```bash
   npm run build
   ```
2. Deploy the `static` directory to your web server
3. Configure your web server to serve `index.html` for all routes

## License

MIT License - see the [LICENSE](LICENSE) file for details
