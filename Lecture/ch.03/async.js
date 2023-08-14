const fs = require('fs');

console.log('시작');
fs.readFile('./Lecture/ch.03/readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('1번', data.toString());
});
fs.readFile('./Lecture/ch.03/readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('2번', data.toString());
});
fs.readFile('./Lecture/ch.03/readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('3번', data.toString());
});
fs.readFile('./Lecture/ch.03/readme.txt', (err, data) => {
    if (err) {
      throw err;
    }
    console.log('4번', data.toString());
  });
console.log('끝');