// components/TemplateSelector.js
import React, { useEffect, useState } from 'react';

const TemplateSelector = () => {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      const response = await fetch('/backend/templates');
      const data = await response.json();
      setTemplates(data);
    };

    fetchTemplates();
  }, []);

  return (
    <div>
      <h2>Select a Template</h2>
      <div className="template-list">
        {templates.map((template) => (
          <div key={template._id} className="template-card">
            <img src={template.image} alt={template.name} />
            <h3>{template.name}</h3>
            <p>{template.description}</p>
            <button>Select Template</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
