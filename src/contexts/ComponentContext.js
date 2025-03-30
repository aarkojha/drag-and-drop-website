import { createContext } from 'react';

export const ComponentContext = createContext({
  components: [],
  setComponents: () => {},
  undo: () => {},
  redo: () => {},
  history: [],
  historyIndex: 0
});