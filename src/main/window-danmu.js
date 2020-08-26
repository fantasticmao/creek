import {BrowserWindow, screen} from 'electron';

/**
 * Danmu window, which is create by Electron BrowserWindow
 * @see {@link https://www.electronjs.org/docs/api/browser-window} BrowserWindow
 * @author fantasticmao <maomao8017@gmail.com>
 * @since 1.0.0
 */
class DanmuWindow {
  /**
   * BrowserWindow, create by Electron
   */
  window;

  /**
   * Create window
   */
  constructor() {
    const display = screen.getPrimaryDisplay();
    this.window = new BrowserWindow({
      width: process.env.PROD ? display.size.width : 1200,
      height: process.env.PROD ? display.size.height : 800,
      x: 0,
      y: 0,
      frame: process.env.DEV,
      transparent: process.env.PROD,
      webPreferences: {
        nodeIntegration: true,
        devTools: process.env.DEV
      }
    });

    this.window.setIgnoreMouseEvents(process.env.PROD);
    this.window.setAlwaysOnTop(process.env.PROD, 'pop-up-menu');
    this.window.on('closed', () => console.debug('close danmu window...'));
    this.window.loadFile('./dist/danmu.html')
        .then(() => console.debug('create danmu window...'));
  }

  /**
   * Close window
   */
  close() {
    this.window.close();
  }
}

export default DanmuWindow;
