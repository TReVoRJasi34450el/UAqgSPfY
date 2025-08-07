// 代码生成时间: 2025-08-07 18:19:05
const express = require('express');
const crypto = require('crypto');

// 创建一个Express应用
const app = express();
const port = 3000;

// 设置中间件来解析请求体中的JSON数据
app.use(express.json());

// 加密密码的函数
function encryptPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return { salt, hash };
}

// 解密密码的函数（仅用于验证）
function decryptPassword(salt, hash, password) {
  const hashCheck = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === hashCheck;
}

// 路由：加密密码
app.post('/encrypt', (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }
  try {
    const { salt, hash } = encryptPassword(password);
    res.json({ salt, hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 路由：验证密码
app.post('/verify', (req, res) => {
  const { password, salt, hash } = req.body;
  if (!password || !salt || !hash) {
    return res.status(400).json({ error: 'Password, salt, and hash are required' });
  }
  try {
    const isCorrect = decryptPassword(salt, hash, password);
    res.json({ isValid: isCorrect });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Password manager app listening at http://localhost:${port}`);
});
