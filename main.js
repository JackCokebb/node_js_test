var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");

function templateHTML(title, list, body) {
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    <a href="/create">create</a>
    ${body}
  </body>
  </html>
`;
}
function print_list(files) {
  let list = "<ul>";
  files.forEach((elem, inx, arr) => {
    list = list + `<li><a href="?id=${elem}">${elem}</a></li>`;
  });
  list = list + "</ul>";
  return list;
}

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var test_url = new URL(_url, "http://localhost:3000/");
  console.log(test_url);
  console.log(request.method);
  //get(parse) query string from url
  //deprecated way
  var queryData = url.parse(_url, true).query;
  //new way
  var title = test_url.searchParams.get("id");
  var pathname = test_url.pathname;

  console.log(pathname);
  if (pathname === "/") {
    if (title == null) {
      fs.readdir("./data", (err, files) => {
        title = " Welcome!";
        data = "I am JEE";

        let list = print_list(files);
        let template = templateHTML(title, list, `<h2>${title}</h2>${data}`);
        //console.log(_url);
        //console.log(__dirname + _url);
        //response.end(fs.readFileSync(__dirname + _url));
        //response.end(queryData.id);
        response.writeHead(200);
        response.end(template);
      });
    } else {
      //console.log("data/" + title);
      fs.readFile("data/" + title, "utf8", (err, data) => {
        if (err) {
          throw err;
        }

        fs.readdir("./data", (err, files) => {
          let list = print_list(files);
          let template = templateHTML(title, list, `<h2>${title}</h2>${data}`);
          //console.log(_url);
          //console.log(__dirname + _url);
          //response.end(fs.readFileSync(__dirname + _url));
          //response.end(queryData.id);
          response.writeHead(200);
          response.end(template);
        });
      });
    }
  } else if (pathname === "/create") {
    fs.readdir("./data", (err, files) => {
      title = " Create a new content";

      let list = print_list(files);
      let template = templateHTML(
        title,
        list,
        `
      <h2>${title}</h2>
      <form action="http://localhost:3000/create_process" method="post">
        <p><input type='text' name='title' placeholder='title'></p>
        <p><textarea name ='description' placeholder="description"></textarea></p>
        <p><input type='submit'></p>
      </form>
      `
      );
      //console.log(_url);
      //console.log(__dirname + _url);
      //response.end(fs.readFileSync(__dirname + _url));
      //response.end(queryData.id);
      response.writeHead(200);
      response.end(template);
    });
  } else if (pathname === "/create_process") {
    //fs.writeFile('data/$_POST["title"]', $_POST["description"], "utf8", err);
    let body = "";

    //request.on() - https://nodejs.org/ko/docs/guides/anatomy-of-an-http-transaction/
    request.on("data", function (data) {
      body = body + data;
      if (body.length > 1e6)
        //destroy connection if data is too much
        request.connection.destroy();
    });
    //when there is no more data
    request.on("end", function () {
      //let post = qs.parse(body);
      let title = new URLSearchParams(body).get("title");
      let desc = new URLSearchParams(body).get("description");
    });
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});
app.listen(3000);
