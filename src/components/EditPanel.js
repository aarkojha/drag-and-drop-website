import React, { useState, useEffect } from 'react';

const EditPanel = ({ selectedComponent, updateComponent, onClose }) => {
  const [localState, setLocalState] = useState({ 
    ...selectedComponent,
    styles: selectedComponent?.styles || {}
  });

  useEffect(() => {
    if (selectedComponent) {
      setLocalState({
        ...selectedComponent,
        styles: selectedComponent.styles || {}
      });
    }
  }, [selectedComponent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStyleChange = (styleName, value) => {
    setLocalState(prev => ({
      ...prev,
      styles: {
        ...prev.styles,
        [styleName]: value
      }
    }));
  };

  const handleSubmit = () => {
    updateComponent(localState.id, localState);
    onClose();
  };

  if (!selectedComponent) return null;

  return (
    <div className="edit-panel">
      <div className="panel-header">
        <h3>Edit {selectedComponent.type}</h3>
        <button onClick={onClose} className="close-btn">&times;</button>
      </div>

      <div className="panel-content">
        {/* Text Block Editing */}
        {selectedComponent.type === 'text' && (
          <div className="style-section">
            <h4>Text Settings</h4>
            <div className="form-group">
              <label>Content</label>
              <textarea
                name="content"
                value={localState.content || ''}
                onChange={handleChange}
                rows="5"
              />
            </div>
            <div className="form-group">
              <label>Font Size</label>
              <input
                type="range"
                min="12"
                max="50"
                value={parseInt(localState.styles?.fontSize) || 16}
                onChange={(e) => handleStyleChange('fontSize', `${e.target.value}px`)}
              />
              <span>{parseInt(localState.styles?.fontSize) || 16}px</span>
            </div>
            <div className="form-group">
              <label>Text Color</label>
              <input
                type="color"
                value={localState.styles?.color || '#000000'}
                onChange={(e) => handleStyleChange('color', e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Image Editing */}
       
        {selectedComponent.type === 'image' && (
  <div className="style-section">
    <h4>Image Settings</h4>
    <div className="form-group">
      <label>Upload Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              handleChange({ 
                target: { 
                  name: 'src', 
                  value: event.target.result 
                } 
              });
            };
            reader.readAsDataURL(file);
          }
        }}
      />
    </div>
    {/* Keep existing border radius control */}
  </div>
)}
        {/* Map Editing */}
        {selectedComponent.type === 'map' && (
          <div className="style-section">
            <h4>Map Settings</h4>
            <div className="form-group">
              <label>Latitude (-90 to 90)</label>
              <input
                type="number"
                step="any"
                name="lat"
                value={localState.lat || ''}
                onChange={(e) => {
                  const val = Math.max(-90, Math.min(90, parseFloat(e.target.value)));
                  handleChange({ target: { name: 'lat', value: isNaN(val) ? '' : val } });
                }}
              />
            </div>
            <div className="form-group">
              <label>Longitude (-180 to 180)</label>
              <input
                type="number"
                step="any"
                name="lng"
                value={localState.lng || ''}
                onChange={(e) => {
                  const val = Math.max(-180, Math.min(180, parseFloat(e.target.value)));
                  handleChange({ target: { name: 'lng', value: isNaN(val) ? '' : val } });
                }}
              />
            </div>
          </div>
        )}

        {/* Header Editing */}
        {selectedComponent.type === 'header' && (
          <div className="style-section">
            <h4>Header Settings</h4>
            <div className="form-group">
              <label>Header Text</label>
              <input
                type="text"
                name="content"
                value={localState.content || ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Background Colors</label>
              <div className="color-group">
                <input
                  type="color"
                  value={localState.styles?.background?.split(',')[0]?.replace('linear-gradient(135deg, ', '') || '#6366f1'}
                  onChange={(e) => handleStyleChange(
                    'background',
                    `linear-gradient(135deg, ${e.target.value}, ${localState.styles?.background?.split(',')[1] || '#a855f7'})`
                  )}
                />
                <input
                  type="color"
                  value={localState.styles?.background?.split(',')[1]?.replace(')', '') || '#a855f7'}
                  onChange={(e) => handleStyleChange(
                    'background',
                    `linear-gradient(135deg, ${localState.styles?.background?.split(',')[0]?.replace('linear-gradient(135deg, ', '') || '#6366f1'}, ${e.target.value})`
                  )}
                />
              </div>
            </div>
          </div>
        )}

        {/* Button Editing */}
        {selectedComponent.type === 'button' && (
          <div className="style-section">
            <h4>Button Settings</h4>
            <div className="form-group">
              <label>Button Text</label>
              <input
                type="text"
                name="label"
                value={localState.label || ''}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Link URL</label>
              <input
                type="url"
                name="link"
                value={localState.link || ''}
                onChange={handleChange}
                placeholder="https://example.com"
              />
            </div>
            <div className="form-group">
              <label>Background Color</label>
              <input
                type="color"
                value={localState.styles?.backgroundColor || '#6366f1'}
                onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
              />
            </div>
          </div>
        )}

        <button className="save-btn" onClick={handleSubmit}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditPanel;