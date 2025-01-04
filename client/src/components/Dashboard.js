import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';
import PersonalizationForm from '../components/PersonalizationForm';

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation(); // Get current route location

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/backend/user/dashboard', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        const data = await response.json();
        setUserData(data.user);
        setWebsites(data.websites);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchData();
  }, []);

  const handleGenerateWebsite = async (personalizationData) => {
    try {
      setLoading(true);
      const response = await fetch('/backend/generate-website', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(personalizationData),
      });
      const data = await response.json();

      if (data.success) {
        alert('Website successfully generated!');
        setWebsites((prevWebsites) => [...prevWebsites, data.website]);
      } else {
        alert('Error generating website');
      }
    } catch (error) {
      console.error('Error generating website:', error);
      alert('Error generating website');
    } finally {
      setLoading(false);
    }
  };

  // Check if the current route is the one where you want to show the personalization form
  const isPersonalizationPage = location.pathname === '/dashboard/personalize';

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          {/* Sidebar */}
          <div className="sidebar bg-light p-3">
            <h3 className="mb-4">Dashboard</h3>
            <ul className="list-unstyled">
              <li><Link className="d-block py-2" to="overview">Overview</Link></li>
              <li><Link className="d-block py-2" to="websites">Manage Websites</Link></li>
              <li><Link className="d-block py-2" to="settings">Settings</Link></li>
              <li>
                <button
                  className="btn btn-danger mt-3"
                  onClick={() => {
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-md-9">
          {/* Main Content */}
          <h2>Welcome, {userData.name || 'User'}</h2>

          {/* Conditionally render the PersonalizationForm only on the /personalize route */}
          {isPersonalizationPage && <PersonalizationForm onGenerateWebsite={handleGenerateWebsite} />}

          {loading && <p>Generating website, please wait...</p>}

          <h4>Your Websites</h4>
          <ul>
            {websites.map((website, index) => (
              <li key={index}>
                {website.name} - <Link to={`/dashboard/websites/${website.id}`}>Edit</Link>
              </li>
            ))}
          </ul>

          {/* Render sub-routes */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
