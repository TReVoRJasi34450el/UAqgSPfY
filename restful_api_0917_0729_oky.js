// 代码生成时间: 2025-09-17 07:29:39
const express = require('express');
const app = express();
const port = 3000;

// Middleware for parsing request bodies
app.use(express.json());

// Array to simulate a database
let resources = [];

// Helper function to generate a unique ID for each resource
const generateId = () => `id_${Math.floor(Math.random() * 10000)}`;

// POST /resources - Create a new resource
app.post('/resources', (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }
  const resource = { id: generateId(), name, description };
  resources.push(resource);
  res.status(201).json(resource);
});

// GET /resources - Get all resources
app.get('/resources', (req, res) => {
  res.json(resources);
});

// GET /resources/:id - Get a single resource by ID
app.get('/resources/:id', (req, res) => {
  const resource = resources.find(r => r.id === req.params.id);
  if (!resource) {
    return res.status(404).json({ error: 'Resource not found' });
  }
  res.json(resource);
});

// PUT /resources/:id - Update a resource by ID
app.put('/resources/:id', (req, res) => {
  const resource = resources.find(r => r.id === req.params.id);
  if (!resource) {
    return res.status(404).json({ error: 'Resource not found' });
  }
  const { name, description } = req.body;
  resource.name = name;
  resource.description = description;
  res.json(resource);
});

// DELETE /resources/:id - Delete a resource by ID
app.delete('/resources/:id', (req, res) => {
  const index = resources.findIndex(r => r.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Resource not found' });
  }
  resources.splice(index, 1);
  res.status(204).end(); // 204 No Content
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});