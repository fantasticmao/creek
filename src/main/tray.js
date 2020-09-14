import {app, BrowserWindow, dialog, Menu, nativeImage, nativeTheme, shell, Tray} from 'electron';
import CreekServer from './server';
import {ConfigWindow, DanmuWindow} from './window';
import {i18n, MODULE_TRAY} from '../common/i18n';
import logoWhiteUrl from '../resources/icon-white.iconset/icon_16x16.png';
import logoDarkUrl from '../resources/icon-dark.iconset/icon_16x16.png';
import onUrl from '../resources/on.png';
import offUrl from '../resources/off.png';

const logoWhite = nativeImage.createFromDataURL(logoWhiteUrl);
const logoDark = nativeImage.createFromDataURL(logoDarkUrl);
const on = nativeImage.createFromDataURL(onUrl);
const off = nativeImage.createFromDataURL(offUrl);

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
   * Tray's i18n words
   * @type {CreekTrayWords|CreekPreferencesWords}
   */
  trayWords = i18n(app.getLocale(), MODULE_TRAY);

  /**
   * Tray's menu base template
   */
  baseMenuTemplate = [{
    type: 'separator'
  }, {
    label: this.trayWords.checkForUpdates,
    click: () => shell.openExternal('https://github.com/fantasticmao/creek/releases')
  }, {
    label: this.trayWords.preferences,
    accelerator: 'Command+,',
    click: () => this.createConfigWindow('display')
  }, {
    type: 'submenu',
    label: this.trayWords.help,
    submenu: [{
      label: this.trayWords.help_Question1,
      click: () => dialog.showMessageBox({
        message: this.trayWords.help_Question1,
        detail: this.trayWords.help_Answer1.replace('#{port}', global.__config.localServerPort)
      })
    }, {
      label: this.trayWords.help_Question2,
      click: () => dialog.showMessageBox({
        message: this.trayWords.help_Question2,
        detail: this.trayWords.help_Answer2
      })
    }, {
      label: this.trayWords.help_MoreQuestions,
      click: () => shell.openExternal('https://github.com/fantasticmao/creek/wiki/Help')
    }]
  }, {
    label: this.trayWords.about,
    click: () => this.createConfigWindow('about')
  }, {
    type: 'separator'
  }, {
    label: this.trayWords.quite,
    accelerator: 'Command+Q', role: 'quit'
  }];

  constructor() {
    this.tray = new Tray(nativeTheme.shouldUseDarkColors ? logoWhite : logoDark);
    // add event listeners for system theme updated
    nativeTheme.on('updated', () => {
      this.tray.setImage(nativeTheme.shouldUseDarkColors ? logoWhite : logoDark);
    });
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
      label: this.trayWords.stateOn,
      enabled: false,
      icon: on
    }, {
      label: this.trayWords.turnOff,
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
      label: this.trayWords.stateOff,
      enabled: false,
      icon: off
    }, {
      label: this.trayWords.turnOn,
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
