import express from 'express';

const app = express();
let data = [];

// server api

app.get('/', (request, response) => {
  response.send('Hello, Creek!\n');
});

app.get('/push', (request, response) => {
  if (!request.query.msg) {
    response.status(400).send('\'msg\' must not be null\n');
    return;
  }
  console.log(`push message, ip: ${request.ip}, msg: ${request.query.msg}`);
  data.push(request.query.msg);
  response.send('OK\n');
});

app.get('/dump', (request, response) => {
  if (request.ip !== '127.0.0.1') {
    console.error(`illegal request, ip: ${request.ip}`);
    response.sendStatus(403);
    return;
  }
  const json = JSON.stringify({data: data});
  if (data.length !== 0) {
    console.log(`dump message, json: ${json}`);
  }
  data = [];
  response.set('Content-Type', 'application/json');
  response.send(json);
});

// server lifecycle

let server = null;

const startServer = () => {
  const port = process.env.LOCAL_SERVER_PORT;
  const host = process.env.LOCAL_SERVER_HOST;
  server = app.listen(port, host, () => {
    console.log('start local server...');
  });
};

const closeServer = () => {
  if (server) {
    server.close(() => {
      console.log('close local server...');
    });
  }
};

export {startServer, closeServer};
