 import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
/**
 * Footer component that renders the footer section of the website.
 * 
 * The footer contains three main sections:
 * 1. About Us: Provides information about the company.
 * 2. Quick Links: Contains navigation links to different pages.
 * 3. Get in Touch: Includes a subscription form for the newsletter.
 * 
 * @component
 * @example
 * return (
 *   <Footer />
 * )
 */
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>About Us</h2>
          <p>We are a company dedicated to providing the best services to our customers.</p>
        </div>
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
        <div className="footer-section cta">
          <h2>Input</h2>
          <p>Email Here</p>
          <form>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Submit</button>
            
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 Your Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;