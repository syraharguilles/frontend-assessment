import React, { useContext, useState } from 'react';
import ProjectRow from './ProjectRow';
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
import { ColumnHeadersContext } from '../../context/ColumnHeadersContext';

const ProjectTable = ({ projects, onEdit }) => {
  // Get column headers and updateHeader from the ColumnHeadersContext
  const { columnHeaders, updateHeader } = useContext(ColumnHeadersContext);

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
            <ProjectRow key={project.id} project={project} onEdit={onEdit} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectTable;
