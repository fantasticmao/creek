import {Menu, shell, Tray} from 'electron';
import ConfigWindow from './window-config';
import DanmuWindow from './window-danmu';

/**
 * Tray's menu base template
 */
const menuBaseTemplate = [
  {type: 'separator'},
  {label: 'Check for Updates...', click: () => shell.openExternal('https://github.com/fantasticmao/creek/releases')},
  {label: 'Preferences...', accelerator: 'Command+,', click: () => new ConfigWindow()},
  {label: 'About Creek'},
  {type: 'separator'},
  {label: 'Quite Creek', accelerator: 'Command+Q', role: 'quit'}
];

/**
 * Tray, which is create by Electron Tray
 * @see {@link https://www.electronjs.org/docs/api/tray} Electron Tray
 * @author fantasticmao <maomao8017@gmail.com>
 * @since 1.0.0
 */
class CreekTray {
  /**
   * Tray, create by Electron
   */
  tray;
  /**
   * BrowserWindow, create by Electron
   * @default null
   */
  danmuWindow = null;

  /**
   * Create tray
   * @param {boolean} status - Turn on or turn off
   */
  constructor(status) {
    this.tray = new Tray('./src/static/creek.png');
    this.tray.setToolTip('Creek');
    if (status) {
      this.turnOn();
    } else {
      this.turnOff();
    }
  }

  turnOn() {
    // create danmu window
    if (this.danmuWindow === null) {
      this.danmuWindow = new DanmuWindow();
    }

    // reset tray menu
    const menuTemplate = [
      {label: 'Creek: On', enabled: false, icon: './src/static/server-on.png'},
      {label: 'Turn Creek Off', accelerator: 'Command+S', click: () => this.turnOff()}
    ].concat(menuBaseTemplate);
    this.tray.setContextMenu(Menu.buildFromTemplate(menuTemplate));
  }

  turnOff() {
    // close danmu window
    if (this.danmuWindow !== null) {
      this.danmuWindow.close();
      this.danmuWindow = null;
    }

    // reset tray menu
    const menuTemplate = [
      {label: 'Creek: Off', enabled: false, icon: './src/static/server-off.png'},
      {label: 'Turn Creek On', accelerator: 'Command+S', click: () => this.turnOn()}
    ].concat(menuBaseTemplate);
    this.tray.setContextMenu(Menu.buildFromTemplate(menuTemplate));
  }

}

export default CreekTray;
