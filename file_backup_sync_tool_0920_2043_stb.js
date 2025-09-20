// 代码生成时间: 2025-09-20 20:43:08
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define the source and destination directories
const sourceDir = './source/';
const destDir = './destination/';

// Function to backup and sync files
function backupAndSyncFiles(source, destination) {
  return new Promise((resolve, reject) => {
    fs.readdir(source, (err, files) => {
      if (err) {
        return reject(err);
      }
      let fileCount = files.length;
      files.forEach(file => {
        const sourceFile = path.join(source, file);
        const destFile = path.join(destination, file);
        fs.copyFile(sourceFile, destFile, (err) => {
          if (err) {
            return reject(err);
          }
          if (--fileCount === 0) {
            resolve('Backup and sync completed successfully.');
          }
        });
      });
    });
  });
}

// Endpoint to trigger backup and sync
app.post('/backup-sync', async (req, res) => {
  try {
    const message = await backupAndSyncFiles(sourceDir, destDir);
    res.status(200).json({
      message: message
    });
  } catch (err) {
    res.status(500).json({
      error: 'Failed to backup and sync files.'
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`File backup and sync tool listening at http://localhost:${port}`);
});

// Note:
// - This script assumes that the source and destination directories are already created.
// - Error handling is implemented to catch any file system errors during the backup and sync process.
// - The backupAndSyncFiles function uses Promise to handle asynchronous file operations.
// - The express server provides a simple API endpoint to trigger the backup and sync process.
// - Ensure proper permissions are set for the directories to avoid access issues.
// - This is a basic implementation and may require additional features like file filtering,
//   conflict resolution, logging, and more based on specific requirements.
