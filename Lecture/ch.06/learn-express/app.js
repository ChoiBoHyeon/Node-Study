const express = require('express')
const path = require('path')

const app = express()

app.set('port', process.env.PORT || 3000);

// next -> 중복을 줄이기 위한 함수
app.use((req, res, next) => {
    console.log('미들웨어 사용 중');
    next();
});

// route parameter 라우트 매개변수
app.get('/category/:name', (req,res) => {
    res.send(`hello ${req.params.name}`);
});

app.get('/',(req, res) => {
    console.log("Home 화면")
    res.sendFile(path.join(__dirname,'./index.html'));
});

app.post('/about',(req, res) => {
    console.log("/about 화면")
    res.send('hello express');
});

app.get('/get',(req, res) => {
    console.log("get 화면")
    res.send('hello express2');
});

// 오류 처리 및 Http Status 관리
app.use((req, res, next) => {
    res.status(200).send('페이지를 찾을 수 없습니다.');
})

app.listen(3000, () => {
    console.log('express 서버 실행 (3000포트 대기중)')
})