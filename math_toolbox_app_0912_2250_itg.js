// 代码生成时间: 2025-09-12 22:50:31
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Math operations
const mathOperations = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => {
    if (b === 0) throw new Error('Cannot divide by zero');
    return a / b;
  },
  power: (a, b) => Math.pow(a, b)
};

// Route to perform math operations
app.post('/math', (req, res) => {
  const { operation, value1, value2 } = req.body;

  // Error handling if required parameters are missing
  if (!operation || !value1 || !value2) {
    return res.status(400).json({
      error: 'Missing required parameters'
    });
  }

  // Check if the operation is valid
  if (!mathOperations[operation]) {
    return res.status(404).json({
      error: 'Operation not supported'
    });
  }

  try {
    const result = mathOperations[operation](value1, value2);
    res.status(200).json({
      result: result
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Math Toolbox App listening at http://localhost:${port}`);
});

// Module documentation
/**
 * @module MathToolboxApp
 * Math operations REST API
 *
 * @property {Object} mathOperations - Object containing math operations
 * @property {function} add - Adds two numbers
 * @property {function} subtract - Subtracts two numbers
 * @property {function} multiply - Multiplies two numbers
 * @property {function} divide - Divides two numbers
 * @property {function} power - Calculates the power of two numbers
 *
 * @property {function} startServer - Starts the Express server
 */