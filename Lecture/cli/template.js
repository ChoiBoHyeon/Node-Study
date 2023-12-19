#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const reqdline = require('readline');

let rl;
let type = process.argv[2];
let name = process.argv[3];
let directory = process.argv[4] || '.'

const htmlTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utp-8" />
    <title>Template</title>
  </head>
  <body>
    <h1>Hello</h1>
    <p>CLI</p>
  </body>
</html>
`;

const routerTemplate = `
const express = require('express');
const router = express.Router();
router.get('/', (req, res, next) => {
  try {
    res.send("ok");
  } catch(error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;
`;

// 파일 만들기(빈파일)
const mkdirp = (dir) => { // 경로 생성 함수
  const dirname = path
    .relative('.', path.normalize(dir))
    .split(path.sep)
    .filter(p => !!p);
  dirname.forEach((d, idx) => {
    const pathBuilder = dirname.slice(0, idx + 1).join(path.sep);
    if (!exist(pathBuilder)) {
      fs.mkdirSync(pathBuilder);
    }
  });
};

// 해당 파일이 존재하는지 검사
const exist = (dir) => {
  try {
    fs.accessSync(dir, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch(e) {
    return false;
  }
}

// 파일 만들기(템플릿 사용하여 원하는 양식의 파일)
const makeTemplate = () => {
  mkdirp(directory);
  if (type === 'html') {
    const pathToFile = path.join(directory, `${name}.html`);
    if (exist(pathToFile)) {
      console.error('이미 해당 파일이 존재합니다.')
    } else {
      fs.writeFileSync(pathToFile, htmlTemplate);
      console.log(pathToFile,' 생성 완료')
    }
  } else if (type === 'express-router') {
    const pathToFile = path.join(directory, `${name}.js`)
    if (exist(pathToFile)) {
      console.error('이미 해당 파일이 존재합니다.')
    }  else {
      fs.writeFileSync(pathToFile, routerTemplate);
      console.log(pathToFile,' 생성 완료')
    }
  } else {
    console.error('html 또는 express-router 둘 중 하나를 입력하세요.')
  }
};

// 파일 type 설정
const typeAnswer = (answer) => {
  if (answer !== 'html' && answer !== 'express-router') {
    console.clear();
    console.log('html 또는 express-router만 지원합니다. : ');
    return rl.question('어떤 템플랫이 필요합니까? : ', typeAnswer);
  }
  type = answer;
  return rl.question('파일명을 설정하세요. : ', nameAnswer);
}

// 파일 name 설정
const nameAnswer = (answer) => {
  if (!answer || !answer.trim()) {
    console.clear();
    console.log('파일 이름을 반드시 설정해야합니다. : ');
    return rl.question('파일명을 설정하세요. : ', typeAnswer);
  }
  name = answer;
  return rl.question('저장할 경로를 설정하세요. 하지않을 시 현재경로에 생성됩니다. : ', dirAnswer);
}

// 파일 dir 설정
const dirAnswer = (answer) => {
  directory = answer?.trim() || '.';
  rl.close();
  makeTemplate();
}

const program = () => {
  if(!type || !name) {
    console.error('사용방법: cli html|express-router 파일명 [생성경로]')
    rl = reqdline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    console.clear();
    rl.question('어떤 템플릿이 필요하십니까? : ', typeAnswer);
  } else {
    makeTemplate();
  }
};
// Termenal 명렁어 예시
// npx cli html main pubilc/html
// npx cli express-router main pubilc/html

program();