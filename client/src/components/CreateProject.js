// src/components/CreateProject.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {
  const [name, setName] = useState('');
  const [template, setTemplate] = useState('');
  const navigate = useNavigate();

  const handleCreateProject = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const userId = 'userIdFromToken'; // Extract from token

    const projectData = { name, template, userId };

    try {
      const response = await axios.post('http://localhost:5000/api/projects', projectData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        navigate('/dashboard');  // This replaces `history.push('/dashboard')`
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Create a New Project</h2>
      <form onSubmit={handleCreateProject}>
        <div className="form-group">
          <label>Project Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Select Template</label>
          <select
            className="form-control"
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            required
          >
            <option value="">Select a template</option>
            <option value="template1">Template 1</option>
            <option value="template2">Template 2</option>
            {/* Add more templates */}
          </select>
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Create Project
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
