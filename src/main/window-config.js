import {BrowserWindow} from "electron";
import config from "../common/config";

/**
 * Config window, which is create by Electron BrowserWindow
 * @see {@link https://www.electronjs.org/docs/api/browser-window} BrowserWindow
 */
class ConfigWindow {
  /**
   * BrowserWindow, create by Electron
   */
  window;

  /**
   * Create window
   */
  constructor() {
    this.window = new BrowserWindow({
      width: 480,
      height: 400,
      webPreferences: {
        nodeIntegration: true
      }
    });
    this.window.on('closed', () => console.debug('close config window...'));
    this.window.loadFile(config.htmlPath.preferences)
        .then(() => console.debug('create config window...'));
  }

}

export default ConfigWindow;
