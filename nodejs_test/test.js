const http = require("http");

let app = http.createServer(function (request, response) {
  //응답 url
  const _url = request.url;
  console.log(_url);

  //URL 객체 생성 - url의 정보를 object 형식으로 보여준다.
  const test_url = new URL(_url, "http://localhost:3000/");

  //url 정보에서 pathname만 추출
  let pathname = test_url.pathname;

  //routing -> pathname === "/test"이면 http://localhost:3000/test 이런 형식이다.
  if (pathname === "/") {
    //response.writeHead(<http status code>, <header info>) -- response header에 대한 정보를 기록한다
    //처음에는 200, 404와 같은 http 상태코드가 들어가고, 헤더 정보에는 charset 정보나
    //response의 형식 등이 적힌다.
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

    //본문에 내용 작성 (ex/ html이면 body)
    response.write("<h1>Hello World!</h1>");

    //응답을 종료, 마찬가지로 내용을 작성할 수 있다.
    response.end("<h1>Bye World!</h1>");
  } else if (pathname === "/test") {
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.end("<h1>test page</h1>");
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});

//<http server object>.listen(<port number>, <callback>)
//서버와 연결할 포트 번호 지정, 연결 후 실행될 callback 함수 선언
app.listen(3001);
