import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const { register, login, error } = useContext(AuthContext);
  const [submissionError, setSubmissionError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError('');
    try {
      if (isLogin) {
        await login({ 
          email: formData.email, 
          password: formData.password 
        });
      } else {
        await register(formData);
      }
    } catch (err) {
      setSubmissionError(err.message || 'An error occurred');
    }
  };

  return (
    <div className="auth-container">
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      {(error || submissionError) && (
        <div className="error-message">
          {error || submissionError}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              minLength="3"
            />
          </div>
        )}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
          />
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <p>
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <button 
          onClick={() => {
            setIsLogin(!isLogin);
            setSubmissionError('');
          }}
          className="switch-mode"
        >
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default AuthPage;