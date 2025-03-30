// src/pages/FormPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormStepper from '../components/FormStepper';

const FormPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    websiteTitle: '',
    businessCategory: 'LOCAL BUSINESS',
    subDomain: '',
    city: 'Nagpur, Maharashtra, India',
    address: 'Gennie Lambghare, 74, Vinoba Gram Society...',
    postalCode: '440022',
    showAddress: true
  });

  const steps = ['Register Yourself', 'Submit Website Details', 'Live'];

  const validateStep = () => {
    const newErrors = {};
    
    if (currentStep === 0 && !formData.websiteTitle.trim()) {
      newErrors.websiteTitle = 'Website Title is required';
    }
    
    if (currentStep === 1) {
      if (!formData.subDomain.trim()) newErrors.subDomain = 'Sub-domain is required';
      if (!/^\d{6}$/.test(formData.postalCode)) newErrors.postalCode = 'Invalid postal code';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleFinalSubmit = () => {
    if (!formData.websiteTitle || !formData.subDomain) {
      setErrors({
        general: 'Please complete all required fields'
      });
      return;
    }
    
    navigate('/editor', {
      state: formData,
      replace: true
    });
  };

  return (
    <div className="form-container">
      <h1>Create Your Website</h1>
      <FormStepper steps={steps} currentStep={currentStep} />
      
      {currentStep === 0 && (
        <div className="form-step">
          <div className="form-group">
            <label>Website Title *</label>
            <input
              type="text"
              value={formData.websiteTitle}
              onChange={(e) => setFormData({...formData, websiteTitle: e.target.value})}
              required
            />
            {errors.websiteTitle && <span className="error">{errors.websiteTitle}</span>}
          </div>

          <div className="form-group">
            <label>Business Category *</label>
            <select
              value={formData.businessCategory}
              onChange={(e) => setFormData({...formData, businessCategory: e.target.value})}
            >
              <option value="LOCAL BUSINESS">Local Business</option>
              <option value="ECOMMERCE">E-commerce</option>
              <option value="BLOG">Blog</option>
            </select>
          </div>
        </div>
      )}

      {currentStep === 1 && (
        <div className="form-step">
          <div className="form-group">
            <label>Sub-domain *</label>
            <div className="subdomain-input">
              <input
                type="text"
                value={formData.subDomain}
                onChange={(e) => setFormData({...formData, subDomain: e.target.value})}
                required
              />
              <span>.websites.co.in</span>
            </div>
            {errors.subDomain && <span className="error">{errors.subDomain}</span>}
          </div>

          <div className="form-group">
            <label>Postal Code *</label>
            <input
              type="text"
              value={formData.postalCode}
              onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
              pattern="\d{6}"
              required
            />
            {errors.postalCode && <span className="error">{errors.postalCode}</span>}
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="preview-container">
          <button 
            type="button" 
            className="submit-btn"
            onClick={handleFinalSubmit}
          >
            Launch Editor
          </button>
          {errors.general && <div className="error">{errors.general}</div>}
        </div>
      )}

      <div className="form-navigation">
        {currentStep > 0 && (
          <button type="button" className="nav-btn prev" onClick={handlePrev}>
            ← Previous
          </button>
        )}
        
        {currentStep < 2 && (
          <button type="button" className="nav-btn next" onClick={handleNext}>
            Next →
          </button>
        )}
      </div>
    </div>
  );
};

export default FormPage;