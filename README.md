



<h1 align="center">🔥 MERN Chat App</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Stack-MERN-4A6FA5?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Frontend-React-FF8C42?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Backend-Node.js-4A6FA5?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Database-MongoDB-6B8C42?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Author-Uzairrr21-FF8C42?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Contact-uzairmoazzam21@gmail.com-6B8C42?style=for-the-badge"/>
</p>




## Overview

A professional, modern, and fully responsive real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js). This project demonstrates best practices in full-stack development, authentication, socket communication, and beautiful UI/UX design.


<p align="center">
  <img src="https://i.imgur.com/8Q2QbQp.png" width="70%" alt="Section Divider"/>
</p>




## Features

- **Authentication:** Secure login/register with JWT
- **Real-Time Messaging:** Instant chat powered by Socket.io
- **User Management:** View online users, private routes
- **Modern UI:** Responsive, animated, and professional design
- **Easy Configuration:** Environment variables for secrets and DB
- **Production Ready:** Clean code, error handling, and security


<p align="center">
  <img src="https://i.imgur.com/8Q2QbQp.png" width="70%" alt="Section Divider"/>
</p>




## Project Structure

```bash
mern-chat-app/
├── backend/
│   ├── controllers/      # API logic (auth, user, message)
│   ├── middleware/       # JWT authentication
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Express routes
│   ├── config/           # DB and app config
│   ├── server.js         # Entry point
│   └── .env              # Environment variables
└── frontend/
  ├── src/
  │   ├── components/   # Reusable React components
  │   ├── context/      # Global state (Auth, Chat)
  │   ├── pages/        # Auth & Chat pages
  │   ├── styles/       # CSS (main.css)
  │   ├── App.js        # Main app
  │   └── index.js      # React entry
  └── public/
    └── index.html
```


<p align="center">
  <img src="https://i.imgur.com/8Q2QbQp.png" width="70%" alt="Section Divider"/>
</p>




## Technologies Used

**Frontend:** React, CSS
**Backend:** Node.js, Express
**Database:** MongoDB, Mongoose
**Authentication:** JWT
**Real-Time:** Socket.io


<p align="center">
  <img src="https://i.imgur.com/8Q2QbQp.png" width="70%" alt="Section Divider"/>
</p>




## UI/UX Highlights

- Professional orange & blue theme
- Animated buttons, inputs, and error feedback
- Responsive design for all devices
- Clean, modern layout


<p align="center">
  <img src="https://i.imgur.com/8Q2QbQp.png" width="70%" alt="Section Divider"/>
</p>




## Authentication Flow

1. Register/Login: Users sign up or log in securely
2. JWT Token: Issued and stored for session management
3. Protected Routes: Only authenticated users access chat
4. Logout: Securely ends session


<p align="center">
  <img src="https://i.imgur.com/8Q2QbQp.png" width="70%" alt="Section Divider"/>
</p>




## Real-Time Chat

- Socket.io integration for instant messaging
- Online users list
- Typing indicator
- Distinct sent/received message bubbles
- Live connection status


<p align="center">
  <img src="https://i.imgur.com/8Q2QbQp.png" width="70%" alt="Section Divider"/>
</p>




## How to Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/Uzairrr21/mern-chat-app.git
cd mern-chat-app

# 2. Install dependencies
cd backend && npm install
cd ../frontend && npm install

# 3. Set up environment variables
cp backend/.env.example backend/.env
# Edit backend/.env with your MongoDB URI and JWT secret

# 4. Start backend server
cd backend
npm start

# 5. Start frontend
cd ../frontend
npm start

# 6. Visit http://localhost:3000
```


<p align="center">
  <img src="https://i.imgur.com/8Q2QbQp.png" width="70%" alt="Section Divider"/>
</p>




## Backend Details

- **server.js:** Entry point, sets up Express, Socket.io
- **controllers/:** Handles logic for auth, users, messages
- **models/:** Mongoose schemas for User & Message
- **middleware/auth.js:** JWT authentication middleware
- **routes/:** API endpoints for auth, users, messages
- **config/:** DB connection and app config


<p align="center">
  <img src="https://i.imgur.com/8Q2QbQp.png" width="70%" alt="Section Divider"/>
</p>




## Frontend Details

- **App.js:** Main React app, routing
- **components/:** PrivateRoute, UI components
- **context/:** AuthContext, ChatContext for global state
- **pages/:** AuthPage (login/register), ChatPage (chat UI)
- **styles/main.css:** Professional, animated, responsive styles


<p align="center">
  <img src="https://i.imgur.com/8Q2QbQp.png" width="70%" alt="Section Divider"/>
</p>




## Deployment

- Easily deployable to Vercel, Netlify (frontend) and Render, Heroku (backend)
- Environment variables for production secrets
- Secure, scalable architecture


<p align="center">
  <img src="https://i.imgur.com/8Q2QbQp.png" width="70%" alt="Section Divider"/>
</p>




## Contact & Socials

- **GitHub:** [Uzairrr21](https://github.com/Uzairrr21)
- **Email:** uzairmoazzam21@gmail.com


<p align="center">
  <img src="https://i.imgur.com/8Q2QbQp.png" width="70%" alt="Section Divider"/>
</p>




## Credits & License

Made with ❤️ by [Uzairrr21](https://github.com/Uzairrr21)

MIT License
