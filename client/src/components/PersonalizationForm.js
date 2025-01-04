import React, { useState } from 'react';
import './PersonalizationForm.css'

const PersonalizationForm = ({ onGenerateWebsite }) => {
  const [websiteData, setWebsiteData] = useState({
    name: '',
    color: '',
    style: 'default',
  });

  const handleChange = (e) => {
    setWebsiteData({
      ...websiteData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerateWebsite(websiteData); // Call the function passed from Dashboard
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Website Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={websiteData.name}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="color">Primary Color</label>
        <input
          type="color"
          id="color"
          name="color"
          value={websiteData.color}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="style">Website Style</label>
        <select
          id="style"
          name="style"
          value={websiteData.style}
          onChange={handleChange}
          className="form-control"
        >
          <option value="default">Default</option>
          <option value="modern">Modern</option>
          <option value="classic">Classic</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary mt-3">Generate Website</button>
    </form>
  );
};

export default PersonalizationForm;
