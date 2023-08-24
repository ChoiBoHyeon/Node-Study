const express = require('express')
const path = require('path')
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express()

app.set('port', process.env.PORT || 3000);

// dev : 개발시 , combined : 배포시
app.use(morgan('dev'));
// cookie 암호화
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true,
    },
    name : 'connect.sid',
}));

// midlleway 확장법
app.use('/', (req, res, next) => {
    express.static(__dirname,'public')
});
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// app.use('요청 경로',express.static('실제 경로'))
// localhost:3000/html ----> learn-express/index.html
// localhost:3000/css ----> learn-express/index.css
// app.use('/',express.static(__dirname,'/index.html'))

/*
// next -> 중복을 줄이기 위한 함수
app.use((req, res, next) => {
    console.log('미들웨어 사용 중');
    next();
});

// route parameter 라우트 매개변수
app.get('/category/:name', (req,res) => {
    res.send(`hello ${req.params.name}`);
});
*/

app.use((req, res, next) => {
    req.session.data = '비밀번호';
});

app.get('/',(req, res, next) => {
    res.sendFile(path.join(__dirname,'./index.html'));
});

app.post('/about',(req, res) => {
    res.send('hello express');
});

app.get('/get',(req, res) => {
    res.send('hello express2');
});

// 오류 처리 및 Http Status 관리
app.use((req, res, next) => {
    res.status(200).send('페이지를 찾을 수 없습니다.(오류 제어 테스트)');
});

app.listen(3000, () => {
    console.log('express 서버 실행')
})