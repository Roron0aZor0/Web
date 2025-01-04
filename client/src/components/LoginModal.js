import React, { useState } from 'react';

const LoginModal = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Validate user credentials (simulate with formData for now)
    if (email && password) {
      console.log('User logged in');
      onLoginSuccess(); // Trigger success
    } else {
      console.log('Invalid login');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Login to Proceed</h3>
        <form onSubmit={handleLogin}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
