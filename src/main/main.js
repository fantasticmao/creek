import {app, BrowserWindow, Menu, screen, Tray} from 'electron';
import config from "../common/config";

/**
 * create application tray
 */
let tray = null;

const createTray = async () => {
  tray = new Tray(config.imagePath.logo);
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
let server = null;

const startLocalServer = async () => {
  const port = process.env.LOCAL_SERVER_PORT;
  const host = process.env.LOCAL_SERVER_HOST;
  import('./server')
      .then(module => module.default)
      .then(app => {
        server = app.listen(port, host, () => {
          console.log('start local server...');
        })
      })
      .catch(console.error);
};

const closeLocalServer = async () => {
  if (server) {
    server.close(() => {
      console.log('close local server...');
    });
  }
};

app.whenReady()
    .then(createTray)
    .then(startLocalServer)
    .catch(console.error);

app.on('window-all-closed', () => {
  // should not quit
});

app.on('quit', closeLocalServer);
