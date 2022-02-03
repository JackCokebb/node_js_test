var http = require("http");
var fs = require("fs");
var url = require("url");

var app = http.createServer(function (request, response) {
  var _url = request.url;

  //get(parse) query string from url
  var queryData = url.parse(_url, true).query;

  console.log(queryData.id);
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
