import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';
import AuthPage from './pages/AuthPage';
import ChatPage from './pages/ChatPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <AuthProvider>
        <ChatProvider>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/chat" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
            <Route path="/" element={<Navigate to="/auth" />} />
          </Routes>
        </ChatProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;