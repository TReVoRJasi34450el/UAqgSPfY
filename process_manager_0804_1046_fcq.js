// 代码生成时间: 2025-08-04 10:46:47
const express = require('express');
const { spawn } = require('child_process');

// Create an Express application
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Helper function to start a new process
function startProcess(command) {
    return new Promise((resolve, reject) => {
        const process = spawn(command, []);
        process.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
            resolve(data.toString());
        });
        process.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
            reject(data.toString());
        });
        process.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    });
}

// Route to start a process
app.post('/start-process', (req, res) => {
    const { command } = req.body;
    if (!command) {
        return res.status(400).json({ error: 'Command is required' });
    }
    startProcess(command)
        .then((data) => {
            res.json({ message: 'Process started successfully', output: data });
        }).catch((error) => {
            res.status(500).json({ error: error });
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Process Manager is running on port ${port}`);
});