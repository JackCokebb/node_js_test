var http = require("http");
var fs = require("fs");
var url = require("url");

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var test_url = new URL(_url, "http://localhost:3000/");
  console.log(test_url);
  //get(parse) query string from url
  //deprecated way
  var queryData = url.parse(_url, true).query;
  //new way
  var title = test_url.searchParams.get("id");
  var pathname = test_url.pathname;
  var temp = "HTML";
  if (title == null) {
    title = temp;
  } else {
    temp = title;
  }
  console.log(pathname);
  if (pathname === "/") {
    //console.log("data/" + title);
    fs.readFile("data/" + title, "utf8", (err, data) => {
      if (err) {
        throw err;
      }

      let template = `
  <!doctype html>
<html>
<head>
  <title>WEB1 - ${title}</title>
  <meta charset="utf-8">
</head>
<body>
  <h1><a href="/">WEB</a></h1>
  <ol>
    <li><a href="?id=HTML">HTML</a></li>
    <li><a href="?id=CSS">CSS</a></li>
    <li><a href="?id=JavaScript">JavaScript</a></li>
  </ol>
  <h2>${title}</h2>
  <p>${data}</p>
</body>
</html>
  `;
      //console.log(_url);
      //console.log(__dirname + _url);
      //response.end(fs.readFileSync(__dirname + _url));
      //response.end(queryData.id);
      response.writeHead(200);
      response.end(template);
    });
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});
app.listen(3000);
