import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import ProjectListPage from './pages/ProjectListPage';
import ProjectCreatePage from './pages/ProjectCreatePage';
import ProjectEditPage from './pages/ProjectEditPage.jsx';
import ProjectDetailPage from './pages/ProjectDetailPage.jsx';
import ProjectsProvider from './context/ProjectsContext.jsx';
import ColumnHeadersProvider from './context/ColumnHeadersContext.jsx';

const App = () => {
  return (
    
      <ProjectsProvider>
        <ColumnHeadersProvider>
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Layout>
              <Routes>
                {/* Project List Page */}
                <Route path="/" element={<Navigate to="/projects" replace />} />
                <Route path="/projects" element={<ProjectListPage />} />

                {/* Project Create Page */}
                <Route path="/projects/new" element={<ProjectCreatePage />} />

                {/* Project Detail Page */}
                <Route path="/projects/:id" element={<ProjectDetailPage />} />

                {/* Project Edit Page */}
                <Route path="/projects/:id/edit" element={<ProjectEditPage />} />
              </Routes>
            </Layout>
          </Router>
        </ColumnHeadersProvider>
      </ProjectsProvider>
    
    
  );
};

export default App;