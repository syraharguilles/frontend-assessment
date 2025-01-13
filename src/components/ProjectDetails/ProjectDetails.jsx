import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const ProjectDetailsReadOnly = ({ project, onEdit, onBack }) => {
  if (!project) {
    return (
      <Typography variant="body1" color="textSecondary">
        Loading project details...
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        padding: { xs: 2, sm: 4 }, // Responsive padding
        maxWidth: { xs: '100%', sm: '100%' }, // Full width on small screens, constrained on larger screens
        backgroundColor: '#f9f9f9',
        borderRadius: 2,
        boxShadow: 3,
        margin: '0 auto',
      }}
    >
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="subtitle1" color="textSecondary">
          Project ID
        </Typography>
        <Typography variant="body1">{project.id}</Typography>
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="subtitle1" color="textSecondary">
          Project Name
        </Typography>
        <Typography variant="body1">{project.name}</Typography>
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="subtitle1" color="textSecondary">
          Description
        </Typography>
        <Typography variant="body1">{project.description || 'No description provided'}</Typography>
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="subtitle1" color="textSecondary">
          Start Date
        </Typography>
        <Typography variant="body1">{project.startDate}</Typography>
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="subtitle1" color="textSecondary">
          End Date
        </Typography>
        <Typography variant="body1">{project.endDate}</Typography>
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="subtitle1" color="textSecondary">
          Project Manager
        </Typography>
        <Typography variant="body1">{project.manager}</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={onEdit}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onBack}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default ProjectDetailsReadOnly;
