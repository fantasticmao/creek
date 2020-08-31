import {BrowserWindow, screen} from 'electron';
import logger from './logger';

/**
 * New danmu window, which is create by Electron BrowserWindow
 * @see {@link https://www.electronjs.org/docs/api/browser-window} BrowserWindow
 * @return {Electron.BrowserWindow}
 */
export function newDanmuWindow() {
  const display = screen.getPrimaryDisplay();
  const window = new BrowserWindow({
    width: display.workAreaSize.width,
    height: display.workAreaSize.height,
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
  window.once('ready-to-show', () => {
    window.show();
  });
  window.setIgnoreMouseEvents(process.env.PROD);
  window.setAlwaysOnTop(process.env.PROD, 'pop-up-menu');
  window.loadFile('./dist/danmu.html')
      .then(() => logger.debug('windows', 'create danmu window...'));
  return window;
}

/**
 * New config window, which is create by Electron BrowserWindow
 * @see {@link https://www.electronjs.org/docs/api/browser-window} BrowserWindow
 * @return {Electron.BrowserWindow}
 */
export function newConfigWindow(route) {
  const window = new BrowserWindow({
    width: 472,
    height: 292,
    webPreferences: {
      nodeIntegration: true,
      devTools: process.env.DEV
    },
    show: false
  });
  window.once('ready-to-show', () => {
    window.show();
  });
  window.loadFile('./dist/preferences.html', {query: {defaultRoute: route}})
      .then(() => logger.debug('windows', 'create config window...'));
  return window;
}
