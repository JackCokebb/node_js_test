const fs = require("fs");

fs.readdir("./data", (err, files) => {
  files.forEach((file) => {
    console.log(file);
  });
});
