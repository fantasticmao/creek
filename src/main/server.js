import express from 'express';

/**
 * Local danmu server
 * @author fantasticmao <maomao8017@gmail.com>
 * @since 1.0.0
 */
class CreekServer {
  /**
   * Application, create by express
   * @see {@link https://github.com/expressjs/express} Express
   */
  app;
  /**
   * Data, store for danmu message
   * @type {{msg: string}[]}
   */
  data = [];
  /**
   * Node.js http.Server, create by app.listen()
   * @see {@link https://nodejs.org/dist/latest-v12.x/docs/api/http.htmlhttp_class_http_server} http.Server
   */
  server = null;

  /**
   * Create Express application, and register all HTTP API
   */
  constructor() {
    // create app
    this.app = express();
    // register HTTP API
    this.welcome();
    this.push();
    this.dump();
  }

  // server lifecycle

  /**
   * Start Node.js http.Server
   * @param {number} port - Server port
   * @param {string} host - Server host
   */
  startup(port, host) {
    if (this.server !== null) {
      console.error('local server has already been started');
      return;
    }
    this.server = this.app.listen(port, host, () => {
      console.info('start local server...');
    });
    this.server.on('close', () => {
      console.log('close local server...');
    });
  }

  /**
   * Close Node.js http.Server
   */
  shutdown() {
    if (this.server === null) {
      console.error('local server is not started or has already been shut down');
      return;
    }
    this.server.close();
  }

  // server api

  welcome() {
    this.app.get('/', (request, response) => {
      response.send('Hello, Creek!\n');
    });
  }

  push() {
    this.app.get('/push', (request, response) => {
      if (!request.query.msg) {
        response.status(400).send('\'msg\' must not be null\n');
        return;
      }
      console.log(`push message, ip: ${request.ip}, msg: ${request.query.msg}`);
      this.data.push({msg: request.query.msg});
      response.send('OK\n');
    });
  }

  dump() {
    this.app.get('/dump', (request, response) => {
      if (request.ip !== '127.0.0.1') {
        console.error(`illegal request, ip: ${request.ip}`);
        response.sendStatus(403);
        return;
      }
      const json = JSON.stringify({data: this.data});
      if (this.data.length !== 0) {
        console.log(`dump message, json: ${json}`);
      }
      this.data = [];
      response.set('Content-Type', 'application/json');
      response.send(json);
    });
  }
}

export default CreekServer;
