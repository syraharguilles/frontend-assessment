import { useState, useCallback } from 'react';
import {
  fetchProjects as fetchProjectsAPI,
  createProject,
  updateProject,
  deleteProject,
} from '../services/api';

const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleError = (err) => {
    setError(err.message);
    console.error('Error:', err);
  };

  const fetchProjects = useCallback(async () => {
    console.log('Fetching projects...');
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProjectsAPI();
      console.log('Fetched projects data:', data);
      setProjects(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addProject = async (newProject) => {
    try {
      const createdProject = await createProject(newProject);
      setProjects((prev) => [...prev, createdProject]);
      return createdProject;
    } catch (err) {
      handleError(err);
    }
  };

  const updateProjectDetails = async (id, updatedProject) => {
    try {
      const updated = await updateProject(id, updatedProject);
      setProjects((prev) =>
        prev.map((project) => (project.id === id ? updated : project))
      );
      return updated;
    } catch (err) {
      handleError(err);
    }
  };

  const removeProject = async (id) => {
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((project) => project.id !== id));
      return id;
    } catch (err) {
      handleError(err);
    }
  };

  return {
    projects,
    loading,
    error,
    fetchProjects,
    addProject,
    updateProject: updateProjectDetails,
    deleteProject: removeProject,
  };
};

export default useProjects;