import React from 'react';
import { IconButton, TableRow, TableCell, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ProjectsContext } from '../../context/ProjectsContext.jsx';

const ProjectRow = ({ project, onEdit }) => {
  const { toggleFavorite } = useContext(ProjectsContext);

  const handleToggleFavorite = () => {
    toggleFavorite(project.id);
  };

  return (
    <TableRow>
      <TableCell>{project.id}</TableCell>
      <TableCell>{project.name}</TableCell>
      <TableCell>{project.startDate}</TableCell>
      <TableCell>{project.endDate}</TableCell>
      <TableCell>{project.manager}</TableCell>
      <TableCell>
        <IconButton onClick={handleToggleFavorite} size="small">
          {project.favorites ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
      </TableCell>
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
