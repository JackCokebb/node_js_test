const http = require("http");
const fs = require("fs");
const url = require("url");
const qs = require("querystring");
const path = require("path");

//refactoring
const template = require("./lib/template.js");

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

        // let list = print_list(files);
        // let template = templateHTML(
        //   title,
        //   list,
        //   `<h2>${title}</h2>${data}`,
        //   `<a href="/create">create</a>`
        // );
        let list = template.list(files);
        let html = template.html(
          title,
          list,
          `<h2>${title}</h2>${data}`,
          `<a href="/create">create</a>`
        );
        //console.log(_url);
        //console.log(__dirname + _url);
        //response.end(fs.readFileSync(__dirname + _url));
        //response.end(queryData.id);
        response.writeHead(200);
        response.end(html);
      });
    } else {
      //console.log("data/" + title);
      const filteredPath = path.parse(title).base;
      console.log("filtered: " + filteredPath);
      fs.readFile("data/" + filteredPath, "utf8", (err, data) => {
        if (err) {
          throw err;
        }

        fs.readdir("./data", (err, files) => {
          let list = template.list(files);
          let html = template.html(
            title,
            list,
            `<h2>${title}</h2>${data}`,
            `<a href="/create">create</a> 
            <a href="/update?id=${title}">update</a>
            <form action="/delete_process" method="post">
              <input type='hidden' name="id" value=${title}>
              <input type="submit" value="delete">
            </form>
            `
            //you can add onsubmit property in form tag
            //to re-check if user really want to delete the content.
          );
          //console.log(_url);
          //console.log(__dirname + _url);
          //response.end(fs.readFileSync(__dirname + _url));
          //response.end(queryData.id);
          response.writeHead(200);
          response.end(html);
        });
      });
    }
  } else if (pathname === "/create") {
    fs.readdir("./data", (err, files) => {
      title = " Create a new content";

      let list = template.list(files);
      let html = template.html(
        title,
        list,
        `
      <h2>${title}</h2>
      <form action="http://localhost:3000/create_process" method="post">
        <p><input type='text' name='title' placeholder='title'></p>
        <p><textarea name ='description' placeholder="description"></textarea></p>
        <p><input type='submit'></p>
      </form>
      `,
        ""
      );
      //console.log(_url);
      //console.log(__dirname + _url);
      //response.end(fs.readFileSync(__dirname + _url));
      //response.end(queryData.id);
      response.writeHead(200);
      response.end(html);
    });
  } else if (pathname === "/create_process") {
    let body = "";

    //request.on() - https://nodejs.org/ko/docs/guides/anatomy-of-an-http-transaction/
    request.on("data", function (data) {
      body = body + data;
      if (body.length > 1e6) {
        //destroy connection if data is too much
        //request.connection.destroy();
      }
    });
    //when there is no more data
    request.on("end", function () {
      //let post = qs.parse(body);
      let title = new URLSearchParams(body).get("title");
      let desc = new URLSearchParams(body).get("description");
      const filteredPath = path.parse(title).base;
      fs.writeFile(`data/${title}`, desc, "utf8", (err) => {
        if (err) throw err;
        console.log(`create file '${title}' successfully`);
        response.writeHead(302, {
          Location: `http://localhost:3000/?id=${title}`,
        });
        response.end();
      });
    });
  } else if (pathname === "/update") {
    fs.readFile("data/" + title, "utf8", (err, data) => {
      if (err) {
        throw err;
      }

      fs.readdir("./data", (err, files) => {
        let list = template.list(files);
        let html = template.html(
          title,
          list,
          `<form action="/update_process" method="post">
            <input type="hidden" name="id" value="${title}">
            <p><input type="text" name="title" placeholder="title" value="${title}" ></p>
            <p><textarea name="description" placeholder="description">${data}</textarea></p>
            <p><input type="submit"></p>
          </form>`,
          `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
        );
        //console.log(_url);
        //console.log(__dirname + _url);
        //response.end(fs.readFileSync(__dirname + _url));
        //response.end(queryData.id);
        response.writeHead(200);
        response.end(html);
      });
    });
  } else if (pathname === "/update_process") {
    let body = "";

    //request.on() - https://nodejs.org/ko/docs/guides/anatomy-of-an-http-transaction/
    request.on("data", function (data) {
      body = body + data;
      if (body.length > 1e6) {
        //destroy connection if data is too much
        //request.connection.destroy();
      }
    });
    //when there is no more data
    request.on("end", function () {
      //let post = qs.parse(body);
      let id = new URLSearchParams(body).get("id");
      let title = new URLSearchParams(body).get("title");
      let desc = new URLSearchParams(body).get("description");
      fs.rename(`data/${id}`, `data/${filteredPath}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
      fs.writeFile(`data/${title}`, desc, "utf8", (err) => {
        if (err) throw err;
        console.log(`update file '${title}' successfully`);
        response.writeHead(302, {
          Location: `http://localhost:3000/?id=${title}`,
        });
        response.end();
      });
    });
  } else if (pathname === "/delete_process") {
    let body = "";
    request.on("data", function (data) {
      body = body + data;
      if (body.length > 1e6) {
        //destroy connection if data is too much
        //request.connection.destroy();
      }
    });
    //when there is no more data
    request.on("end", function () {
      //let post = qs.parse(body);
      let id = new URLSearchParams(body).get("id");
      const filteredPath = path.parse(id).base;
      fs.unlink(`data/${filteredPath}`, (err) => {
        if (err) {
          console.log(err);
        }
      });
      response.writeHead(302, {
        Location: `/`,
      });
      response.end();
    });
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});
app.listen(3000);
