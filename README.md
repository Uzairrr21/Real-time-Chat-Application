<!-- Animated Header -->
<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Inter&size=32&pause=1000&color=FF8C42&center=true&vCenter=true&width=700&lines=Welcome+to+MERN+Chat+App;Built+by+Uzairrr21;Professional+Real-Time+Chat+Solution" alt="Animated header"/>
</p>

<h1 align="center" style="color:#FF8C42;">MERN Chat App</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Stack-MERN-4A6FA5?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Author-Uzairrr21-FF8C42?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Contact-uzairmoazzam21@gmail.com-6B8C42?style=for-the-badge"/>
</p>

---

## ✨ Overview

A **professional, modern, and fully responsive** real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js). This project demonstrates best practices in full-stack development, authentication, socket communication, and beautiful UI/UX design.

---

## 🚀 Features

- <img src="https://img.icons8.com/color/48/000000/secured-letter.png" width="24"/> **Authentication:** Secure login/register with JWT
- <img src="https://img.icons8.com/color/48/000000/chat.png" width="24"/> **Real-Time Messaging:** Instant chat powered by Socket.io
- <img src="https://img.icons8.com/color/48/000000/user-group-man-man.png" width="24"/> **User Management:** View online users, private routes
- <img src="https://img.icons8.com/color/48/000000/paint-palette.png" width="24"/> **Modern UI:** Responsive, animated, and professional design
- <img src="https://img.icons8.com/color/48/000000/settings.png" width="24"/> **Easy Configuration:** Environment variables for secrets and DB
- <img src="https://img.icons8.com/color/48/000000/rocket.png" width="24"/> **Production Ready:** Clean code, error handling, and security

---

## 🏗️ Project Structure

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

---

## 🛠️ Technologies Used

| Frontend | Backend | Database | Auth | Real-Time |
|----------|--------|----------|------|-----------|
| React    | Node.js| MongoDB  | JWT  | Socket.io |
| CSS      | Express| Mongoose |      |           |

---

## 🎨 UI/UX & Animations

- **Professional Theme:** Orange & blue palette for a vibrant, modern look
- **Animated Buttons & Inputs:** Smooth transitions, focus effects
- **Responsive Design:** Mobile-friendly layouts
- **Animated SVG Header:** Dynamic welcome message
- **Error Feedback:** Animated error messages for better UX

---

## 🔐 Authentication Flow

1. **Register/Login:** Users sign up or log in securely
2. **JWT Token:** Issued and stored for session management
3. **Protected Routes:** Only authenticated users access chat
4. **Logout:** Securely ends session

---

## 💬 Real-Time Chat

- **Socket.io Integration:** Enables instant messaging
- **Online Users:** See who's online in real time
- **Typing Indicator:** Animated feedback when users are typing
- **Message Bubbles:** Sent/received messages styled distinctly

---

## 📦 How to Run Locally

```bash
# 1. Clone the repo
$ git clone https://github.com/Uzairrr21/mern-chat-app.git
$ cd mern-chat-app

# 2. Install dependencies
$ cd backend && npm install
$ cd ../frontend && npm install

# 3. Set up environment variables
$ cp backend/.env.example backend/.env
# Edit backend/.env with your MongoDB URI and JWT secret

# 4. Start backend server
$ cd backend
$ npm start

# 5. Start frontend
$ cd ../frontend
$ npm start

# 6. Visit http://localhost:3000
```

---

## 📁 Backend Details

- **server.js:** Entry point, sets up Express, Socket.io
- **controllers/:** Handles logic for auth, users, messages
- **models/:** Mongoose schemas for User & Message
- **middleware/auth.js:** JWT authentication middleware
- **routes/:** API endpoints for auth, users, messages
- **config/:** DB connection and app config

---

## 🖥️ Frontend Details

- **App.js:** Main React app, routing
- **components/:** PrivateRoute, UI components
- **context/:** AuthContext, ChatContext for global state
- **pages/:** AuthPage (login/register), ChatPage (chat UI)
- **styles/main.css:** Professional, animated, responsive styles

---

## 🌐 Deployment

- Easily deployable to **Vercel**, **Netlify** (frontend) and **Render**, **Heroku** (backend)
- Environment variables for production secrets
- Secure, scalable architecture

---

## 📞 Contact & Socials

- **GitHub:** [Uzairrr21](https://github.com/Uzairrr21)
- **Email:** uzairmoazzam21@gmail.com

---

## 🏆 Credits & License

Made with ❤️ by Uzairrr21

> MIT License

---

<!-- Animated Footer -->
<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Inter&size=24&pause=1000&color=4A6FA5&center=true&vCenter=true&width=700&lines=Happy+Chatting!;Star+the+repo+if+you+like+it!;Contributions+Welcome!" alt="Animated footer"/>
</p>
