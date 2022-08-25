const http = require("http")
const server = http.createServer() // '.createServer()' 메서드는 http 서버 객체를 반환한다

const users = [
  {
    id: 1,
    name: "Rebekah Johnson",
    email: "Glover12345@gmail.com",
    password: "123qwe",
  },
  {
    id: 2,
    name: "Fabian Predovic",
    email: "Connell29@gmail.com",
    password: "password",
  },
];

const posts = [
  {
    id: 1,
    title: "간단한 HTTP API 개발 시작!",
    content: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
    userId: 1,
  },
  {
    id: 2,
    title: "HTTP의 특성",
    content: "Request/Response와 Stateless!!",
    userId: 1,
  },
];

const httpRequestListener = function(request, response) {
  const {url, method} = request
  
  if (method === 'GET') {
    if (url === '/ping') {
      response.writeHead(200, {'Content-Type' : 'application/json'})
      response.end(JSON.stringify({message : "pong"}))
    }
  } else if (method === "POST") {
    if (url === "/users/signup") {
      let body = "";

      request.on("data", (data) => {
        body += data;
      });

      request.on("end", () => {
        const user = JSON.parse(body);

        users.push({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
        });
        response.writeHead(200, {'Content-Type' : 'application/json'})
        response.end(JSON.stringify({message : "userCreated"}))
      })
    } else if (url === "/post/enrollment") {
      let body1 = "";

      request.on("data", (data) => {
        body1 += data;
      });

      request.on("end", () => {
        const postEnroll = JSON.parse(body1);

        posts.push({
          content: postEnroll.content,
          userId: postEnroll.userId,
        });
        response.writeHead(200, {'Content-Type' : 'application/json'})
        response.end(JSON.stringify({"posts" : posts}))
      })
    }
  }
}

server.on("request", httpRequestListener) // '.on' 메서드는 최상단 '.createServer()' 메서드 실행 후 반환된 서버 객체가 가지고 있는 메서드
// 서버 객체에 "request" 이름으로 이벤트가 등록된다

const IP = '127.0.0.1'
const PORT = 8000

server.listen(PORT, IP, function() {
  console.log(`Listening to request on ip ${IP} & port ${PORT}`)
})