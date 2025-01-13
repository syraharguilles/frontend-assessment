import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box, Grid } from '@mui/material';
import ProjectTable from './ProjectTable';
import { ProjectsContext } from '../../context/ProjectsContext.jsx';

const ProjectList = () => {
  const navigate = useNavigate();
  const { projects, loading, error, fetchProjects } = useContext(ProjectsContext);

  const handleCreateProject = () => {
    navigate('/projects/new');
  };

  const handleEdit = (projectId) => {
    navigate(`/projects/${projectId}/edit`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <Box>
        <Typography variant="body1" color="error">
          Error: {error}
        </Typography>
        <Button onClick={fetchProjects} disabled={loading}>
          {loading ? 'Retrying...' : 'Retry'}
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2}>
        {/* Left Column */}
        <Grid item xs={12} md={8}>
          <Typography variant="h5" component="div" sx={{ marginBottom: 2 }}>
            Project List
          </Typography>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateProject}
            sx={{ marginBottom: 2 }}
          >
            Create Project
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ProjectTable projects={projects} onEdit={handleEdit} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectList;
