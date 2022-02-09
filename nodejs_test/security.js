//preventing the situation that someone try to access the other files
//by using URI
const path = require("path");
res = path.parse("http://localhost:3000/?id=NodeJs");
console.log(res);
