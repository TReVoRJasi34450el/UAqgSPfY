// 代码生成时间: 2025-08-14 08:57:58
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample inventory data, for demonstration purposes
const inventory = {
  'item1': {
    name: 'Item 1',
    quantity: 10
  },
  'item2': {
    name: 'Item 2',
    quantity: 20
  }
};

// Endpoint to get inventory items
app.get('/inventory', (req, res) => {
  try {
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to add an item to inventory
app.post('/inventory/:itemId', (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  try {
    if (inventory[itemId]) {
      inventory[itemId].quantity += quantity;
      res.status(200).json(inventory[itemId]);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to update item quantity in inventory
app.put('/inventory/:itemId', (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  try {
    if (inventory[itemId]) {
      inventory[itemId].quantity = quantity;
      res.status(200).json(inventory[itemId]);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to delete an item from inventory
app.delete('/inventory/:itemId', (req, res) => {
  const { itemId } = req.params;

  try {
    if (inventory[itemId]) {
      delete inventory[itemId];
      res.status(200).json({ message: 'Item deleted' });
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Inventory management server listening at http://localhost:${port}`);
});