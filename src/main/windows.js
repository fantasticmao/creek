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
    width: process.env.PROD ? display.size.width : 1200,
    height: process.env.PROD ? display.size.height : 800,
    x: 0,
    y: 0,
    frame: process.env.DEV,
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
      .then(() => logger.info('windows', 'create danmu window...'));
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
      .then(() => logger.info('windows', 'create config window...'));
  return window;
}
