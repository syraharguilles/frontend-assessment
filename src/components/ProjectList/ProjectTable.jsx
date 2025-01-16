import React, { useContext, useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
  Tooltip,
  IconButton,
  TableContainer,
  Paper,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ColumnHeadersContext } from '../../context/ColumnHeadersContext.jsx';
import { ProjectsContext } from '../../context/ProjectsContext.jsx';

const ProjectTable = ({ onEdit }) => {
  // Get column headers and updateHeader from the ColumnHeadersContext
  const { columnHeaders, updateHeader } = useContext(ColumnHeadersContext);
  const { projects, updateProject } = useContext(ProjectsContext);

  // State to track which header is being edited
  const [editingHeader, setEditingHeader] = useState(null);
  const [tempHeader, setTempHeader] = useState(''); // Temporary state for header being edited

  // Handle header click to start editing
  const handleHeaderClick = (headerKey) => {
    setEditingHeader(headerKey); // Set the current header being edited
    setTempHeader(columnHeaders[headerKey]); // Set the temp header value to the current header text
  };

  // Handle header name change
  const handleHeaderChange = (e) => {
    setTempHeader(e.target.value); // Update the temp header value
  };

  // Save the header name
  const handleHeaderSave = () => {
    if (editingHeader) {
      updateHeader(editingHeader, tempHeader); // Update the header in the context
      setEditingHeader(null); // Exit edit mode
    }
  };

  // Toggle project favorite status
  const handleToggleFavorite = async (projectId, isFavorite) => {
    try {
      const updatedProject = {
        ...projects.find((p) => p.id === projectId),
        favorites: isFavorite,
      };
      await updateProject(projectId, updatedProject); // Update the project in the backend
    } catch (err) {
      console.error('Error updating favorite:', err);
    }
  };

  return (
    <TableContainer component={Paper} sx={{ maxHeight: '75vh', overflow: 'auto' }}>
      <Table stickyHeader>
        {/* Editable Table Header */}
        <TableHead>
          <TableRow>
            {Object.keys(columnHeaders).map((key) => (
              <TableCell key={key} align="center">
                {editingHeader === key ? (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      value={tempHeader}
                      onChange={handleHeaderChange}
                      size="small"
                      fullWidth
                    />
                    <Button
                      onClick={handleHeaderSave}
                      size="small"
                      variant="contained"
                      color="primary"
                      style={{ marginLeft: '8px' }}
                    >
                      Save
                    </Button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Tooltip title={`Edit ${columnHeaders[key]}`} placement="top">
                      <IconButton
                        size="small"
                        onClick={() => handleHeaderClick(key)}
                        sx={{ marginRight: 0.5, padding: 0 }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <span style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>{columnHeaders[key]}</span>
                  </div>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.id}</TableCell>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.startDate}</TableCell>
              <TableCell>{project.endDate}</TableCell>
              <TableCell>{project.manager}</TableCell>
              <TableCell align="center">
                <Tooltip
                  title={project.favorites ? 'Remove from Favorites' : 'Add to Favorites'}
                  placement="top"
                >
                  <IconButton
                    onClick={() => handleToggleFavorite(project.id, !project.favorites)}
                    color={project.favorites ? 'primary' : 'default'}
                  >
                    {project.favorites ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => onEdit(project.id)}
                  size="small"
                  variant="contained"
                  color="primary"
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectTable;
