const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');

// 
dotenv.config();
const indexRouter = require('./routes');
const app = express();

// 포트 설정
app.set('port', process.env.PROT || 4000);
app.set('view engine', 'html');
nunjucks.configure('view', {
  express: app,
  watch: true,
})

// 각종 라이브러리 연결
app.use(morgan('dev'));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));

// 라우터 연결
app.use('/', indexRouter);
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// 에러처리 미들웨어
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err:{};
  res.status(err.status || 500);
  res.render('error');
});
// 연결
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});