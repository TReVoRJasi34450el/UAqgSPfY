// 代码生成时间: 2025-08-22 12:42:16
const express = require('express');
const bodyParser = require('body-parser');

// 创建一个Express应用
const app = express();
const port = 3000;

// 中间件，用于解析请求体中的JSON数据
app.use(bodyParser.json());

// 模拟库存数据
const inventory = [];

// 定义获取所有库存项的路由
app.get('/api/inventory', (req, res) => {
    try {
        // 将库存数据以JSON格式返回
        res.status(200).json(inventory);
    } catch (error) {
        // 错误处理
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 定义添加库存项的路由
app.post('/api/inventory', (req, res) => {
    try {
        // 检查请求体中是否有必要的数据
        if (!req.body.item || !req.body.quantity) {
            res.status(400).json({ error: 'Missing item or quantity' });
            return;
        }

        // 添加库存项
        inventory.push(req.body);
        res.status(201).json(req.body);
    } catch (error) {
        // 错误处理
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 定义更新库存项的路由
app.put('/api/inventory/:id', (req, res) => {
    try {
        // 查找库存项的索引
        const index = inventory.findIndex(item => item.id === parseInt(req.params.id));
        if (index === -1) {
            // 如果库存项不存在则返回404
            res.status(404).json({ error: 'Inventory item not found' });
            return;
        }

        // 更新库存项
        inventory[index] = req.body;
        res.status(200).json(req.body);
    } catch (error) {
        // 错误处理
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 定义删除库存项的路由
app.delete('/api/inventory/:id', (req, res) => {
    try {
        // 查找库存项的索引
        const index = inventory.findIndex(item => item.id === parseInt(req.params.id));
        if (index === -1) {
            // 如果库存项不存在则返回404
            res.status(404).json({ error: 'Inventory item not found' });
            return;
        }

        // 删除库存项
        const deletedItem = inventory.splice(index, 1)[0];
        res.status(200).json({ message: 'Inventory item deleted', item: deletedItem });
    } catch (error) {
        // 错误处理
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 启动服务器
app.listen(port, () => {
    console.log(`Inventory Management System running on port ${port}`);
});
