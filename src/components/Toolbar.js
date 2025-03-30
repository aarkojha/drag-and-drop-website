// src/components/Toolbar.js
import React from 'react';
import UndoRedo from './UndoRedo';
import PublishButton from './PublishButton';
import DraggableComponent from './DraggableComponent';

const components = [
  { type: 'header', icon: '📝', label: 'Header' },
  { type: 'text', icon: '✍️', label: 'Text Block' },
  { type: 'image', icon: '🖼️', label: 'Image' },
  { type: 'button', icon: '🛎️', label: 'Button' },
  { type: 'divider', icon: '⏸️', label: 'Divider' },
  { type: 'map', icon: '📍', label: 'Map' },
];

const Toolbar = () => {
  return (
    <div className="toolbar">
      <div className="toolbar-section">
        <h3 className="toolbar-title">Components</h3>
        <div className="components-list">
          {components.map((comp) => (
            <DraggableComponent
              key={comp.type}
              type={comp.type}
              icon={comp.icon}
              label={comp.label}
            />
          ))}
        </div>
      </div>
      
      <div className="toolbar-section">
        <UndoRedo />
        <PublishButton />
      </div>
    </div>
  );
};

export default Toolbar;