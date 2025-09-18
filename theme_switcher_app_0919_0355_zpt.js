// 代码生成时间: 2025-09-19 03:55:15
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

// 初始化Express应用
const app = express();
const PORT = process.env.PORT || 3000;

// 使用bodyParser中间件解析JSON请求体
app.use(bodyParser.json());

// 使用express-session中间件管理用户会话
app.use(session({
  secret: 'your-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// 路由处理主题切换请求
app.post('/api/switch-theme', (req, res) => {
  // 检查请求体中是否包含theme字段
  if (!req.body.theme) {
    return res.status(400).json({
      error: 'Theme is required'
    });
  }

  // 设置用户会话中的主题
  req.session.theme = req.body.theme;

  // 返回成功响应
  res.json({
    message: 'Theme switched successfully',
    currentTheme: req.session.theme
  });
});

// 设置默认主题
app.get('/api/get-current-theme', (req, res) => {
  // 如果用户会话中没有主题，则设置默认主题
  if (!req.session.theme) {
    req.session.theme = 'light';
  }

  // 返回当前主题
  res.json({
    currentTheme: req.session.theme
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});