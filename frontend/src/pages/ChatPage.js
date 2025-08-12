import { useState, useEffect, useRef, useContext } from 'react';
import ChatContext from '../context/ChatContext';
import AuthContext from '../context/AuthContext';

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { 
    messages, 
    onlineUsers, 
    typingUsers, 
    sendMessage, 
    sendTyping,
    connectionStatus
  } = useContext(ChatContext);
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (message.length > 0 && !isTyping) {
      setIsTyping(true);
      sendTyping(true);
    } else if (message.length === 0 && isTyping) {
      setIsTyping(false);
      sendTyping(false);
    }
  }, [message, isTyping, sendTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message)
        .then(() => setMessage(''))
        .catch(err => alert(err.message));
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat Room</h2>
        <div className="connection-status">
          Status: {connectionStatus}
        </div>
        <div className="online-users">
          Online: {onlineUsers.length}
        </div>
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>
      
      {connectionStatus !== 'connected' && (
        <div className="connection-alert">
          {connectionStatus === 'connecting' && 'Connecting to server...'}
          {connectionStatus === 'error' && 'Connection lost. Reconnecting...'}
        </div>
      )}
      
      <div className="messages-container">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`message ${msg.sender._id === user.id ? 'sent' : 'received'}`}
          >
            <div className="message-sender">{msg.sender.username}</div>
            <div className="message-content">{msg.content}</div>
            <div className="message-time">
              {new Date(msg.createdAt).toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="typing-indicator">
        {typingUsers.length > 0 && (
          <span>{typingUsers.length} user(s) typing...</span>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={connectionStatus !== 'connected'}
        />
        <button 
          type="submit" 
          disabled={connectionStatus !== 'connected'}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPage;