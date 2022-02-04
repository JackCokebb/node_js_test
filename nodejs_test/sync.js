var fs = require("fs");

//read file sync

// console.log("a");
// var result = fs.readFileSync("sample2.txt", "utf8");
// console.log(result);
// console.log("c");

//read file async
console.log("a");
fs.readFile("sample2.txt", "utf8", (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data);
});
console.log("c");
