#!/usr/bin/env node

const readline = require('readline');
// process.argv = 실제 실행경로를 알려줌
// console.log('Hello CLI', process.argv);

const rl = readline.createInterface({
  input : process.stdin,
  output : process.stdout,
});

console.clear();

const answerCallback = (answer) => {
  if (answer == 'y') {
    console.log('감사합니다.');
    rl.close();
  } else if (answer == 'n') {
    console.clear();
    console.log('죄송합니다. 하지만 다시한번 물어볼께요.');
    rl.question('예제가 재미있습니까? (y/n)', answerCallback);
  } else {
    console.clear();
    console.log('(y/n)중에 골라 입력해주세요.')
    rl.question('예제가 재미있습니까? (y/n)', answerCallback);
  }
};

rl.question('예제가 재미있습니까? (y/n)', answerCallback);