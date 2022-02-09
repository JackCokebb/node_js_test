// const mod = {
//   var: "val",
//   func: function () {
//     console.log(this.var);
//   },
// };

//import '_mod' module
const _mod = require("./module_part.js");
console.log(_mod);
_mod.func();
