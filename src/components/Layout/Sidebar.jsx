import React, { useContext } from 'react';
import { ProjectsContext } from '../../context/ProjectsContext.jsx';
import { ColumnHeadersContext } from '../../context/ColumnHeadersContext.jsx';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const SideBar = () => {
  const { projects } = useContext(ProjectsContext);
  const { columnHeaders } = useContext(ColumnHeadersContext);

  // Use the column name for Favorites dynamically
  const favoritesColumnName = columnHeaders?.favorites || 'Favorites';

  // Filter projects to only display those marked as favorites
  const favoriteProjects = projects.filter((project) => project.favorites);

  return (
    <Box
      sx={{
        width: { xs: '100%', sm: '250px' },
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
        {favoritesColumnName} {/* Use dynamic column name */}
      </Typography>
      {favoriteProjects.length === 0 ? (
        <Typography>No favorite projects.</Typography>
      ) : (
        <List>
          {favoriteProjects.map((project) => (
            <ListItem key={project.id} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Link
                    to={`/projects/${project.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <Typography>{project.name}</Typography>
              </Link>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default SideBar;