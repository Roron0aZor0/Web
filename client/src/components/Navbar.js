import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import { jwtDecode } from 'jwt-decode';
import '../styles/Navbar-css.css';
import { CTAButton } from './CTA-button';
import SignUpForm from './SignUpForm';  // Import the SignUpForm component

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);  // New state for SignUp Modal
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Check if token is valid or expired
  const checkTokenValidity = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error('Token decode error:', err);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    }
  };

  useEffect(() => {
    checkTokenValidity();
  }, []);

  // Handle login request
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/backend/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        setIsAuthenticated(true);
        setSuccess('Login successful!');
        setError('');
        localStorage.setItem('token', data.token);
        setShowLoginModal(false);
        navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed!');
      }
    } catch (err) {
      setError('An error occurred while logging in.');
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">I-Tech</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/how-it-works">Courses</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/pricing">About us</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/faq">Contact</Link></li>
            </ul>
          </div>
          <div className="d-flex">
            {!isAuthenticated ? (
              <>
                <button
                  className="btn btn-outline-primary me-2"
                  onClick={() => setShowLoginModal(true)}
                >
                  Login
                </button>
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => setShowSignUpModal(true)}  // Open sign-up modal
                >
                  Signup
                </button>
                <CTAButton to="#" text="Get Started" />
              </>
            ) : (
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <h2 className="mb-4">Login</h2>
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <button type="submit" className="btn btn-primary w-100 mb-2">Login</button>
              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={() => setShowLoginModal(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {showSignUpModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <h2 className="mb-4">Sign Up</h2>
            <SignUpForm /> {/* Render the step-by-step sign-up form here */}
            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={() => setShowSignUpModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
