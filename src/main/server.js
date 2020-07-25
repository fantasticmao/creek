import express from 'express';

const app = express();

app.get('/', (request, response) => {
  response.send('Hello, Creek!\n');
});

app.get('/put', (request, response) => {
  if (!request.query.msg) {
    response.send('\'msg\' must not be null\n');
    return;
  }
  console.log(request.query.msg);
  response.send('OK\n');
});

app.get('/take', (request, response) => {
  const data = {};
  response.send(JSON.stringify(data));
});

export default app;
