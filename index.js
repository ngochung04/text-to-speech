const http = require("http");
const PORT = 3000;

const server = http.createServer((request, response) => {
  const { method, url, headers } = request;

  // handle requests
  if (method === "GET" && urlParts.pathname === "/") {
    response.setHeader("Content-Type", "text/html");
    response.statusCode = 200;
    response.end("<html><body><h1>Hello, World!</h1></body></html>");
  }
});

server.listen(PORT, (error) => {
  if (error) {
    return console.error(error);
  }

  console.log(`Server listening on port ${PORT}`);
});
