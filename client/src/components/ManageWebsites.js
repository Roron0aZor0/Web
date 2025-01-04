import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ManageWebsites = () => {
  const [websites, setWebsites] = useState([]);

  useEffect(() => {
    // Fetch websites data from the backend (mock example)
    const fetchWebsites = async () => {
      const response = await fetch('/backend/user/websites', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setWebsites(data.websites); // Assuming data contains a list of websites
    };
    fetchWebsites();
  }, []);

  return (
    <div className="container">
      <h2>Manage Your Websites</h2>
      <ul>
        {websites.map((website, index) => (
          <li key={index}>
            {website.name} - <Link to={`/dashboard/website/${website.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageWebsites;
