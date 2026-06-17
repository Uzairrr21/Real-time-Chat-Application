# Real-Time Chat Application

Professional MERN stack chat application with JWT authentication, protected routes, and live messaging over Socket.IO. The project is split into a Node.js/Express backend and a React frontend, with MongoDB for persistence.

## Overview

This application implements a single-room chat experience called `general`. Authenticated users can register, log in, load historical messages, send new messages, view who is online, and see typing activity in real time.

The current codebase is intentionally simple and focused:

- Authentication is handled with JWT tokens stored in `localStorage`.
- Protected API routes require the `x-auth-token` header.
- The frontend uses React Context for auth and chat state.
- The backend uses Express, Mongoose, and Socket.IO.
- A CRA proxy forwards frontend API and socket traffic to the backend during local development.

## Key Features

- User registration and login with email/password credentials
- Password hashing with `bcryptjs`
- JWT-based session handling
- Protected chat route in the frontend
- Real-time message broadcast with Socket.IO
- Typing indicators
- Online user tracking
- Message history persisted in MongoDB
- Responsive client-side UI built with React and CSS

## Architecture

### Backend

The backend exposes REST endpoints for authentication, messages, and users, and also hosts the Socket.IO server.

Core responsibilities:

- Create and verify JWTs
- Hash passwords before saving users
- Store and retrieve messages from MongoDB
- Broadcast realtime events such as messages, typing status, and online users

### Frontend

The frontend manages authentication state, chat state, protected navigation, and socket connectivity.

Core responsibilities:

- Render login and registration screens
- Persist and restore auth state from `localStorage`
- Guard the chat page with a private route
- Connect to Socket.IO after authentication
- Fetch historical messages through the REST API
- Send messages and typing events

## Project Structure

```text
Real-time-Chat-Application/
├── backend/
│   ├── config/
│   │   └── config.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── messageController.js
│   │   └── userController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Message.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── messages.js
│   │   └── users.js
│   └── server.js
└── frontend/
    ├── public/
    │   └── index.html
    └── src/
        ├── components/
        │   └── PrivateRoute.js
        ├── context/
        │   ├── AuthContext.js
        │   └── ChatContext.js
        ├── pages/
        │   ├── AuthPage.js
        │   └── ChatPage.js
        ├── styles/
        │   └── main.css
        ├── App.js
        ├── index.js
        └── setupProxy.js
```

## Tech Stack

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- Socket.IO
- JSON Web Token
- bcryptjs

### Frontend

- React 18
- React Router v6
- Axios
- Socket.IO Client
- http-proxy-middleware

## How It Works

### Authentication flow

1. The user registers or logs in from the `/auth` page.
2. The backend validates credentials, hashes passwords on registration, and returns a JWT.
3. The token is stored in `localStorage` and attached to future requests as `x-auth-token`.
4. The user is redirected to `/chat` once authenticated.
5. The `PrivateRoute` component blocks unauthenticated access to the chat view.

### Chat flow

1. After authentication, the frontend opens a Socket.IO connection to the backend.
2. The client emits a `register` event with the current user id.
3. Messages are fetched from `GET /api/messages` and displayed chronologically.
4. When a user sends a message, the frontend posts it to `POST /api/messages`.
5. The saved message is emitted over Socket.IO so connected clients update immediately.
6. Typing activity is broadcast with the `typing` event.

### Online user tracking

The backend emits an `onlineUsers` event using the socket room list. The frontend uses that payload to show the current number of connected users.

## API Reference

All protected routes require the `x-auth-token` header.

### Auth routes

`POST /api/auth/register`

Request body:

```json
{
  "username": "Jane Doe",
  "email": "jane@example.com",
  "password": "secret123"
}
```

`POST /api/auth/login`

Request body:

```json
{
  "email": "jane@example.com",
  "password": "secret123"
}
```

### Message routes

`GET /api/messages`

- Returns all messages in the `general` room, sorted oldest to newest.

`POST /api/messages`

Request body:

```json
{
  "content": "Hello everyone"
}
```

### User routes

`GET /api/users`

- Returns all users without passwords.

`GET /api/users/:id`

- Returns one user without password data.

## Socket.IO Events

### Client to server

- `register` with `userId`
- `message` with the saved message payload
- `typing` with `{ userId, isTyping }`

### Server to client

- `message` with the new message payload
- `onlineUsers` with the current connected room list
- `typing` with `{ userId, isTyping }`

## Data Models

### User

Fields:

- `username` - required, unique, 3 to 30 characters
- `email` - required, unique, lowercase
- `password` - required, minimum 6 characters
- `createdAt` - timestamp

Passwords are hashed with `bcryptjs` before saving.

### Message

Fields:

- `sender` - reference to `User`
- `content` - required message text, max 500 characters
- `room` - defaults to `general`
- `createdAt` - timestamp

## Environment Variables

Create a `.env` file in `backend/` with the following values:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern-chat
JWT_SECRET=your-secret-key
JWT_EXPIRE=1d
```

Notes:

- `PORT` is optional; the backend defaults to `5000`.
- `MONGO_URI` and `JWT_SECRET` should be changed for any non-local environment.
- `JWT_EXPIRE` defaults to `1d`.

## Local Development

### 1. Install dependencies

From the project root:

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2. Configure the backend

Make sure MongoDB is running locally or update `MONGO_URI` to point to MongoDB Atlas or another hosted instance.

### 3. Start the backend

```bash
cd backend
npm run dev
```

If you prefer a production-style start:

```bash
npm start
```

### 4. Start the frontend

In a separate terminal:

```bash
cd frontend
npm start
```

### 5. Open the app

Visit `http://localhost:3000`.

## Available Scripts

### Backend

- `npm start` - starts the API server with Node.js
- `npm run dev` - starts the API server with Nodemon

### Frontend

- `npm start` - starts the React development server
- `npm run build` - creates an optimized production build
- `npm test` - runs the React test runner
- `npm run eject` - ejects from Create React App

## Implementation Notes

- The frontend chat currently targets a single `general` room.
- The backend includes both route handlers and separate controller files; the active route files are the ones wired into `server.js`.
- The socket server and React client are both configured for `http://localhost:5000` during development.
- The frontend proxy forwards `/api` and `/socket.io` traffic to the backend.
- The chat UI disables sending when the socket is disconnected.

## Deployment Considerations

Before deploying, update the following:

- `MONGO_URI` to a production MongoDB cluster
- `JWT_SECRET` to a secure random secret
- Socket and CORS origins to match the deployed frontend URL
- Any hard-coded localhost URLs in the frontend and proxy configuration

## Limitations

This project is intentionally scoped to a single public room. It does not currently implement direct messages, message deletion, read receipts, media uploads, or role-based access control.

## License

No explicit license file is included in the repository. Add one if you want to define usage rights for distribution or open-source release.
