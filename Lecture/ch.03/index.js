const {odd, even} = require('./var');
const checkNumber = require('./func');

function checkStringOddOrEver(str) {
    if(str.length % 2) {
        return odd;
    } else {
        return even;
    }
}

console.log(checkStringOddOrEver('hello'));
console.log(checkNumber(10));