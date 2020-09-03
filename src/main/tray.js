import {Menu, nativeImage, shell, Tray} from 'electron';
import CreekServer from './server';
import {ConfigWindow, DanmuWindow} from './window';
import logoUrl from '../static/logo/creek.png';
import serverOnUrl from '../static/icons/server-on.png';
import serverOffUrl from '../static/icons/server-off.png';

const logo = nativeImage.createFromDataURL(logoUrl);
const serverOn = nativeImage.createFromDataURL(serverOnUrl);
const serverOff = nativeImage.createFromDataURL(serverOffUrl);

/**
 * Creek Tray
 * @see {@link https://www.electronjs.org/docs/api/tray} Electron Tray
 * @author fantasticmao <maomao8017@gmail.com>
 * @since 1.0.0
 */
class CreekTray {
  /**
   * Tray, create by Electron
   * @type {Electron.Tray}
   */
  tray = null;

  /**
   * BrowserWindow, create by Electron
   * @type {Electron.BrowserWindow}
   */
  danmuWindow = null;

  /**
   * ConfigWindow, create by Electron
   * @type {Electron.BrowserWindow}
   */
  configWindow = null;

  /**
   * Local Danmu Server, create By Creek application
   * @type {CreekServer}
   */
  creekServer = null;

  /**
   * Tray's menu base template
   */
  baseMenuTemplate = [
    {type: 'separator'},
    {label: 'Check for Updates...', click: () => shell.openExternal('https://github.com/fantasticmao/creek/releases')},
    {label: 'Preferences...', accelerator: 'Command+,', click: () => this.createConfigWindow('display')},
    {label: 'About Creek', click: () => this.createConfigWindow('about')},
    {type: 'separator'},
    {label: 'Quite Creek', accelerator: 'Command+Q', role: 'quit'}
  ];

  constructor() {
    this.tray = new Tray(logo);
    this.tray.setToolTip('Creek');
    if (global.__config.startupState) {
      this.turnOn();
    } else {
      this.turnOff();
    }
  }

  /**
   * Turn on the danmu display
   */
  turnOn() {
    // create danmu window
    this.createDanmuWindow();

    // reset tray menu
    const menuTemplate = [{
      label: 'Creek: On',
      enabled: false,
      icon: serverOn
    }, {
      label: 'Turn Creek Off',
      accelerator: 'Command+S',
      click: () => this.turnOff()
    }].concat(this.baseMenuTemplate);
    this.tray.setContextMenu(Menu.buildFromTemplate(menuTemplate));
  }

  /**
   * Turn off the danmu display
   */
  turnOff() {
    // close danmu window
    this.closeDanmuWindow();

    // reset tray menu
    const menuTemplate = [{
      label: 'Creek: Off',
      enabled: false,
      icon: serverOff
    }, {
      label: 'Turn Creek On',
      accelerator: 'Command+S',
      click: () => this.turnOn()
    }].concat(this.baseMenuTemplate);
    this.tray.setContextMenu(Menu.buildFromTemplate(menuTemplate));
  }

  /**
   * Create the danmu window, start the local danmu server if 'enableLocalServer' is true
   */
  createDanmuWindow() {
    // create local danmu server
    if (global.__config.enableLocalServer && this.creekServer === null) {
      this.creekServer = new CreekServer();
      this.creekServer.startup(global.__config.localServerPort, global.__config.localServerHost);
    }

    // create danmu window
    if (this.danmuWindow === null) {
      this.danmuWindow = new DanmuWindow();
    }

    // save application startup state
    if (!global.__config.startupState) {
      global.__config.updateAndFlush('startupState', true);
    }
  }

  /**
   * Close the danmu window
   */
  closeDanmuWindow() {
    // close local danmu server
    if (this.creekServer !== null) {
      this.creekServer.shutdown();
      this.creekServer = null;
    }

    // close danmu window
    if (this.danmuWindow !== null) {
      this.danmuWindow.close();
      this.danmuWindow = null;
    }

    // save application startup state
    if (global.__config.startupState) {
      global.__config.updateAndFlush('startupState', false);
    }
  }

  /**
   * Create the config window, locate to target route
   * @param {String} route - target route
   */
  createConfigWindow(route) {
    if (this.configWindow === null) {
      this.configWindow = new ConfigWindow(route);
      this.configWindow.on('closed', () => {
        this.configWindow = null;
      });
      return;
    }

    if (this.configWindow.isMinimized()) {
      this.configWindow.restore();
    } else if (!this.configWindow.isVisible()) {
      this.configWindow.focus();
    } else {
      this.configWindow.show();
    }

    // locate to target route
    this.configWindow.webContents.send('window-config-route', route);
  }
}

export default CreekTray;
