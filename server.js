import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// File path to db.json
const dbPath = path.join(__dirname, 'db.json');

// Function to read data from db.json
const readDb = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to read database:', error.message);
    return { projects: [], columnHeaders: {} };
  }
};

// Function to write data to db.json
const writeDb = (data) => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to write to database:', error.message);
  }
};

// Load initial data
let { projects, columnHeaders } = readDb();

// Validation Middleware
const validateProject = (req, res, next) => {
  const { name, startDate, endDate, manager } = req.body;
  if (!name || !startDate || !endDate || !manager) {
    return res.status(400).json({ message: 'Missing required fields: name, startDate, endDate, manager are mandatory.' });
  }
  next();
};

// Routes
app.get('/projects', (req, res) => {
  try {
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch projects', error: error.message });
  }
});

app.post('/projects', validateProject, (req, res) => {
  try {
    // Ensure the ID is provided in the request body as a string
    if (!req.body.id || typeof req.body.id !== 'string') {
      return res.status(400).json({ message: 'Invalid or missing project ID. It must be a string.' });
    }

    const newProject = { ...req.body };
    
    // Check if the ID is unique
    const existingProject = projects.find((p) => p.id === newProject.id);
    if (existingProject) {
      return res.status(400).json({ message: `Project ID "${newProject.id}" already exists.` });
    }

    projects.push(newProject); // Add the new project
    writeDb({ projects, columnHeaders }); // Persist to db.json
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create project', error: error.message });
  }
});

app.put('/projects/:id', validateProject, (req, res) => {
  try {
    const { id } = req.params;
    const updatedProject = req.body;

    // Find the index of the project to update
    const projectIndex = projects.findIndex((project) => project.id == id);
    if (projectIndex === -1) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Update the project
    projects[projectIndex] = updatedProject;
    writeDb({ projects, columnHeaders });
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update project', error: error.message });
  }
});

app.delete('/projects/:id', (req, res) => {
  try {
    const { id } = req.params;
    const projectIndex = projects.findIndex((project) => project.id == id);

    if (projectIndex === -1) {
      return res.status(404).json({ message: 'Project not found' });
    }

    projects.splice(projectIndex, 1);
    writeDb({ projects, columnHeaders });
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete project', error: error.message });
  }
});

app.get('/columnHeaders', (req, res) => {
  try {
    res.json(columnHeaders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch column headers', error: error.message });
  }
});

app.put('/columnHeaders', (req, res) => {
  try {
    columnHeaders = { ...columnHeaders, ...req.body };
    writeDb({ projects, columnHeaders });
    res.json(columnHeaders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update column headers', error: error.message });
  }
});

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.message);
  res.status(500).json({ message: 'An unexpected error occurred', error: err.message });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
