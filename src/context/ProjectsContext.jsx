import React, { createContext, useEffect, useCallback, useMemo } from 'react';
import useProjects from '../hooks/useProjects';

export const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const {
    projects,
    loading,
    error,
    fetchProjects: fetchProjectsRaw,
    addProject,
    updateProject,
    deleteProject,
  } = useProjects();

  const fetchProjects = useCallback(() => {
    fetchProjectsRaw();
  }, [fetchProjectsRaw]);

  useEffect(() => {
    fetchProjects(); // Call fetchProjects once when the provider mounts
  }, [fetchProjects]);

  const contextValue = useMemo(() => ({
    projects,
    loading,
    error,
    fetchProjects,
    addProject,
    updateProject,
    deleteProject,
  }), [projects, loading, error, fetchProjects, addProject, updateProject, deleteProject]);

  return (
    <ProjectsContext.Provider value={contextValue}>
      {children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsProvider;