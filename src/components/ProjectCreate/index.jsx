import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import ProjectForm from '../ProjectCreate/ProjectCreate';
import { ProjectsContext } from '../../context/ProjectsContext.jsx';

const ProjectCreate = () => {
  const { addProject } = useContext(ProjectsContext);
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const handleSave = async (newProject) => {
    try {
      await addProject(newProject);
      navigate('/projects'); // Redirect to Project List after saving
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Typography variant="h5" component="div" sx={{ flexGrow: 1, marginBottom: 2 }}>
        Create New Project
      </Typography>
      {error && (
        <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
          {error}
        </Typography>
      )}
      <ProjectForm onSave={handleSave} onClose={() => navigate('/projects')} />
    </div>
  );
};

export default ProjectCreate;
