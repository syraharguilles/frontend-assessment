import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, FormControlLabel, Checkbox, Typography } from '@mui/material';

const ProjectForm = ({ project, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    manager: '',
    favorites: false, // Changed to boolean
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (project) {
      setFormData({
        id: project.id,
        name: project.name,
        description: project.description,
        startDate: project.startDate,
        endDate: project.endDate,
        manager: project.manager,
        favorites: project.favorites || false, // Default to false if not provided
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormData((prev) => ({ ...prev, favorites: checked })); // Update favorites field
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSave(formData);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: { xs: '100%', sm: '100%' }, // Full width on small screens, constrained on larger screens
        padding: { xs: 2, sm: 4 }, // Padding adjusts for screen size
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      {error && (
        <Typography variant="body2" color="error" sx={{ textAlign: 'center' }}>
          {error}
        </Typography>
      )}
      <TextField
        label="Project ID"
        name="id"
        value={formData.id}
        onChange={handleChange}
        disabled
        fullWidth
      />
      <TextField
        label="Project Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        fullWidth
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
      />
      <TextField
        label="Start Date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        type="date"
        InputLabelProps={{ shrink: true }}
        required
        fullWidth
      />
      <TextField
        label="End Date"
        name="endDate"
        value={formData.endDate}
        onChange={handleChange}
        type="date"
        InputLabelProps={{ shrink: true }}
        required
        fullWidth
      />
      <TextField
        label="Project Manager"
        name="manager"
        value={formData.manager}
        onChange={handleChange}
        required
        fullWidth
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.favorites}
            onChange={handleCheckboxChange}
            color="primary"
          />
        }
        label="Favorite"
        sx={{ marginLeft: 0 }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth={{ xs: true, sm: false }} // Full-width button on small screens
        >
          Save
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onClose}
          fullWidth={{ xs: true, sm: false }} // Full-width button on small screens
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default ProjectForm;
