// 代码生成时间: 2025-09-04 16:43:57
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON and URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Sample data
const items = [1, 2, 3, 4, 5];

// GET endpoint to retrieve all items
app.get('/api/items', (req, res) => {
  res.status(200).json({
    data: items,
    message: 'Items retrieved successfully'
  });
});

// GET endpoint to retrieve a single item by id
app.get('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i === id);
  if (!item) {
    return res.status(404).json({
      message: 'Item not found'
    });
  }
  res.status(200).json({
    data: item,
    message: 'Item retrieved successfully'
  });
});

// POST endpoint to create a new item
app.post('/api/items', (req, res) => {
  const newItem = req.body;
  if (!newItem) {
    return res.status(400).json({
      message: 'Invalid input'
    });
  }
  items.push(newItem);
  res.status(201).json({
    data: newItem,
    message: 'Item created successfully'
  });
});

// PUT endpoint to update an existing item by id
app.put('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(i => i === id);
  if (itemIndex === -1) {
    return res.status(404).json({
      message: 'Item not found'
    });
  }
  const updatedItem = req.body;
  items[itemIndex] = updatedItem;
  res.status(200).json({
    data: updatedItem,
    message: 'Item updated successfully'
  });
});

// DELETE endpoint to delete an item by id
app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = items.length;
  items = items.filter(i => i !== id);
  if (items.length === initialLength) {
    return res.status(404).json({
      message: 'Item not found'
    });
  }
  res.status(200).json({
    message: 'Item deleted successfully'
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});