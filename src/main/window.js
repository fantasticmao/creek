import {BrowserWindow, ipcMain, screen} from 'electron';
import logger from './logger';

/**
 * Danmu window
 * @see {@link https://www.electronjs.org/docs/api/browser-window} BrowserWindow
 */
class DanmuWindow extends BrowserWindow {

  constructor() {
    super({
      width: screen.getPrimaryDisplay().workAreaSize.width,
      height: screen.getPrimaryDisplay().workAreaSize.height,
      x: 0,
      y: 0,
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
    this.registerEvents();
  }

  registerEvents() {
    this.on('closed', () => logger.debug('window', 'close danmu window...'));

    // add event listeners for window movement
    ipcMain.on('window-danmu-move', (event, displayId) => {
      const toDisplay = screen.getAllDisplays().filter(display => display.id === displayId);
      if (!toDisplay || toDisplay.length !== 1) {
        logger.error('window', 'move danmu window error');
        return;
      }
      this.setBounds({
        width: toDisplay[0].workAreaSize.width,
        height: toDisplay[0].workAreaSize.height,
        x: 0,
        y: 0
      });
    });
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
    this.registerEvents();
  }

  registerEvents() {
    this.on('closed', () => logger.debug('window', 'close config window...'));
  }
}


export {ConfigWindow, DanmuWindow};
