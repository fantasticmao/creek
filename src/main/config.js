import os from 'os';
import fs from 'fs';
import path from 'path';
import {ipcMain} from 'electron';
import logger from './logger';

// config file path: '~/.creek.json'
const file = path.resolve(os.homedir(), '.creek.json');
const encoding = 'utf8';

/**
 * Read and write config file
 * @author fantasticmao <maomao8017@gmail.com>
 * @since 1.0.0
 */
class CreekConfig {
  /**
   * whether to open the danmu window when Creek startup
   * @type {boolean}
   */
  startupState = false;

  /**
   * danmu font size
   * @type {number}
   */
  fontSize = 36;

  /**
   * danmu font color
   * @type {string}
   */
  fontColor = '#FFFFFF';

  /**
   * danmu font opacity
   * @type {number}
   */
  fontOpacity = 0.75;

  /**
   * danmu scroll speed, unit in px/second
   * @type {number}
   */
  scrollSpeed = 200;

  /**
   * whether to pause on mouse hover
   * @type {boolean}
   */
  pauseOnMouseHover = false;

  /**
   * enable local server
   * @type {boolean}
   */
  enableLocalServer = true;

  /**
   * local server port
   * @type {number}
   */
  localServerPort = 9508;

  /**
   * local server host
   * @type {string}
   */
  localServerHost = '0.0.0.0';

  /**
   * remote server url
   * @type {string}
   */
  remoteServerUrl = '';

  constructor() {
    const existed = fs.existsSync(file);
    if (!existed) {
      logger.info('config', `create file: ${file}`);
      fs.writeFileSync(file, '{}', encoding);
    }
    this.initProperties();
    this.registerEvents();
  }

  initProperties() {
    const json = fs.readFileSync(file, encoding);
    const config = JSON.parse(json);
    for (const key in config) {
      if (config.hasOwnProperty(key) && this.hasOwnProperty(key)
          && config[key]) {
        this[key] = config[key];
      }
    }
  }

  registerEvents() {
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        ipcMain.on(key, (event, value) => {
          logger.debug('config', `monitor changed, start updating and flushing data, key: ${key}, value: ${value}`);
          this.updateAndFlush(key, value);
        });
      }
    }
  }

  updateAndFlush(key, value) {
    this.update(key, value);
    this.flush();
  }

  update(key, value) {
    const oldValue = this[key];
    this[key] = value;
    logger.debug('config', `updated, key: ${key}, oldValue: ${oldValue}, newValue: ${this[key]}`);
  }

  flush() {
    const json = JSON.stringify(this);
    fs.writeFileSync(file, json, encoding);
    logger.debug('config', `flushed, json: ${json}`);
  }
}

export default CreekConfig;
