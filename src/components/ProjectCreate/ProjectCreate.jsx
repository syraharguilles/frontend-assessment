import React, { useState } from 'react';
import { TextField, Button, Box, FormControlLabel, Checkbox, Typography } from '@mui/material';

const ProjectForm = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    id: '', // Ensure id is treated as a string
    name: '',
    description: '', // Added description field
    startDate: '',
    endDate: '',
    manager: '',
    favorites: false, // Default value
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setFormData((prev) => ({ ...prev, favorites: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure the `id` remains a string when passed to the onSave function
      await onSave({
        ...formData,
        id: String(formData.id).trim(), // Convert id to a trimmed string
      });
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
        maxWidth: { xs: '100%', sm: '100%' },
        padding: { xs: 2, sm: 4 },
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
        fullWidth
        helperText="Enter a unique identifier (can be a string)."
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
          fullWidth={{ xs: true, sm: false }}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onClose}
          fullWidth={{ xs: true, sm: false }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default ProjectForm;
