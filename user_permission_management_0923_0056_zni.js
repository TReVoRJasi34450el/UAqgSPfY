// 代码生成时间: 2025-09-23 00:56:28
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

//模拟数据库，用于存储用户权限信息
const userPermissions = {
  'user1': ['read', 'write'],
  'user2': ['read'],
  'user3': ['write']
};

// 获取所有用户权限
app.get('/users/permissions', (req, res) => {
  try {
    res.status(200).json(userPermissions);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 获取单个用户权限
app.get('/users/:username/permissions', (req, res) => {
  const { username } = req.params;
  if (userPermissions[username]) {
    res.status(200).json(userPermissions[username]);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// 添加/更新用户权限
app.post('/users/:username/permissions', (req, res) => {
  const { username } = req.params;
  const { permissions } = req.body;
  if (!permissions || !Array.isArray(permissions)) {
    return res.status(400).json({ error: 'Invalid permissions' });
  }
  userPermissions[username] = permissions;
  res.status(201).json(userPermissions[username]);
});

// 删除用户权限
app.delete('/users/:username/permissions', (req, res) => {
  const { username } = req.params;
  if (userPermissions[username]) {
    delete userPermissions[username];
    res.status(200).json({ message: 'Permissions deleted' });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
