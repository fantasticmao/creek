import {app, BrowserWindow, screen} from 'electron';
import logger from './logger';
import {getEnsureDisplay} from "./config";
import {i18n, MODULE_PREFERENCES} from '../common/i18n';

/**
 * Danmu window
 * @see {@link https://www.electronjs.org/docs/api/browser-window} BrowserWindow
 */
class DanmuWindow extends BrowserWindow {

  constructor() {
    const primaryDisplay = screen.getPrimaryDisplay();
    super({
      width: primaryDisplay.workArea.width,
      height: primaryDisplay.workArea.height,
      x: primaryDisplay.workArea.x,
      y: primaryDisplay.workArea.y,
      // specify false to create a Frameless Window
      frame: process.env.DEV,
      // makes the window transparent
      transparent: true,
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

    /*
     * Electron can only specify the maximum size of the window as the size of the Primary Display,
     * so we need to manually reset the window boundary.
     */
    if (global.__config.displayId !== 0) {
      const ensureDisplay = getEnsureDisplay(global.__config.displayId);
      this.setBounds({
        width: ensureDisplay.workArea.width,
        height: ensureDisplay.workArea.height,
        x: ensureDisplay.workArea.x,
        y: ensureDisplay.workArea.y
      });
    }
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
      title: i18n(app.getLocale(), MODULE_PREFERENCES).title,
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
