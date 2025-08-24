// 代码生成时间: 2025-08-24 17:45:38
const express = require('express');
const app = express();
const port = 3000;

// 引入一个通用的排序算法
const { bubbleSort } = require('./sorting_algorithms');

// 定义一个路由，用于接收一个数组并返回排序后的结果
app.post('/sort', (req, res) => {
  // 检查请求体中是否含有数组
  if (!req.body.array) {
    return res.status(400).json({
      error: 'Missing array in request body'
    });
  }
  
  // 检查传入的数组是否为数值数组
  if (!Array.isArray(req.body.array) || !req.body.array.every(item => typeof item === 'number')) {
    return res.status(400).json({
      error: 'Array must contain only numbers'
    });
  }
  
  // 使用冒泡排序算法对数组进行排序
  const sortedArray = bubbleSort(req.body.array);
  
  // 返回排序后的数组
  res.json({
    sortedArray
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Sorting service listening at http://localhost:${port}`);
});

// 冒泡排序算法实现
function bubbleSort(arr) {
  // 遍历数组，每次迭代都会将最大的元素排到末尾
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      // 如果当前元素比下一个元素大，则交换它们的位置
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  // 返回排序后的数组
  return arr;
}

// 导出冒泡排序算法
module.exports = {
  bubbleSort
};
