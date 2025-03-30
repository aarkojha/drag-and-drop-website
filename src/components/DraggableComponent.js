import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableComponent = ({ type, icon, label }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'component',
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  return (
    <div 
      ref={drag}
      className="draggable-component"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="component-icon">{icon}</div>
      <div className="component-label">{label}</div>
    </div>
  );
};

export default DraggableComponent;