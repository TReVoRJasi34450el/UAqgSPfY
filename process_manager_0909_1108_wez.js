// 代码生成时间: 2025-09-09 11:08:03
const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Endpoint to list all processes
app.get('/api/processes', (req, res) => {
  exec('ps', (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (stderr) {
      return res.status(500).json({ error: stderr });
    }
    res.status(200).json({ processes: stdout });
  });
});

// Endpoint to kill a process by PID
app.delete('/api/process/:pid', (req, res) => {
  const pid = req.params.pid;
  exec(`kill ${pid}`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (stderr) {
      return res.status(500).json({ error: stderr });
    }
    res.status(200).json({ message: 'Process killed successfully' });
  });
});
# 添加错误处理

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
# 增强安全性
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
  console.log(`Process Manager app listening at http://localhost:${port}`);
});

// Documentation
// ============
// The Process Manager is an express app that allows users to view and kill processes.
// It has two endpoints:
// - GET /api/processes: Lists all running processes.
// - DELETE /api/process/:pid: Kills a process with the given PID.
// Error handling is implemented to return 500 status codes for server errors.
# 添加错误处理
