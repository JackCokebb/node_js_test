var http = require("http");
var fs = require("fs");
var url = require("url");

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var test_url = new URL(_url, "http://localhost:3000/");

  //get(parse) query string from url
  //deprecated way
  var queryData = url.parse(_url, true).query;
  //new way
  var queryData2 = test_url.searchParams.get("id");

  console.log(test_url);
  console.log(queryData2);
  if (_url == "/") {
    _url = "/index.html";
  }
  if (_url == "/favicon.ico") {
    return response.writeHead(404);
  }
  response.writeHead(200);
  //console.log(_url);
  //console.log(__dirname + _url);
  //response.end(fs.readFileSync(__dirname + _url));
  response.end(queryData.id);
});
app.listen(3000);
