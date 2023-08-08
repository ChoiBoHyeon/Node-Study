function first() {
    second();
    console.log('첫 번째')
}

function second() {
    thrid();
    console.log('두 번쨔')
}

function thrid() {
    console.log('세 번째')
}

first();