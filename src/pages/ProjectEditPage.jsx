import React from 'react';
import { useParams } from 'react-router-dom';
import ProjectDetails from '../components/ProjectEdit';

const ProjectDetailPage = () => {
  const { id } = useParams();

  return (
    <div>
      <ProjectDetails projectId={id} />
    </div>
  );
};

export default ProjectDetailPage;