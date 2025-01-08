import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectTable from './ProjectTable';
import Typography from '@mui/material/Typography';
import { ProjectsContext } from '../../context/ProjectsContext';

const ProjectList = () => {
  const navigate = useNavigate();
  const { projects, loading, error, fetchProjects } = useContext(ProjectsContext);

  const handleEdit = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={fetchProjects} disabled={loading}>
          {loading ? 'Retrying...' : 'Retry'}
        </button>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
        Project List
      </Typography>
      <ProjectTable projects={projects} onEdit={handleEdit} />
    </div>
  );
};

export default ProjectList;