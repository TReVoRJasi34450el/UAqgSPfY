// 代码生成时间: 2025-09-21 17:05:59
const express = require('express');
const crypto = require('crypto');
# 优化算法效率

// Create an Express application
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Route to calculate hash
app.post('/hash', (req, res) => {
  // Check if the necessary data is provided
  if (!req.body.data) {
    return res.status(400).json({
      error: 'Missing data to hash'
    });
# 添加错误处理
  }

  // Check if the algorithm is provided, if not set default to SHA256
  const algorithm = req.body.algorithm || 'sha256';

  // Calculate hash
  const hash = crypto.createHash(algorithm).update(req.body.data).digest('hex');
# TODO: 优化性能

  // Respond with the calculated hash
  res.json({
    hash: hash,
    algorithm: algorithm
  });
});
# FIXME: 处理边界情况

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'An unexpected error occurred'
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Hash calculator tool running on port ${port}`);
});