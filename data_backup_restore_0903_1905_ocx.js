// 代码生成时间: 2025-09-03 19:05:00
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// 设置静态文件目录
app.use(express.static('public'));

// 备份数据的路由
app.post('/backup', (req, res) => {
  // 假设备份的数据存储在请求体中
  const data = req.body;
  try {
    // 将数据写入备份文件
    const backupFilename = 'backup_' + new Date().toISOString() + '.json';
    fs.writeFileSync(path.join(__dirname, 'backups', backupFilename), JSON.stringify(data));
    res.status(200).json({ message: 'Data backed up successfully', filename: backupFilename });
  } catch (error) {
    // 错误处理
    res.status(500).json({ error: 'Failed to backup data', message: error.message });
  }
});

// 恢复数据的路由
app.post('/restore', (req, res) => {
  // 从请求体中获取备份文件名
  const filename = req.body.filename;
  try {
    // 读取备份文件并恢复数据
    const backupFilePath = path.join(__dirname, 'backups', filename);
    if (fs.existsSync(backupFilePath)) {
      const data = fs.readFileSync(backupFilePath, 'utf8');
      res.status(200).json({ message: 'Data restored successfully', data: JSON.parse(data) });
    } else {
      // 文件不存在的错误处理
      res.status(404).json({ error: 'Backup file not found', filename: filename });
    }
  } catch (error) {
    // 错误处理
    res.status(500).json({ error: 'Failed to restore data', message: error.message });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
