// console.log(arguments);

//module.exports
const C = require("./test-module-1");
const calc1 = new C();
console.log(calc1.add(9, 7));
// console.log(calc1.multiply(2, 8));
// console.log(calc1.div(32, 2));

// exports
// const calc2 = require("./test-module-2");
const {add, multiply} = require("./test-module-2");
console.log(multiply(9, 7));

//caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();