import React from 'react';
import { useDrop } from 'react-dnd';
import MapComponent from './MapComponent';

const Canvas = ({ components, onDrop, updateComponent, setSelectedComponent }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'component',
    drop: (item) => onDrop(item.type),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }));

  const renderComponent = (component) => {
    switch(component.type) {
      case 'text':
        return (
          <div 
            className="editable-text"
            style={component.styles}
            onDoubleClick={() => setSelectedComponent(component)}
          >
            {component.content}
          </div>
        );

      case 'image':
        return (
          <div className="image-component">
            <img 
              src={component.src} 
              alt="User content" 
              style={component.styles}
              onDoubleClick={() => setSelectedComponent(component)}
            />
          </div>
        );

      case 'map':
        return (
          <div 
            className="map-wrapper"
            onDoubleClick={() => setSelectedComponent(component)}
            style={{ height: component.styles?.height || '400px' }}
          >
            <MapComponent
              lat={component.lat}
              lng={component.lng}
            />
          </div>
        );

      case 'header':
        return (
          <header 
            className="canvas-header"
            style={component.styles}
            onDoubleClick={() => setSelectedComponent(component)}
          >
            <h1>{component.content}</h1>
          </header>
        );

      case 'button':
        return (
          <button 
            className="interactive-button"
            style={component.styles}
            onClick={() => component.link && window.open(component.link, '_blank')}
            onDoubleClick={() => setSelectedComponent(component)}
          >
            {component.label}
          </button>
        );

      default:
        return (
          <div 
            className="default-component"
            onDoubleClick={() => setSelectedComponent(component)}
          >
            {component.type}
          </div>
        );
    }
  };

  return (
    <div 
      ref={drop}
      className="canvas-stage"
      style={{ 
        backgroundColor: isOver ? '#f8fbff' : '#ffffff',
        borderColor: isOver ? '#90cdf4' : '#e2e8f0'
      }}
    >
      {components.map((component) => (
        <div 
          key={component.id}
          className={`canvas-element ${component.locked ? 'base-template' : ''}`}
        >
          {renderComponent(component)}
          {component.locked && <div className="template-badge">Base Template</div>}
        </div>
      ))}
    </div>
  );
};

export default Canvas;