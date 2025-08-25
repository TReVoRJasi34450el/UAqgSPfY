// 代码生成时间: 2025-08-26 04:26:15
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

// 创建一个Express应用
const app = express();
const port = 3000;

// 中间件：解析请求体
app.use(express.json());

// 路由：抓取网页内容
app.get('/scrape', async (req, res) => {
  // 从请求参数中获取URL
  const { url } = req.query;

  // 检查URL是否被提供
  if (!url) {
    return res.status(400).json({
      error: 'URL parameter is required'
    });
  }

  try {
    // 使用axios发送HTTP GET请求
    const response = await axios.get(url);
    const html = response.data;

    // 使用cheerio解析HTML
    const $ = cheerio.load(html);
    const content = $('body').html();

    // 返回抓取的内容
    res.json({ content });
  } catch (error) {
    // 错误处理
    console.error('Error fetching URL:', error);
    res.status(500).json({
      error: 'Failed to scrape content'
    });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Web content scraper running on http://localhost:${port}`);
});

// 模块导出，以便能够导入和测试
module.exports = app;