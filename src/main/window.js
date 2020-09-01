import {BrowserWindow, screen} from 'electron';
import logger from './logger';

/**
 * Danmu window
 * @see {@link https://www.electronjs.org/docs/api/browser-window} BrowserWindow
 */
class DanmuWindow extends BrowserWindow {

  constructor() {
    const mainDisplay = screen.getPrimaryDisplay();
    super({
      width: mainDisplay.workArea.width,
      height: mainDisplay.workArea.height,
      x: mainDisplay.workArea.x,
      y: mainDisplay.workArea.y,
      // specify false to create a Frameless Window
      frame: process.env.DEV,
      // makes the window transparent
      transparent: process.env.PROD,
      webPreferences: {
        nodeIntegration: true,
        devTools: process.env.DEV
      },
      show: false
    });
    this.once('ready-to-show', () => this.show());
    this.setIgnoreMouseEvents(process.env.PROD);
    this.setAlwaysOnTop(process.env.PROD, 'pop-up-menu');
    this.loadFile('./dist/danmu.html')
        .then(() => logger.debug('window', 'create danmu window...'));
    this.on('closed', () => logger.debug('window', 'close danmu window...'));
  }
}

/**
 * Config window
 * @see {@link https://www.electronjs.org/docs/api/browser-window} BrowserWindow
 */
class ConfigWindow extends BrowserWindow {

  constructor(route) {
    super({
      width: 472,
      height: 292,
      webPreferences: {
        nodeIntegration: true,
        devTools: process.env.DEV
      },
      show: false
    });
    this.once('ready-to-show', () => this.show());
    this.loadFile('./dist/preferences.html', {query: {defaultRoute: route}})
        .then(() => logger.debug('window', 'create config window...'));
    this.on('closed', () => logger.debug('window', 'close config window...'));
  }
}


export {ConfigWindow, DanmuWindow};
