// 代码生成时间: 2025-08-27 17:02:52
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse request bodies
app.use(express.json());

// A simple in-memory inventory store
let inventory = [];

// Add a new item to the inventory
app.post('/inventory', (req, res) => {
  const { name, quantity, price } = req.body;
  if (!name || !quantity || !price) {
    return res.status(400).json({
      error: 'Missing required item details'
    });
  }
  const item = { name, quantity, price };
  inventory.push(item);
  res.status(201).json({
    message: 'Item added to inventory',
    item
  });
});

// Get all items from the inventory
app.get('/inventory', (req, res) => {
  res.json(inventory);
});

// Get a single item from the inventory by name
app.get('/inventory/:name', (req, res) => {
  const item = inventory.find(i => i.name === req.params.name);
  if (!item) {
    return res.status(404).json({
      error: 'Item not found'
    });
  }
  res.json(item);
});

// Update an item in the inventory
app.put('/inventory/:name', (req, res) => {
  const { name, quantity, price } = req.body;
  if (!name || !quantity || !price) {
    return res.status(400).json({
      error: 'Missing required item details'
    });
  }
  const itemIndex = inventory.findIndex(i => i.name === req.params.name);
  if (itemIndex === -1) {
    return res.status(404).json({
      error: 'Item not found'
    });
  }
  inventory[itemIndex] = { name, quantity, price };
  res.json({
    message: 'Item updated',
    item: inventory[itemIndex]
  });
});

// Delete an item from the inventory
app.delete('/inventory/:name', (req, res) => {
  const itemIndex = inventory.findIndex(i => i.name === req.params.name);
  if (itemIndex === -1) {
    return res.status(404).json({
      error: 'Item not found'
    });
  }
  inventory.splice(itemIndex, 1);
  res.json({
    message: 'Item deleted'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server
app.listen(port, () => {
  console.log(`Inventory management system listening at http://localhost:${port}`);
});