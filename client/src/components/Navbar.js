import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import { jwtDecode } from 'jwt-decode';
import '../styles/Navbar-css.css';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // For confirm password in signup
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

  // Handle sign up request
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/backend/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.success) {
        setSuccess('Account created successfully!');
        setError('');
        setShowSignUpModal(false);
      } else {
        setError(data.message || 'Sign Up failed!');
      }
    } catch (err) {
      setError('An error occurred while signing up.');
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
      <nav className="navbar navbar-expand-lg ">
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
              <li className="nav-item"><Link className="nav-link" to="/courses">Courses</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/about">About us</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="d-flex">
            {!isAuthenticated ? (
              <div className="dropdown">
                <button className="btn btn-outline-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                  Login / Sign Up
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <li>
                    <button className="dropdown-item" onClick={() => setShowLoginModal(true)}>Login</button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={() => setShowSignUpModal(true)}>Sign Up</button>
                  </li>
                </ul>
              </div>
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
            <h2 className="modal-header">Login to Your Account</h2>
            <form onSubmit={handleLogin} className="modal-form">
              <div className="form-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
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
              <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={() => setShowLoginModal(false)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SignUp Modal */}
      {showSignUpModal && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <h2 className="modal-header">Create Your Account</h2>
            <form onSubmit={handleSignUp} className="modal-form">
              <div className="form-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email Address"
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
              <div className="form-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <button type="submit" className="btn btn-primary w-100 mb-3">Sign Up</button>
              <button
                type="button"
                className="btn btn-secondary w-100"
                onClick={() => setShowSignUpModal(false)}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
