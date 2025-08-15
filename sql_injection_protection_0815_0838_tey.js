// 代码生成时间: 2025-08-15 08:38:19
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// 创建数据库连接池
const connection = mysql.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database'
});

// 中间件用于解析请求体
app.use(express.json());

// 查询接口，防止SQL注入
app.get('/users', (req, res) => {
  try {
    // 使用参数化查询
    const userId = req.query.id;
    const query = `SELECT * FROM users WHERE id = ?`;
    connection.query(query, [userId], (err, results) => {
      if (err) {
        // 错误处理
        console.error('Database query error:', err);
        return res.status(500).json({
          error: 'Internal Server Error'
        });
      }
      res.json(results);
    });
  } catch (error) {
    // 异常错误处理
    console.error('Error:', error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});

// 监听端口
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// 注意：
// - 使用参数化查询来防止SQL注入。
// - 这里使用了mysql2库，它是MySQL数据库的异步驱动，支持参数化查询。
// - 请确保你的数据库凭证是安全的，不要硬编码在代码中。
// - 这个例子中，我们只展示了基本的GET请求处理，实际应用中可能需要处理更复杂的请求。
// - 确保你的环境已经安装了express和mysql2。
// - 在部署到生产环境之前，进行彻底的测试和代码审查。