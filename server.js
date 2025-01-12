const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock data
let projects = [
  { id: 1, name: 'Project A', startDate: '2023-01-01', endDate: '2023-12-31', manager: 'John Doe', favorites: false },
  { id: 2, name: 'Project B', startDate: '2023-06-01', endDate: '2023-12-31', manager: 'Jane Smith', favorites: true },
];

let columnHeaders = {
  id: 'Project ID',
  name: 'Project Name',
  startDate: 'Start Date',
  endDate: 'End Date',
  manager: 'Project Manager',
  favorites: 'Favorites',
  actions: 'Edit',
};

// Routes
app.get('/projects', (req, res) => res.json(projects));
app.post('/projects', (req, res) => {
  const newProject = { ...req.body, id: projects.length + 1 };
  projects.push(newProject);
  res.json(newProject);
});
app.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const updatedProject = req.body;
  projects = projects.map((project) => (project.id === parseInt(id) ? updatedProject : project));
  res.json(updatedProject);
});
app.delete('/projects/:id', (req, res) => {
  const { id } = req.params;
  projects = projects.filter((project) => project.id !== parseInt(id));
  res.json({ message: 'Project deleted' });
});

app.get('/columnHeaders', (req, res) => res.json(columnHeaders));
app.put('/columnHeaders', (req, res) => {
  columnHeaders = { ...columnHeaders, ...req.body };
  res.json(columnHeaders);
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});