// 代码生成时间: 2025-08-14 23:27:56
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');

// 设置chai预期库
chai.should();
const expect = chai.expect;

// 使用chai-http插件来发送HTTP请求
chai.use(chaiHttp);

// 中间件，解析application/json和urlencoded格式的请求体
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 测试路由，返回自动化测试套件的欢迎信息
app.get('/test', (req, res) => {
  res.json({ message: 'Welcome to the Automation Test Suite!' });
});

// 定义测试用例
describe('Automation Test Suite', () => {
  describe('/GET test', () => {
    it('it should GET the welcome message', (done) => {
      chai.request(app)
        .get('/test')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message');
          res.body.message.should.eql('Welcome to the Automation Test Suite!');
          done();
        });
    });
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// 运行测试
if (require.main === module) {
  mocha.run();
}

// 导出app以便于在其他地方测试
module.exports = app;
