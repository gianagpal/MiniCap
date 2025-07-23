import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const match = users.find((user) => user.email === email && user.password === password);

    if (match) {
      setShowSuccess(true);
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <p style={{ marginTop: '10px' }}>
        Don't have an account?{' '}
        <span style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate('/register')}>
          Register here
        </span>
      </p>

      {showSuccess && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowSuccess(false)}>&times;</span>
            <p>Login successful!</p>
            <button onClick={() => navigate('/verify')}>Continue to Verify Email</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
