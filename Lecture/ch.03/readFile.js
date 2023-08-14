const fs = require('fs');

fs.readFile('./Lecture/ch.03/readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data);
  console.log(data.toString());
});