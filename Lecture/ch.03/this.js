console.log(this);
console.log(this === module.expoerts)

function a() {
    console.log(this === global);
}
a();