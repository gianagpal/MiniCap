import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function VerifyEmail() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleSend = (e) => {
    e.preventDefault();
    // Simulate API call
    console.log('Verification email sent to', email);
    setSent(true);
  };

  return (
    <div className="form-container">
      <h2>Email Verification</h2>
      <form onSubmit={handleSend}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Verification Link</button>
      </form>

      {sent && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setSent(false)}>&times;</span>
            <p>Verification link sent to {email}!</p>
            <button onClick={() => navigate('/user-dashboard')}>Continue to Dashboard</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
