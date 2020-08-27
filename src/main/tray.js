import {Menu, shell, Tray} from 'electron';
import CreekServer from "./server";
import {newConfigWindow, newDanmuWindow} from './windows';

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
      console.info('close danmu window...');
      danmuWindow = null;
    });
  }

  // save application startup state
  if (!global.__config.startupState) {
    global.__config.updateAndFlush('startupState', true);
  }
}

function closeDanmuWindow() {
  // close local danmu server
  if (creekServer !== null) {
    creekServer.shutdown(() => {
      console.info('close local server...');
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

function createConfigWindow(route) {
  if (configWindow === null) {
    configWindow = newConfigWindow(route);
    configWindow.on('closed', () => {
      console.info('close config window...');
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

  // push route
  configWindow.webContents.send('push-route', route);
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
  return tray;
}
