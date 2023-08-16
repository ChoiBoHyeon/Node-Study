const http = require('http');
const fs = require('fs').promises;

const server = http.createServer(async(req, res) => {
    try {res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        const data = await fs.readFile('./server2.html');
        res.end(data);
    } catch (error) {
        console.error(error);
        res.writeHead(200,{'Content-Type' : 'test/plain; charest=utf-8'});
        res.end(err.message);
    }
})
  .listen(8081, () => {
    console.log('8081번 포트에서 서버 대기 중입니다!');
  });