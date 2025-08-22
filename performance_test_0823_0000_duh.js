// 代码生成时间: 2025-08-23 00:00:36
const express = require('express');
const { performance } = require('perf_hooks');
const app = express();
const port = 3000;

// Middleware to record the start time of each request
app.use((req, res, next) => {
  console.log('Request received at:', new Date().toISOString());
  req.start = performance.now();
  next();
});

// Route to perform a simple performance test
app.get('/test', (req, res) => {
  try {
    // Simulate some work
    const result = performWork();
    // Calculate the elapsed time
    const elapsedTime = performance.now() - req.start;
    // Respond with the result and elapsed time
    res.json({
      result,
      elapsedTime: `${elapsedTime.toFixed(2)} ms`
    });
  } catch (error) {
    // Handle any errors that occur during the performance test
    console.error('Error during performance test:', error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});

// Simulated work function
function performWork() {
  // Perform some time-consuming task
  let sum = 0;
  for (let i = 0; i < 1e6; i++) {
    sum += i;
  }
  return sum;
}

// Start the server
app.listen(port, () => {
  console.log(`Performance test server listening at http://localhost:${port}`);
});
