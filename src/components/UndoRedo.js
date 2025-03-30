import React, { useContext } from 'react';
import { ComponentContext } from '../contexts/ComponentContext';

const UndoRedo = () => {
  const { undo, redo, historyIndex, history } = useContext(ComponentContext);

  return (
    <div className="undo-redo-buttons">
      <button 
        onClick={undo} 
        disabled={historyIndex === 0}
      >
        ↺ Undo
      </button>
      <button 
        onClick={redo} 
        disabled={historyIndex === history.length - 1}
      >
        ↻ Redo
      </button>
    </div>
  );
};

export default UndoRedo;