import React, { useState, useEffect } from 'react';
import './Overview.css';
const Overview = () => {
  const [userStats, setUserStats] = useState({});
  const [recentProjects, setRecentProjects] = useState([]);

  useEffect(() => {
    // Mocked API call - Replace with your backend
    const fetchData = async () => {
      const mockStats = { totalWebsites: 5, activeProjects: 3 };
      const mockProjects = [
        { id: 1, name: "E-commerce Store", lastEdited: "2025-01-01" },
        { id: 2, name: "Portfolio Website", lastEdited: "2024-12-31" },
      ];
      setUserStats(mockStats);
      setRecentProjects(mockProjects);
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Overview</h2>
      <div className="row">
        {/* User Stats */}
        <div className="col-md-6">
          <div className="card p-3 mb-3">
            <h4>User Stats</h4>
            <p><strong>Total Websites:</strong> {userStats.totalWebsites}</p>
            <p><strong>Active Projects:</strong> {userStats.activeProjects}</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-md-6">
          <div className="card p-3 mb-3">
            <h4>Recent Projects</h4>
            <ul>
              {recentProjects.map((project) => (
                <li key={project.id}>
                  {project.name} (Last Edited: {project.lastEdited})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="card p-3">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="/dashboard/create">Create New Project</a></li>
          <li><a href="/dashboard/websites">Manage Websites</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Overview;
