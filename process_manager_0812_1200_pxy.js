// 代码生成时间: 2025-08-12 12:00:13
const express = require('express');
const os = require('os');
const { exec } = require('child_process');
const app = express();
const port = 3000;

/**
 * 获取所有进程信息
 * @returns {Promise<Array>}
 */
function getAllProcesses() {
  return new Promise((resolve, reject) => {
    exec('ps aux', (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else if (stderr) {
        reject(new Error(stderr));
      } else {
        resolve(stdout.split('
').slice(1).map(line => {
          return line.split(/\s+/).slice(0, 11).join(' ');
        }).filter(line => line.trim().length > 0));
      }
    });
  });
}

/**
 * 获取CPU使用率
 * @returns {Promise<number>}
 */
function getCpuUsage() {
  return new Promise((resolve, reject) => {
    exec('top -bn1 | grep "Cpu(s)"', (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else if (stderr) {
        reject(new Error(stderr));
      } else {
        const cpuUsage = stdout.split(':')[1].trim().split('%').slice(0, -1).map(Number).reduce((sum, val) => sum + val, 0) / os.cpus().length;
        resolve(cpuUsage);
      }
    });
  });
}

/**
 * 获取内存使用率
 * @returns {Promise<number>}
 */
function getMemoryUsage() {
  return new Promise((resolve, reject) => {
    exec('free -m', (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else if (stderr) {
        reject(new Error(stderr));
      } else {
        const memoryUsage = stdout.split('
')[1].split(/\s+/)[2] / stdout.split('
')[1].split(/\s+/)[1] * 100;
        resolve(memoryUsage);
      }
    });
  });
}

// 设置路由
app.get('/api/processes', async (req, res) => {
  try {
    const processes = await getAllProcesses();
    res.json({
      processes: processes
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

app.get('/api/cpu', async (req, res) => {
  try {
    const cpuUsage = await getCpuUsage();
    res.json({
      cpuUsage: cpuUsage
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

app.get('/api/memory', async (req, res) => {
  try {
    const memoryUsage = await getMemoryUsage();
    res.json({
      memoryUsage: memoryUsage
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Process Manager is running on port ${port}`);
});