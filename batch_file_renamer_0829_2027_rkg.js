// 代码生成时间: 2025-08-29 20:27:41
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// 中间件用于解析JSON请求体
app.use(express.json());

// 路由：处理批量重命名文件的请求
app.post('/rename', (req, res) => {
  // 检查请求体是否有文件列表和重命名模式
  if (!req.body.files || !req.body.pattern) {
    return res.status(400).json({
      error: 'Request body must contain files array and pattern string'
    });
  }

  // 定义重命名函数
  const renameFiles = (files, pattern) => {
    files.forEach(file => {
      const oldPath = path.join(process.cwd(), file);
      const extension = path.extname(file);
      const basename = path.basename(file, extension);
      const newPath = path.join(process.cwd(), pattern.replace('{{basename}}', basename) + extension);
      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          return res.status(500).json({
            error: `Error renaming file ${file}: ${err.message}`
          });
        }
      });
    });
  };

  // 执行重命名操作
  renameFiles(req.body.files, req.body.pattern);
  res.json({
    message: 'Renaming process initiated'
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Batch file renamer server listening at http://localhost:${port}`);
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error'
  });
});

// 代码注释：
// 本程序提供了一个简单的批量文件重命名工具，通过POST请求发送文件列表和重命名模式。
// 程序会根据提供的模式重命名指定的文件。
// 示例请求体：
// {
//   "files": ["old-name1.txt", "old-name2.txt"],
//   "pattern": "new-name-{{basename}}.txt"
// }