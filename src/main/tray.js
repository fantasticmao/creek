import {ipcMain, Menu, shell, Tray} from 'electron';
import CreekServer from './server';
import {newConfigWindow, newDanmuWindow} from './windows';
import logger from './logger';

/**
 * Tray, create by Electron
 * @type {Electron.Tray}
 */
let tray = null;

/**
 * BrowserWindow, create by Electron
 * @type {Electron.BrowserWindow}
 */
let danmuWindow = null;

/**
 * ConfigWindow, create by Electron
 * @type {Electron.BrowserWindow}
 */
let configWindow = null;

/**
 * Local Danmu Server, create By Creek application
 * @type {CreekServer}
 */
let creekServer = null;

/**
 * Tray's menu base template
 */
const baseMenuTemplate = [
  {type: 'separator'},
  {label: 'Check for Updates...', click: () => shell.openExternal('https://github.com/fantasticmao/creek/releases')},
  {label: 'Preferences...', accelerator: 'Command+,', click: () => createConfigWindow('display')},
  {label: 'About Creek', click: () => createConfigWindow('about')},
  {type: 'separator'},
  {label: 'Quite Creek', accelerator: 'Command+Q', role: 'quit'}
];

/**
 * Turn on the danmu display
 */
function turnOn() {
  // create danmu window
  createDanmuWindow();

  // reset tray menu
  const menuTemplate = [{
    label: 'Creek: On',
    enabled: false,
    icon: './src/static/server-on.png'
  }, {
    label: 'Turn Creek Off',
    accelerator: 'Command+S',
    click: () => turnOff()
  }].concat(baseMenuTemplate);
  tray.setContextMenu(Menu.buildFromTemplate(menuTemplate));
}

/**
 * Turn off the danmu display
 */
function turnOff() {
  // close danmu window
  closeDanmuWindow();

  // reset tray menu
  const menuTemplate = [{
    label: 'Creek: Off',
    enabled: false,
    icon: './src/static/server-off.png'
  }, {
    label: 'Turn Creek On',
    accelerator: 'Command+S',
    click: () => turnOn()
  }].concat(baseMenuTemplate);
  tray.setContextMenu(Menu.buildFromTemplate(menuTemplate));
}

/**
 * Create the danmu window, start the local danmu server if 'enableLocalServer' is true
 */
function createDanmuWindow() {
  // create local danmu server
  if (global.__config.enableLocalServer && creekServer === null) {
    creekServer = new CreekServer();
    creekServer.startup(global.__config.localServerPort, global.__config.localServerHost);
  }

  // create danmu window
  if (danmuWindow === null) {
    danmuWindow = newDanmuWindow();
    danmuWindow.on('closed', () => {
      logger.info('tray', 'close danmu window...');
      danmuWindow = null;
    });
  }

  // save application startup state
  if (!global.__config.startupState) {
    global.__config.updateAndFlush('startupState', true);
  }
}

/**
 * Close the danmu window
 */
function closeDanmuWindow() {
  // close local danmu server
  if (creekServer !== null) {
    creekServer.shutdown(() => {
      logger.info('tray', 'close local server...');
      creekServer = null;
    });
  }

  // close danmu window
  if (danmuWindow !== null) {
    danmuWindow.close();
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
function createConfigWindow(route) {
  if (configWindow === null) {
    configWindow = newConfigWindow(route);
    configWindow.on('closed', () => {
      logger.info('tray', 'close config window...');
      configWindow = null;
    });
    return;
  }

  if (configWindow.isMinimized()) {
    configWindow.restore();
  } else if (!configWindow.isVisible()) {
    configWindow.focus();
  } else {
    configWindow.show();
  }

  // locate to target route
  configWindow.webContents.send('push-route', route);
}

/**
 * Add event listeners for config modification, notify to the danmu window if it's open
 */
function registerDanmuWindowEvents() {
  for (const key in global.__config) {
    if (global.__config.hasOwnProperty(key)) {
      ipcMain.on(key, (event, value) => {
        if (danmuWindow !== null) {
          logger.debug('tray', `monitored config change, start notify to danmu window, key: ${key}, value: ${value}`);
          danmuWindow.webContents.send(key, value);
        }
      });
    }
  }
}

/**
 * Tray, which is create by Electron Tray
 * @see {@link https://www.electronjs.org/docs/api/tray} Electron Tray
 * @author fantasticmao <maomao8017@gmail.com>
 * @since 1.0.0
 */
export function newTray() {
  tray = new Tray('./src/static/creek.png');
  tray.setToolTip('Creek');
  if (global.__config.startupState) {
    turnOn();
  } else {
    turnOff();
  }
  registerDanmuWindowEvents();
  return tray;
}
