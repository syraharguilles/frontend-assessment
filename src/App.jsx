import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ProjectListPage from './pages/ProjectListPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ProjectsProvider from './context/ProjectsContext';
import ColumnHeaders from './context/ColumnHeadersContext';

const App = () => {
  return (
    
      <ProjectsProvider>
        <ColumnHeaders>
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Layout>
              <Routes>
                {/* Project List Page */}
                <Route path="/" element={<ProjectListPage />} />

                {/* Project Detail Page */}
                <Route path="/projects/:id" element={<ProjectDetailPage />} />
              </Routes>
            </Layout>
          </Router>
        </ColumnHeaders>
      </ProjectsProvider>
    
    
  );
};

export default App;