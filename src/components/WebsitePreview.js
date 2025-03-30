import React from 'react';

const WebsitePreview = ({ data }) => {
  return (
    <div className="website-preview">
      {/* Hero Section */}
      <header className="preview-hero" style={{ 
        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)'
      }}>
        <div className="hero-content">
          <h1 className="hero-title">{data.websiteTitle || 'Your Brand Name'}</h1>
          <p className="hero-subtitle">{data.businessCategory.replace('_', ' ')}</p>
        </div>
      </header>

      {/* Features Grid */}
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">📍</div>
          <h3>Our Location</h3>
          {data.showAddress && (
            <div className="feature-content">
              <p>{data.address}</p>
              <p>{data.city}</p>
              <p>PIN: {data.postalCode}</p>
            </div>
          )}
        </div>

        <div className="feature-card">
          <div className="feature-icon">🕒</div>
          <h3>Working Hours</h3>
          <div className="feature-content">
            <p>Mon-Fri: 9AM - 7PM</p>
            <p>Saturday: 10AM - 5PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Let's Connect!</h2>
          <div className="cta-buttons">
            <button className="cta-btn primary">
              📞 Call Us Now
            </button>
            <button className="cta-btn secondary">
              📧 Email Us
            </button>
          </div>
        </div>
      </section>

      {/* Domain Display */}
      <div className="domain-banner">
        <div className="domain-content">
          <span className="lock-icon">🔒</span>
          <span className="domain-url">
            https://{data.subDomain || 'yourname'}.websites.co.in
          </span>
        </div>
      </div>
    </div>
  );
};

export default WebsitePreview;