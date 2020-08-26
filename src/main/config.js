import os from 'os';
import fs from 'fs';
import path from 'path';
import {ipcMain} from 'electron';

// config file path: '~/.creek.json'
const file = path.resolve(os.homedir(), '.creek.json');

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
  startupStatus = false;

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
   * danmu scroll speed
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
      console.info(`create config file: ${file}`);
      fs.writeFileSync(file, '{}', 'utf8');
    }
    this.init();
  }

  init() {
    const config = fs.readFileSync(file);
    for (const key in config) {
      if (config.hasOwnProperty(key) && this.hasOwnProperty(key)
          && config[key]) {
        this[key] = config[key];
      }
    }
  }

  update(key, value) {
    const oldValue = this[key];
    this[key] = value;
    console.debug(`config changed, key: ${key}, oldValue: ${oldValue}, newValue: ${this[key]}`);
  }

  flush() {
    const json = JSON.stringify(this);
    fs.writeFileSync(file, json);
    console.debug(`config flushed, json: ${json}`);
  }
}

// TODO use singleton pattern
const config = new CreekConfig();

for (const key in config) {
  if (config.hasOwnProperty(key)) {
    ipcMain.on(key, function (event, arg) {
      config.update(key, arg);
      config.flush()
    });
  }
}

export default config;
