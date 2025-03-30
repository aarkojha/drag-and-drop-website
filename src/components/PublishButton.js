
import React, { useContext } from 'react';
import { ComponentContext } from '../contexts/ComponentContext';

const PublishButton = () => {
  const { components } = useContext(ComponentContext);

  const handlePublish = () => {
    const websiteData = {
      components,
      timestamp: new Date().toISOString()
    };
    console.log('Publishing:', websiteData);
    alert('Website published successfully!');
  };

  return (
    <button className="publish-btn" onClick={handlePublish}>
      🚀 Publish Website
    </button>
  );
};

export default PublishButton;