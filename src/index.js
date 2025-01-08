// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import { ThemeProvider } from '@mui/material/styles';
// import theme from './styles/theme'; // Your custom Material UI theme
// // import './styles/global.css'; // Optional global styles

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   // <React.StrictMode>
//         <ThemeProvider theme={theme}>
//       <App />
//     </ThemeProvider>
//   // </React.StrictMode>
// );

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