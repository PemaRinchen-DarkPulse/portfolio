# Portfolio Website

A full-stack personal portfolio website showcasing projects, technical skills, and creative works with a modern responsive design and admin functionality.

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
- [Contributing](#contributing)
- [License](#license)

## Features

- **Responsive Design**: Adapts smoothly to all device sizes
- **Interactive UI**: Modern interface with smooth transitions and animations
- **Project Showcase**: Display technical projects with descriptions, technologies, and links
- **Creative Portfolio**: Share blog posts, articles, poetry, and photography
- **Virtual Assistant**: AI-powered chat assistant to help visitors navigate the site
- **Admin Panel**: Secure content management system for adding/editing projects and portfolio items
- **Authentication**: JWT-based auth system for secure access to admin functions
- **Contact Form**: Allow visitors to send messages directly from the website

## Tech Stack

### Frontend
- **React**: UI library for building the user interface
- **React Router**: For client-side routing
- **CSS3 & Bootstrap**: For styling and responsive design
- **React Icons**: For UI icons
- **Axios**: For handling HTTP requests
- **JWT Decode**: For handling authentication tokens

### Backend
- **Node.js**: JavaScript runtime for the server
- **Express**: Web application framework
- **MongoDB**: NoSQL database for storing data
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB
- **JWT**: For secure authentication
- **bcrypt.js**: For password hashing
- **Dotenv**: For environment variable management

### External Services
- **AI Virtual Assistant**: OpenAI/Groq integration for the chat functionality

## Project Structure

### Frontend Structure
```
client/
├── src/
│   ├── assets/           # Static assets like images
│   ├── components/
│   │   ├── auth/         # Authentication components
│   │   ├── body/         # Main content components
│   │   └── sideBar/      # Navigation components
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Application entry point
```

### Backend Structure
```
server/
├── middleware/           # Express middleware
├── models/               # MongoDB schema models
├── routes/               # API routes
└── server.js             # Server entry point
```

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Setting Up the Project

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Set up environment variables**
   Create a .env file in the server directory with the following:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

5. **Set up client environment variables**
   Create a .env file in the client directory with the following:
   ```
   VITE_OPENAI_API_KEY=your_openai_api_key
   VITE_OPENAI_BASE_URL=your_openai_base_url
   VITE_OPENAI_MODEL=your_openai_model
   ```

## Usage

### Development Mode

1. **Start the backend server**
   ```bash
   cd server
   npm start
   ```

2. **Start the frontend development server**
   ```bash
   cd ../client
   npm run dev
   ```

3. **Access the application**
   Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

### Production Build

1. **Build the frontend**
   ```bash
   cd client
   npm run build
   ```

2. **The built files will be in the `dist` directory**

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new admin user
- `POST /api/auth/login` - Login and get authentication token

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get a specific project by ID
- `POST /api/projects` - Add a new project (Auth required)
- `PUT /api/projects/:id` - Update a project (Auth required)
- `DELETE /api/projects/:id` - Delete a project (Auth required)

### Portfolio
- `GET /api/portfolios` - Get all portfolio items
- `GET /api/portfolios/:id` - Get a specific portfolio item
- `POST /api/portfolios` - Add a new portfolio item (Auth required)
- `PUT /api/portfolios/:id` - Update a portfolio item (Auth required)
- `DELETE /api/portfolios/:id` - Delete a portfolio item (Auth required)

## Authentication

The application uses JWT (JSON Web Tokens) for authentication:
1. User logs in with email and password
2. Server validates credentials and returns a JWT
3. Client stores the JWT in localStorage
4. Protected routes require a valid JWT in the request header

## Admin Features

Admins can:
- Add, edit, and delete projects
- Add, edit, and delete portfolio items
- Manage user information

To access admin features, navigate to `/login` and enter admin credentials.

## Virtual Assistant

The portfolio includes a virtual assistant chatbot accessible from any page:
- Provides information about your background, skills, and projects
- Helps visitors navigate the website
- Answers common questions about your experience and qualifications

## Deployment

The application is designed to be deployed on platforms like:

- **Frontend**: Vercel, Netlify, or GitHub Pages
- **Backend**: Heroku, Render, or Railway
- **Database**: MongoDB Atlas

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.