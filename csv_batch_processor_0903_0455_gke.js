// 代码生成时间: 2025-09-03 04:55:16
const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const { Transform } = require('stream');

// 创建Express应用
const app = express();
const PORT = 3000;

// 解析CSV文件的中间件
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// 上传CSV文件并处理的路由
app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const file = req.files.csvFile;
  if (!file) {
    return res.status(400).send('No CSV file was uploaded.');
  }

  // 创建一个转换流来处理CSV数据
  const dataTransformer = new Transform({
    transform(chunk, encoding, callback) {
      // 这里可以根据需要处理CSV数据，例如：转换字段、验证等
      this.push(chunk);
      callback();
    }
  });

  // 读取文件并使用转换流
  file.data.pipe(csv()).pipe(dataTransformer).pipe(fs.createWriteStream('processed.csv'))
    .on('finish', () => {
      res.status(200).send('CSV file processed and saved as processed.csv');
    })
    .on('error', (error) => {
      console.error('Error processing the CSV file:', error);
      res.status(500).send('Error processing the CSV file.');
    });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// 以下是使用到的npm包的文档链接
// Express: https://expressjs.com/
// CSV-Parser: https://www.npmjs.com/package/csv-parser
// Stream: https://nodejs.org/api/stream.html
