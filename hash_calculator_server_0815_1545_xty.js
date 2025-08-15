// 代码生成时间: 2025-08-15 15:45:48
const express = require('express');
const crypto = require('crypto');

// 定义哈希值计算工具的端口号
const PORT = process.env.PORT || 3000;

// 初始化Express应用
const app = express();

// 允许跨域请求
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// 处理GET请求，返回哈希值计算工具的信息页面
app.get('/', (req, res) => {
  res.send('欢迎使用哈希值计算工具');
});

// 处理POST请求，接收待计算哈希值的数据
app.post('/calculate-hash', (req, res) => {
  // 检查请求体是否包含data字段
  if (!req.body.data) {
    res.status(400).json({
      error: '请求体必须包含data字段'
    });
    return;
  }
  
  // 使用crypto模块计算哈希值
  const hash = crypto.createHash('sha256').update(req.body.data, 'utf8').digest('hex');
  
  // 返回哈希值结果
  res.json({
    originalData: req.body.data,
    hash
  });
});

// 监听指定端口，启动服务
app.listen(PORT, () => {
  console.log(`哈希值计算工具正在监听端口${PORT}`);
});

// 错误处理中间件，捕捉未捕获的异常
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('服务器内部错误');
});

// 模块导出，便于单元测试
module.exports = app;