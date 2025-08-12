import { createContext, useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import AuthContext from './AuthContext';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const { user, isAuthenticated, token, logout } = useContext(AuthContext);

  // Initialize socket connection
  useEffect(() => {
    if (isAuthenticated && user && token) {
      const newSocket = io('http://localhost:5000', {
        path: '/socket.io/',
        withCredentials: true,
        transports: ['websocket'],
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        extraHeaders: {
          'x-auth-token': token
        }
      });

      setSocket(newSocket);
      setConnectionStatus('connecting');

      newSocket.on('connect', () => {
        console.log('Socket connected');
        setConnectionStatus('connected');
        newSocket.emit('register', user.id);
      });

      newSocket.on('disconnect', (reason) => {
        console.log('Socket disconnected:', reason);
        setConnectionStatus('disconnected');
      });

      newSocket.on('connect_error', (err) => {
        console.error('Socket connection error:', err);
        setConnectionStatus('error');
        setTimeout(() => newSocket.connect(), 5000); // Reconnect after 5 seconds
      });

      newSocket.on('message', (message) => {
        setMessages(prev => [...prev, message]);
      });

      newSocket.on('onlineUsers', (users) => {
        setOnlineUsers(users);
      });

      newSocket.on('typing', ({ userId, isTyping }) => {
        setTypingUsers(prev => 
          isTyping 
            ? [...new Set([...prev, userId])] 
            : prev.filter(id => id !== userId)
        );
      });

      return () => {
        newSocket.disconnect();
        setConnectionStatus('disconnected');
      };
    }
  }, [isAuthenticated, user, token]);

  // Fetch messages
  const fetchMessages = useCallback(async () => {
    try {
      const res = await axios.get('/api/messages', {
        headers: {
          'x-auth-token': token
        }
      });
      setMessages(res.data);
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
      }
      console.error('Error fetching messages:', err);
    }
  }, [token, logout]);

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchMessages();
    }
  }, [isAuthenticated, token, fetchMessages]);

  // Send message
  const sendMessage = async (content) => {
    try {
      if (!socket || !socket.connected) {
        throw new Error('Not connected to server');
      }
      
      const res = await axios.post('/api/messages', { content }, {
        headers: {
          'x-auth-token': token
        }
      });
      socket.emit('message', res.data);
      return res.data;
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
      }
      console.error('Error sending message:', err);
      throw err.response?.data || { message: 'Failed to send message' };
    }
  };

  // Typing indicator
  const sendTyping = (isTyping) => {
    if (socket && socket.connected) {
      socket.emit('typing', { userId: user.id, isTyping });
    }
  };

  return (
    <ChatContext.Provider value={{ 
      messages, 
      onlineUsers, 
      typingUsers, 
      sendMessage, 
      sendTyping,
      fetchMessages,
      connectionStatus
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;