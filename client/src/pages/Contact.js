import React, { useState } from 'react';
import '../styles/Contact.css';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Form submitted successfully!');
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((error) => alert('Error submitting form!'));
  };

  return (
    <section className="contact-page">
      <div className="contact-container">
        {/* Contact Information Section */}
        <div className="contact-info">
          <h3>Get in Touch</h3>
          <p>We would love to hear from you! Contact us through any of the following:</p>
          <ul>
            <li>
              <strong>Email:</strong> contact@yourdomain.com
            </li>
            <li>
              <strong>Phone:</strong> +123-456-7890
            </li>
            <li>
              <strong>Address:</strong> 123 Your Street, Your City
            </li>
          </ul>
        </div>

        {/* Contact Form Section */}
        <div className="contact-form-container">
          <h3>Send Us a Message</h3>
          <form onSubmit={handleSubmit} className="contact-form">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Full Name"
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email Address"
              required
            />

            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message"
              required
            ></textarea>

            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
