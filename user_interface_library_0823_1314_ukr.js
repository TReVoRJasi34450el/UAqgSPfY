// 代码生成时间: 2025-08-23 13:14:27
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Array to hold user interface components
const components = [];

// Helper function to create a new component
function createComponent(name, type) {
  // Check if the component already exists
  const existingComponent = components.find(comp => comp.name === name);
  if (existingComponent) {
    throw new Error('Component already exists.');
  }

  // Create a new component
  const newComponent = {
    id: components.length + 1,
    name: name,
    type: type
  };
  components.push(newComponent);
  return newComponent;
}

// Helper function to get all components
function getAllComponents() {
  return components;
}

// Endpoint to create a new component
app.post('/components', (req, res) => {
  try {
    const { name, type } = req.body;
    const component = createComponent(name, type);
    res.status(201).json(component);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Endpoint to get all components
app.get('/components', (req, res) => {
  res.json(getAllComponents());
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'An internal server error occurred.' });
});

// Start the server
app.listen(port, () => {
  console.log(`User Interface Library running on http://localhost:${port}`);
});

// Comments:
// - The 'createComponent' function creates a new UI component and adds it to the 'components' array.
// - The 'getAllComponents' function returns all UI components.
// - The POST endpoint '/components' allows creation of new UI components.
// - The GET endpoint '/components' retrieves all UI components.
// - The error handling middleware catches any server errors and sends a 500 status code.
// - The server is set to listen on port 3000.
