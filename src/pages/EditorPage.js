import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { v4 as uuidv4 } from 'uuid';
import { ComponentContext } from '../contexts/ComponentContext';
import Toolbar from '../components/Toolbar';
import Canvas from '../components/Canvas';
import EditPanel from '../components/EditPanel';

const createInitialComponents = (formData) => {
  if (!formData) return [];
  
  return [
    {
      type: 'header',
      id: `header-${uuidv4()}`,
      content: formData.websiteTitle || 'Your Website Title',
      styles: {
        background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
        padding: '4rem 2rem',
        color: 'white'
      },
      locked: true
    },
    {
      type: 'business-info',
      id: `business-${uuidv4()}`,
      content: formData.address,
      locked: true
    }
  ];
};

const EditorPage = () => {
  const location = useLocation();
  const [canvasComponents, setCanvasComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [history, setHistory] = useState([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);

  useEffect(() => {
    if (location.state) {
      const initialComponents = createInitialComponents(location.state);
      setCanvasComponents(initialComponents);
      setHistory([initialComponents]);
    }
  }, [location.state]);

  useEffect(() => {
    const currentState = JSON.stringify(canvasComponents);
    const historyState = JSON.stringify(history[historyIndex]);
    
    if (currentState !== historyState) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(JSON.parse(currentState));
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  }, [canvasComponents]);

  const handleDrop = (type) => {
    const newComponent = {
      type,
      id: uuidv4(),
      ...(type === 'text' && { content: 'New Text', styles: {} }),
      ...(type === 'image' && { src: '', styles: {} }),
      ...(type === 'button' && { label: 'Button', styles: {} }),
      ...(type === 'map' && { lat: 51.505, lng: -0.09 })
    };
    
    setCanvasComponents(prev => [...prev, newComponent]);
  };

  const updateComponent = (componentId, updates) => {
    setCanvasComponents(prevComponents =>
      prevComponents.map(component =>
        component.id === componentId 
          ? { ...component, ...updates }
          : component
      )
    );
  };

  const undo = () => setHistoryIndex(prev => Math.max(prev - 1, 0));
  const redo = () => setHistoryIndex(prev => Math.min(prev + 1, history.length - 1));

  return (
    <ComponentContext.Provider value={{
      components: canvasComponents,
      setComponents: setCanvasComponents,
      undo,
      redo,
      history,
      historyIndex
    }}>
      <DndProvider backend={HTML5Backend}>
        <div className="editor-page">
          <Toolbar />
          <Canvas 
            components={canvasComponents}
            onDrop={handleDrop}
            updateComponent={updateComponent}
            setSelectedComponent={setSelectedComponent}
          />
          <EditPanel
            selectedComponent={selectedComponent}
            updateComponent={updateComponent}
            onClose={() => setSelectedComponent(null)}
          />
        </div>
      </DndProvider>
    </ComponentContext.Provider>
  );
};

export default EditorPage;