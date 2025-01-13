import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ProjectsProvider from './context/ProjectsContext.jsx';
import ColumnHeadersProvider from './context/ColumnHeadersContext.jsx'; // Ensure proper naming



const Root = () => (
  <ProjectsProvider>
    <ColumnHeadersProvider>
      <App />
    </ColumnHeadersProvider>
  </ProjectsProvider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);