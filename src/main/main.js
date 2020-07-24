import {app, BrowserWindow, Menu, screen, Tray} from 'electron';
import config from "../common/config";

let serverModule = null;

/**
 * create  application tray
 */
const createTray = async () => {
  const tray = new Tray(config.imagePath.logo);
  const contextMenu = Menu.buildFromTemplate([
    {label: 'Creek: On', enabled: false, icon: config.imagePath.serverOn},
    {label: 'Creek: Off', enabled: false, icon: config.imagePath.serverOff},
    {label: 'Turn Creek On', accelerator: 'Command+S', click: createBarrageWindow},
    {type: 'separator'},
    {label: 'Preferences...', accelerator: 'Command+,', click: createConfigWindow},
    {label: 'Check for Updates...'},
    {label: 'About Creek'},
    {type: 'separator'},
    {label: 'Quite Creek', accelerator: 'Command+Q', role: 'quit'},
  ]);
  tray.setToolTip('Creek');
  tray.setContextMenu(contextMenu);
};

/**
 * create barrage window, which is transparent and frameless
 */
const createBarrageWindow = async () => {
  const display = screen.getPrimaryDisplay();
  const barrageWindow = new BrowserWindow({
    width: display.size.width,
    height: display.size.height,
    x: 0,
    y: 0,
    frame: process.env.DEV,
    transparent: process.env.PROD,
    webPreferences: {
      devTools: process.env.DEV
    }
  });
  barrageWindow.setIgnoreMouseEvents(process.env.PROD);
  barrageWindow.setAlwaysOnTop(process.env.PROD, 'pop-up-menu');
  await barrageWindow.loadFile(config.htmlPath.barrage);

  // TODO 支持 Vue-Devtools
};

/**
 * create config window
 */
const createConfigWindow = async () => {
  const configWindow = new BrowserWindow({
    width: 480,
    height: 400,
    webPreferences: {
      nodeIntegration: true
    }
  });
  await configWindow.loadFile(config.htmlPath.preference);
};

/**
 * get barrage data from local server
 */
const startLocalServer = async () => {
  serverModule = import('./server');
  return serverModule;
};

app.whenReady()
    .then(createTray)
    .then(startLocalServer)
    .catch(console.error);

app.on('window-all-closed', () => {
  // should not quit
});

app.on('quit', () => {
  serverModule
      .then(module => {
        module.default.close();
        console.log('close local server...');
      })
      .catch(console.error);
});
