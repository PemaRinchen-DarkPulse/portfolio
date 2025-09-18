# Portfolio Website

A full-stack personal portfolio website built by **Pema Rinchen** showcasing technical projects, creative works, and professional experience with modern responsive design, AI-powered virtual assistant, and comprehensive admin functionality.

![Portfolio Preview](client/src/assets/images/home.jpg)

## Table of Contents
   
   
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Admin Features](#admin-features)
- [Virtual Assistant](#virtual-assistant)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

### Core Features
- **Responsive Design**: Fully responsive layout that adapts to all screen sizes with dynamic navigation
- **Modern UI/UX**: Clean, professional interface with smooth animations and transitions
- **Multi-Section Portfolio**: 
  - Home: Personal introduction and overview
  - About: Detailed background and skills
  - Projects: Technical projects with live demos and source code
  - Portfolio: Creative works including blog posts, stories, poetry, and photography
  - Resume: Professional experience and qualifications
  - Contact: Contact form with email integration

### Advanced Features
- **AI Virtual Assistant**: "Virtual Pema" - An intelligent chatbot powered by Groq API (OpenAI-compatible)
- **Admin Panel**: Secure content management system for dynamic content updates
- **Authentication System**: JWT-based authentication with protected routes
- **Contact Form**: SendGrid integration for email notifications
- **File Upload**: Support for image uploads with Base64 encoding
- **Dynamic Content**: Real-time content management for projects and portfolio items
- **Cross-Platform Deployment**: Optimized for Vercel deployment

## Tech Stack

### Frontend
- **React 18.3.1**: Modern UI library with hooks and context
- **React Router Dom 6.28.1**: Client-side routing and navigation
- **Vite 5.4.8**: Fast build tool and development server
- **Bootstrap 5.3.3 & Reactstrap 9.2.3**: Responsive CSS framework
- **React Icons 5.4.0**: Comprehensive icon library
- **Axios 1.9.0**: HTTP client for API requests
- **JWT Decode 4.0.0**: Token handling and authentication

### Backend
- **Node.js**: JavaScript runtime environment
- **Express 4.18.2**: Web application framework
- **MongoDB & Mongoose 8.15.0**: NoSQL database with ODM
- **JWT (jsonwebtoken 9.0.2)**: Authentication and authorization
- **bcryptjs 3.0.2**: Password hashing and security
- **Multer 2.0.2**: File upload handling
- **CORS 2.8.5**: Cross-origin resource sharing

### External Services & APIs
- **Groq API**: AI chatbot integration (OpenAI-compatible)
- **SendGrid**: Email service for contact form
- **MongoDB Atlas**: Cloud database hosting
- **Vercel**: Deployment platform for both frontend and backend

### Development Tools
- **ESLint**: Code linting and formatting
- **Nodemon**: Development server auto-restart
- **Environment Variables**: Secure configuration management

## Project Structure

```
portfolio/
├── client/                          # Frontend React application
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── assets/
│   │   │   └── images/              # Static images (hero, about, profile, etc.)
│   │   ├── components/
│   │   │   ├── auth/                # Authentication components
│   │   │   │   ├── AuthContext.jsx  # Global auth state management
│   │   │   │   ├── Login.jsx        # Login form component
│   │   │   │   └── ProtectedRoute.jsx # Route protection wrapper
│   │   │   ├── body/                # Main content components
│   │   │   │   ├── about/           # About section
│   │   │   │   ├── bubbleChat/      # AI Virtual Assistant
│   │   │   │   │   ├── BubbleChat.jsx
│   │   │   │   │   ├── chatService.js # Groq API integration
│   │   │   │   │   └── BubbleChat.css
│   │   │   │   ├── contact/         # Contact form
│   │   │   │   ├── home/            # Landing page
│   │   │   │   ├── portfolio/       # Creative works showcase
│   │   │   │   │   ├── Portfolio.jsx
│   │   │   │   │   ├── Details.jsx  # Portfolio item details
│   │   │   │   │   └── PortfolioUploadForm.jsx
│   │   │   │   ├── project/         # Technical projects
│   │   │   │   │   ├── ProjectList.jsx
│   │   │   │   │   ├── ProjectCard.jsx
│   │   │   │   │   └── ProjectUploadForm.jsx
│   │   │   │   └── resume/          # Resume/CV section
│   │   │   ├── shared/              # Reusable components
│   │   │   │   ├── LoadingSpinner.jsx
│   │   │   │   └── SharedHero.jsx
│   │   │   └── sideBar/             # Navigation components
│   │   │       ├── SideBar.jsx      # Desktop navigation
│   │   │       ├── SideBarSmallScreen.jsx # Mobile navigation
│   │   │       └── Navbar.css
│   │   ├── config/
│   │   │   ├── api.js               # API base URL configuration
│   │   │   └── axios.js             # Axios instance setup
│   │   ├── services/
│   │   │   └── api.js               # API service functions
│   │   ├── App.jsx                  # Main application component
│   │   ├── main.jsx                 # Application entry point
│   │   └── app.css                  # Global styles
│   ├── package.json                 # Frontend dependencies
│   ├── vite.config.js              # Vite configuration
│   ├── vercel.json                 # Vercel deployment config
│   └── eslint.config.js            # ESLint configuration
│
├── server/                          # Backend Express application
│   ├── api/
│   │   └── index.js                # Vercel serverless handler
│   ├── middleware/
│   │   └── auth.js                 # JWT authentication middleware
│   ├── models/                     # Mongoose data models
│   │   ├── User.js                 # Admin user model
│   │   ├── Project.js              # Technical projects model
│   │   ├── Portfolio.js            # Creative works model
│   │   └── Contact.js              # Contact form submissions model
│   ├── routes/                     # API route handlers
│   │   ├── auth.js                 # Authentication endpoints
│   │   ├── project.js              # Project CRUD operations
│   │   ├── portfolio.js            # Portfolio CRUD operations
│   │   └── contact.js              # Contact form & SendGrid integration
│   ├── uploads/                    # File upload directory (development)
│   ├── utils/
│   │   ├── fileUpload.js           # File handling utilities
│   │   └── imageUrlHelper.js       # Image processing helpers
│   ├── server.js                   # Main server file
│   ├── package.json                # Backend dependencies
│   └── vercel.json                 # Vercel deployment config
│
└── README.md                       # Project documentation
```

## Installation

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn** package manager
- **Git** for version control

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/PemaRinchen-DarkPulse/portfolio.git
   cd portfolio
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables** (see [Environment Variables](#environment-variables) section)

5. **Start development servers**
   ```bash
   # Terminal 1 - Start backend server
   cd server
   npm run dev
   
   # Terminal 2 - Start frontend development server  
   cd client
   npm run dev
   ```

6. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

### Production Build

```bash
# Build frontend for production
cd client
npm run build

# Start production server
cd ../server
npm start
```

## Usage

### Development Mode

1. **Start the backend server**
   ```bash
   cd server
   npm run dev        # Uses nodemon for auto-restart
   # or
   npm start          # Standard node server
   ```

2. **Start the frontend development server**
   ```bash
   cd client
   npm run dev        # Starts Vite dev server on http://localhost:5173
   ```

3. **Access the application**
   - Open your browser and navigate to `http://localhost:5173`
   - The frontend will proxy API requests to `http://localhost:5000`

### Production Build

1. **Build the frontend**
   ```bash
   cd client
   npm run build      # Creates optimized build in dist/ directory
   ```

2. **Preview production build**
   ```bash
   npm run preview    # Preview the production build locally
   ```

### Available Scripts

#### Frontend (client/)
- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

#### Backend (server/)
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run server` - Alias for dev script

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new admin user
- `POST /api/auth/login` - Login and get JWT authentication token

### Projects (Technical Projects)
- `GET /api/projects` - Get all projects (public)
- `GET /api/projects/:id` - Get a specific project by ID (public)
- `POST /api/projects` - Add a new project (Auth required)
- `PUT /api/projects/:id` - Update a project (Auth required)
- `DELETE /api/projects/:id` - Delete a project (Auth required)

### Portfolio (Creative Works)
- `GET /api/portfolios` - Get all portfolio items (public)
- `GET /api/portfolios/:id` - Get a specific portfolio item (public)
- `POST /api/portfolios` - Add a new portfolio item (Auth required)
- `PUT /api/portfolios/:id` - Update a portfolio item (Auth required)
- `DELETE /api/portfolios/:id` - Delete a portfolio item (Auth required)

### Contact
- `POST /api/contact` - Submit contact form (public)
- `POST /api/messages` - Alternative endpoint (alias for /api/contact)

### File Upload
- File uploads are handled via Base64 encoding for Vercel compatibility
- Maximum file size: 10MB
- Supported formats: Images (JPEG, PNG, WebP, etc.)

### Authentication Headers
Protected endpoints require JWT token in header:
```
Authorization: Bearer <your_jwt_token>
```

## Authentication

The application uses **JWT (JSON Web Tokens)** for secure authentication:

### How It Works
1. Admin user logs in with email and password via `/login` route
2. Server validates credentials against MongoDB user collection
3. Upon successful authentication, server returns a signed JWT token
4. Client stores the JWT in localStorage for persistence
5. Protected routes require valid JWT in Authorization header
6. Tokens are verified using middleware before accessing protected resources

### Security Features
- Passwords hashed using bcryptjs with salt rounds
- JWT tokens include expiration timestamps
- Protected routes automatically redirect to login if token is invalid
- Authentication context provides global state management
- Secure HTTP-only recommendations for production deployment

### Admin Access
- Navigate to `/login` to access admin panel
- Only authenticated admins can:
  - Add/edit/delete projects
  - Add/edit/delete portfolio items
  - Access upload forms and content management

## Admin Features

The admin panel provides comprehensive content management:

### Project Management
- **Add Projects**: Upload technical projects with descriptions, technologies, and links
- **Edit Projects**: Update existing project information and images
- **Delete Projects**: Remove projects from the portfolio
- **File Upload**: Support for project images and media

### Portfolio Management
- **Add Portfolio Items**: Create blog posts, stories, poetry, and photography entries
- **Rich Content**: Support for markdown formatting and media content
- **Categories**: Organize creative works by type and theme
- **Content Preview**: Preview items before publishing

### User Management
- **Admin Registration**: Create new admin accounts
- **Authentication**: Secure login/logout functionality
- **Role-Based Access**: Admin-only access to management features

### Dashboard Features
- **Upload Forms**: Intuitive forms for adding new content
- **Real-time Updates**: Immediate reflection of changes
- **Responsive Interface**: Mobile-friendly admin panel
- **Error Handling**: Comprehensive validation and error messages

## Virtual Assistant

### "Virtual Pema" - AI-Powered Chat Assistant

The portfolio features an intelligent chatbot that enhances user experience:

#### Features
- **Contextual Responses**: Trained on Pema's background, skills, and projects
- **Site Navigation**: Helps visitors find specific information
- **Personal Information**: Provides details about education, experience, and skills
- **Project Guidance**: Explains technical projects and creative works
- **Professional Inquiries**: Answers questions about qualifications and experience

#### Technical Implementation
- **Groq API Integration**: Uses OpenAI-compatible endpoints for AI responses
- **Persistent Chat**: Maintains conversation history during session
- **Responsive UI**: Floating chat bubble with expandable interface
- **Real-time Interaction**: Instant responses with typing indicators
- **Error Handling**: Graceful fallbacks for API failures

#### Knowledge Base
Virtual Pema is equipped with comprehensive information about:
- Educational background (B.Tech Computer Science at Symbiosis Institute Of Technology)
- Technical skills (React, Node.js, MongoDB, Full-stack development)
- Programming languages and frameworks
- Project portfolio and achievements
- Personal interests and creative works
- Contact information and social media presence

#### Chat Interface
- **Bubble Design**: Unobtrusive floating chat icon
- **Expandable Window**: Full chat interface on click
- **Auto-greeting**: Welcome message on first interaction
- **Typing Indicators**: Visual feedback during AI response generation
- **Mobile Optimized**: Touch-friendly interface for all devices

## Deployment

### Vercel Deployment (Recommended)

This project is optimized for **Vercel** deployment with separate configurations for frontend and backend:

#### Frontend Deployment
```bash
# Deploy from client/ directory
cd client
vercel --prod
```

**Configuration (`client/vercel.json`):**
- Uses `@vercel/static-build` for React application
- Builds to `dist` directory via Vite
- Includes SPA routing configuration

#### Backend Deployment
```bash
# Deploy from server/ directory  
cd server
vercel --prod
```

**Configuration (`server/vercel.json`):**
- Uses `@vercel/node` for serverless functions
- Routes all API requests to `server.js`
- Handles both `/api/*` and root routes

### Alternative Deployment Options

#### Frontend
- **Netlify**: Drag & drop `dist` folder or connect GitHub repo
- **GitHub Pages**: For static deployment with GitHub Actions
- **Render**: Connect repository with automatic builds

#### Backend
- **Railway**: Container-based deployment with MongoDB support
- **Heroku**: Traditional PaaS deployment (requires Procfile)
- **Render**: Full-stack hosting with database support

#### Database
- **MongoDB Atlas**: Recommended cloud MongoDB hosting
- **Local MongoDB**: For development and testing

### Environment Configuration

Ensure all environment variables are properly configured in your deployment platform:

**Frontend Environment Variables:**
- `VITE_OPENAI_API_KEY`
- `VITE_OPENAI_BASE_URL` 
- `VITE_OPENAI_MODEL`
- `VITE_API_URL` (for production backend URL)

**Backend Environment Variables:**
- `MONGO_URI`
- `JWT_SECRET`
- `SENDGRID_API_KEY`
- `NODE_ENV=production`

### Deployment Checklist

- [ ] All environment variables configured
- [ ] MongoDB database accessible from deployment platform
- [ ] CORS origins updated for production domains
- [ ] Frontend API URLs point to production backend
- [ ] SSL certificates configured (handled by Vercel automatically)
- [ ] Domain names configured and DNS updated

## Environment Variables

### Backend Environment Variables

Create a `.env` file in the `server/` directory:

```env
# Database Configuration
MONGO_URI=mongodb://localhost:27017/portfolio
# or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# Email Service (SendGrid)
SENDGRID_API_KEY=your_sendgrid_api_key_here

# Server Configuration  
PORT=5000
NODE_ENV=development
```

### Frontend Environment Variables

Create a `.env` file in the `client/` directory:

```env
# AI Virtual Assistant (Groq API - OpenAI Compatible)
VITE_OPENAI_API_KEY=your_groq_api_key_here
VITE_OPENAI_BASE_URL=https://api.groq.com/openai/v1
VITE_OPENAI_MODEL=mixtral-8x7b-32768

# API Configuration (for production)
VITE_API_URL=https://your-backend-domain.vercel.app
```

### Obtaining API Keys

#### MongoDB Atlas
1. Visit [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP address
5. Get connection string from "Connect" button

#### SendGrid
1. Visit [SendGrid](https://sendgrid.com/)
2. Create a free account
3. Generate an API key in Settings → API Keys
4. Verify sender identity for email sending

#### Groq API
1. Visit [Groq Console](https://console.groq.com/)
2. Create an account
3. Generate an API key
4. Use OpenAI-compatible endpoints

### Security Notes
- Never commit `.env` files to version control
- Use strong, unique values for JWT_SECRET
- Regularly rotate API keys
- Use environment-specific configurations
- Enable IP whitelisting for MongoDB Atlas in production

## Contributing

Contributions are welcome! Please follow these guidelines:

### Getting Started
1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/portfolio.git
   cd portfolio
   ```
3. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

### Development Guidelines
- Follow existing code style and formatting
- Write clear, descriptive commit messages
- Test your changes thoroughly
- Update documentation as needed
- Ensure all linting passes

### Submitting Changes
1. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
2. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
3. **Open a Pull Request**
   - Provide clear description of changes
   - Reference any related issues
   - Include screenshots for UI changes

### Code Style
- Use ESLint configuration provided
- Follow React best practices and hooks patterns
- Use meaningful variable and function names
- Comment complex logic and algorithms
- Maintain consistent file and folder structure

### Areas for Contribution
- UI/UX improvements
- Performance optimizations
- Additional AI chatbot features
- Enhanced admin panel functionality
- Mobile responsiveness improvements
- Accessibility enhancements
- Documentation updates

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### MIT License Summary
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use
- ❌ Liability
- ❌ Warranty

---

## About the Developer

**Pema Rinchen** - Computer Science Student & Full-Stack Developer

- 🎓 B.Tech in Computer Science at Symbiosis Institute Of Technology (2022-2026)
- 💻 Passionate about React, Node.js, and AI integration
- 🌟 Building modern web applications with cutting-edge technologies
- 📧 Contact: pemarinchen12.31.2002@gmail.com

### Connect With Me
- 💼 [LinkedIn](https://www.linkedin.com/in/pema-rinchen-305558264/)
- 🐙 [GitHub](https://github.com/PemaRinchen-DarkPulse)
- 📸 [Instagram](https://www.instagram.com/blazepknight/)
- 📘 [Facebook](https://www.facebook.com/BlazePknight)

---

**⭐ If this project helped you, please give it a star on GitHub! ⭐**