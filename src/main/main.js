import {app, Menu, shell, Tray} from 'electron';
import config from "../common/config";
import {closeBarrageWindow, createBarrageWindow} from './window-barrage';
import {createConfigWindow} from './window-config';
import {closeServer, startServer} from './server';

/**
 * application tray
 */
let tray = null;

/**
 * application tray menu
 */
const menuTemplate = [
  {type: 'separator'},
  {label: 'Check for Updates...', click: () => shell.openExternal(config.checkForUpdates)},
  {label: 'Preferences...', accelerator: 'Command+,', click: createConfigWindow},
  {label: 'About Creek'},
  {type: 'separator'},
  {label: 'Quite Creek', accelerator: 'Command+Q', role: 'quit'},
];
const menuTemplateOn = [
  {
    label: 'Creek: On', enabled: false, icon: config.imagePath.serverOn
  }, {
    label: 'Turn Creek Off', accelerator: 'Command+S', click: () => {
      closeBarrageWindow().then(() => {
        if (tray) {
          // TODO set server inactive logo
          tray.setContextMenu(Menu.buildFromTemplate(menuTemplateOff))
        }
      });
    }
  }
].concat(menuTemplate);
const menuTemplateOff = [
  {
    label: 'Creek: Off', enabled: false, icon: config.imagePath.serverOff
  }, {
    label: 'Turn Creek On', accelerator: 'Command+S', click: () => {
      createBarrageWindow().then(() => {
        if (tray) {
          // TODO set server active logo
          tray.setContextMenu(Menu.buildFromTemplate(menuTemplateOn));
        }
      });
    }
  }
].concat(menuTemplate);

/**
 * create application tray
 */
const createTray = async () => {
  tray = new Tray(config.imagePath.logo);
  tray.setToolTip('Creek');
  tray.setContextMenu(Menu.buildFromTemplate(menuTemplateOff));
};

app.whenReady()
    .then(createTray)
    .then(startServer)
    .catch(console.error);

app.on('quit', closeServer);

app.on('window-all-closed', () => {
  // should not quit
});
