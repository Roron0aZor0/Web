import React, { useState } from 'react';
import './SignUpForm.css';  // Import the CSS file for styling

const SignUpForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    companyName: '',
    industry: '',
    website: '',
    colorScheme: '',
    template: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted', formData);
    try {
      const response = await fetch('http://localhost:5000/backend/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('User signed up successfully:', data);
      } else {
        console.log('Signup failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="modal-content">
      <h2 className="modal-header">Create Your Account</h2>
      <form onSubmit={handleSubmit}>
        {/* Step 1: Basic Information */}
        {step === 1 && (
          <div>
            <h3>Step 1: Basic Information</h3>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-control"
            />
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-control"
            />
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-control"
            />
            <div>
              <button type="button" onClick={nextStep} className="btn btn-primary">Next</button>
            </div>
          </div>
        )}

        {/* Step 2: Company Information */}
        {step === 2 && (
          <div>
            <h3>Step 2: Company Information</h3>
            <label>Company Name:</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              className="form-control"
            />
            <label>Industry:</label>
            <input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              required
              className="form-control"
            />
            <div>
              <button type="button" onClick={prevStep} className="btn btn-secondary">Back</button>
              <button type="button" onClick={nextStep} className="btn btn-primary">Next</button>
            </div>
          </div>
        )}

        {/* Step 3: Website Details */}
        {step === 3 && (
          <div>
            <h3>Step 3: Website Details</h3>
            <label>Website URL:</label>
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              required
              className="form-control"
            />
            <label>Preferred Color Scheme:</label>
            <input
              type="text"
              name="colorScheme"
              value={formData.colorScheme}
              onChange={handleChange}
              placeholder="e.g., Blue, Green"
              required
              className="form-control"
            />
            <label>Template Type:</label>
            <select
              name="template"
              value={formData.template}
              onChange={handleChange}
              required
              className="form-control"
            >
              <option value="">Select Template</option>
              <option value="business">Business</option>
              <option value="portfolio">Portfolio</option>
              <option value="blog">Blog</option>
              <option value="ecommerce">E-commerce</option>
            </select>
            <div>
              <button type="button" onClick={prevStep} className="btn btn-secondary">Back</button>
              <button type="button" onClick={nextStep} className="btn btn-primary">Next</button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div>
            <h3>Step 4: Confirmation</h3>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Company Name:</strong> {formData.companyName}</p>
            <p><strong>Industry:</strong> {formData.industry}</p>
            <p><strong>Website URL:</strong> {formData.website}</p>
            <p><strong>Color Scheme:</strong> {formData.colorScheme}</p>
            <p><strong>Template Type:</strong> {formData.template}</p>
            <div>
              <button type="button" onClick={prevStep} className="btn btn-secondary">Back</button>
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SignUpForm;
