const {odd, even} = require('./var')

console.time('Choi');
function checkOddOrEven(number) {
    if (number % 2) {
        return odd;
    } else {
        return even;
    }
}
console.timeEnd('Choi');

module.exports = checkOddOrEven;