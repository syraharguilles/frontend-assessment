import React from 'react';
import { useParams } from 'react-router-dom';
import ProjectDetails from '../components/ProjectDetails';

const ProjectDetailPage = () => {
  const { id } = useParams();

  return (
    <div>
      <ProjectDetails projectId={id} />
    </div>
  );
};

export default ProjectDetailPage;