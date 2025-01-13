import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import ProjectDetailsReadOnly from './ProjectDetails.jsx';
import { ProjectsContext } from '../../context/ProjectsContext.jsx';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, fetchProjects, loading } = useContext(ProjectsContext);

  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const existingProject = projects.find((p) => p.id == id);
        if (existingProject) {
          setProject(existingProject);
        } else {
          await fetchProjects();
          const fetchedProject = projects.find((p) => p.id == id);
          if (fetchedProject) {
            setProject(fetchedProject);
          } else {
            throw new Error('Project not found.');
          }
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProjectDetails();
  }, [id, projects, fetchProjects]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!project) return <div>No project data available.</div>; // Handle null project

  return (
    <div style={{  maxWidth: { xs: '100%', sm: '100%' } }}>
      <Typography variant="h5" component="div" sx={{ flexGrow: 1, marginBottom: 3 }}>
        Project Details
      </Typography>
      <ProjectDetailsReadOnly
        project={project}
        onEdit={() => navigate(`/projects/${id}/edit`)}
        onBack={() => navigate('/projects')}
      />
    </div>
  );
};

export default ProjectDetails;
