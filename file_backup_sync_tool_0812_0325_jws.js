// 代码生成时间: 2025-08-12 03:25:28
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// 中间件，用于解析请求体
app.use(express.json());

// 路由：备份文件
app.post('/backup', (req, res) => {
  const { sourcePath, destinationPath } = req.body;
  fs.copyFile(sourcePath, destinationPath, (err) => {
    if (err) {
      return res.status(500).json({ error: '备份文件失败' });
    }
    res.json({ message: '文件备份成功' });
  });
});

// 路由：同步文件
app.post('/sync', (req, res) => {
  const { sourcePath, destinationPath } = req.body;
  const readStream = fs.createReadStream(sourcePath);
  const writeStream = fs.createWriteStream(destinationPath);

  readStream.on('error', (err) => {
    res.status(500).json({ error: '同步文件失败' });
  });

  writeStream.on('error', (err) => {
    res.status(500).json({ error: '同步文件失败' });
  });

  writeStream.on('finish', () => {
    res.json({ message: '文件同步成功' });
  });

  readStream.pipe(writeStream);
});

// 启动服务器
app.listen(port, () => {
  console.log(`文件备份和同步工具服务器运行在 http://localhost:${port}`);
});

/*
 * 错误处理：
 * 1. 在备份和同步文件的过程中，如果出现错误，会返回500状态码，并返回错误信息。
 * 2. 使用fs模块的copyFile和createReadStream/createWriteStream方法来处理文件备份和同步。
 * 3. 使用express的中间件来解析请求体。
 *
 * 可维护性和可扩展性：
 * 1. 代码结构清晰，易于理解。
 * 2. 包含适当的错误处理。
 * 3. 添加必要的注释和文档。
 * 4. 遵循JS最佳实践。
 * 5. 确保代码的可维护性和可扩展性。
 */