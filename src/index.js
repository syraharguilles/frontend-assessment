import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ProjectsProvider from './context/ProjectsContext';
import ColumnHeadersProvider from './context/ColumnHeadersContext'; // Ensure proper naming



const Root = () => (
  <ProjectsProvider>
    <ColumnHeadersProvider>
      <App />
    </ColumnHeadersProvider>
  </ProjectsProvider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);