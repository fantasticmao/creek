import http from 'http';

function putBarrage(request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('OK\n');
}

function takeBarrage(request, response) {
  response.writeHead(200, {'Content-Type': 'application/json'});
  response.end(JSON.stringify({
    data: ["Hello, World!"]
  }));
}

const server = http.createServer((request, response) => {
  switch (request.url) {
    case /^\/put\/?$/:
      putBarrage(request, response);
      break;
    case /^\/take\/?$/:
      takeBarrage(request, response);
      break;
    default:
      response.writeHead(404, {'Content-Type': 'text/plain'});
      response.end('404 Not Found\n');
  }
}).listen(8080, '0.0.0.0');

console.log('start local server...');

export default server;
