import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import ProjectForm from './ProjectForm';
import { ProjectsContext } from '../../context/ProjectsContext';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, fetchProjects, updateProject, loading } = useContext(ProjectsContext);

  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const existingProject = projects.find((p) => parseInt(p.id) === parseInt(id));
        if (existingProject) {
          setProject(existingProject);
        } else {
          // Ensure fetchProjects is completed
          await fetchProjects();
          const fetchedProject = projects.find((p) => parseInt(p.id) === parseInt(id));
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

  const handleSave = async (updatedProject) => {
    try {
      await updateProject(updatedProject.id, updatedProject);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading && !project) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
        Edit Project Details
      </Typography>
      <ProjectForm
        projectId={id}
        project={project}
        onSave={handleSave}
        onClose={() => navigate('/')}
      />
    </div>
  );
};

export default ProjectDetails;