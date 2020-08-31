import express from 'express';
import logger from './logger';

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
   * @type {http.Server}
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
      logger.error('server', 'server has already been started');
      return;
    }
    this.server = this.app.listen(port, host, () => {
      logger.debug('server', 'start server...');
    });
  }

  /**
   * Close Node.js http.Server
   * @param {Function} callback - callback function
   */
  shutdown(callback) {
    if (this.server === null) {
      logger.error('server', 'server is not started or has already been shutdown');
      return;
    }
    this.server.on('close', callback);
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
      logger.info('server', `push message, ip: ${request.ip}, msg: ${request.query.msg}`);
      this.data.push({msg: request.query.msg});
      response.send('OK\n');
    });
  }

  dump() {
    this.app.get('/dump', (request, response) => {
      if (request.ip !== '127.0.0.1') {
        logger.error('server', `illegal request, ip: ${request.ip}`);
        response.sendStatus(403);
        return;
      }
      const json = JSON.stringify({data: this.data});
      if (this.data.length !== 0) {
        logger.info('server', `dump message, json: ${json}`);
      }
      this.data = [];
      response.set('Content-Type', 'application/json');
      response.send(json);
    });
  }
}

export default CreekServer;
