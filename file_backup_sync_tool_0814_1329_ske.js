// 代码生成时间: 2025-08-14 13:29:28
const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const app = express();
const port = 3000;

// 定义源文件夹和目标文件夹的路径
const sourcePath = './source';
const targetPath = './target';

// 错误处理中间件
function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).send('An error occurred');
}

// 备份文件的函数
async function backupFile(source, target) {
  try {
    await fs.copy(source, target);
    console.log('File backed up successfully');
  } catch (err) {
    throw new Error(`Error backing up file: ${err.message}`);
  }
}

// 同步文件的函数
async function syncFiles(source, target) {
  try {
    await fs.ensureDir(target);
    await fs.copy(source, target, { overwrite: true });
    console.log('Files synced successfully');
  } catch (err) {
    throw new Error(`Error syncing files: ${err.message}`);
  }
}

// 路由：备份文件
app.get('/backup', async (req, res) => {
  try {
    // 备份指定的文件或文件夹
    await backupFile(sourcePath, targetPath);
    res.send('Backup completed');
  } catch (err) {
    errorHandler(err, req, res);
  }
});

// 路由：同步文件
app.get('/sync', async (req, res) => {
  try {
    // 同步指定的文件或文件夹
    await syncFiles(sourcePath, targetPath);
    res.send('Sync completed');
  } catch (err) {
    errorHandler(err, req, res);
  }
});

// 启动服务器
app.use(errorHandler);
app.listen(port, () => {
  console.log(`File backup and sync tool running on port ${port}`);
});

// 注意：
// 1. 确保sourcePath和targetPath的路径存在且正确。
// 2. 这个简单的备份和同步工具假设源和目标路径是文件夹。
// 3. 在实际使用中，可能需要更复杂的逻辑来处理文件和文件夹的备份和同步。
