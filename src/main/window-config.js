import {BrowserWindow} from 'electron';

/**
 * Config window, which is create by Electron BrowserWindow
 * @see {@link https://www.electronjs.org/docs/api/browser-window} BrowserWindow
 * @author fantasticmao <maomao8017@gmail.com>
 * @since 1.0.0
 */
class ConfigWindow {
  /**
   * BrowserWindow, create by Electron
   */
  window;

  /**
   * Create window
   */
  constructor(route) {
    this.window = new BrowserWindow({
      width: 472,
      height: 292,
      webPreferences: {
        nodeIntegration: true,
        devTools: process.env.DEV
      },
      show: false
    });
    this.window.once('ready-to-show', () => {
      this.window.show();
    });
    this.window.on('closed', () => console.debug('close config window...'));
    this.window.loadFile('./dist/preferences.html', {query: {defaultRoute: route}})
        .then(() => console.debug('create config window...'));
  }

}

export default ConfigWindow;
