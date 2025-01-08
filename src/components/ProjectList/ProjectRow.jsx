import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';

const ProjectRow = ({ project, onEdit }) => {
  return (
    <TableRow>
      <TableCell>{project.id}</TableCell>
      <TableCell>{project.name}</TableCell>
      <TableCell>{project.description}</TableCell>
      <TableCell>{project.startDate}</TableCell>
      <TableCell>{project.endDate}</TableCell>
      <TableCell>{project.manager}</TableCell>
      <TableCell>{project.favorites === true ? 'Yes' : 'No'}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onEdit(project.id)}
        >
          Edit
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ProjectRow;
