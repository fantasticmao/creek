import {app, ipcMain, screen} from 'electron';
import installExtension, {VUEJS_DEVTOOLS} from 'electron-devtools-installer';
import CreekTray from './tray';
import CreekConfig from './config';
import logger from './logger';

let tray;

app.whenReady()
    .then(() => global.__config = new CreekConfig())
    .then(() => tray = new CreekTray())
    .then(() => registerEvents())
    .then(() => logger.debug('main', 'application ready'))
    .then(() => {
      /*
       * Load chrome extension: Vue-Devtools.
       * However, electron@9.0.0 has some bugs when installing Vue-Devtools, so we have to downgrade to electron@8.4.1.
       * see https://github.com/electron/electron/issues/23662
       */
      if (process.env.DEV) {
        installExtension(VUEJS_DEVTOOLS)
            .then(name => logger.debug('main', `Added Extension:  ${name}`))
            .catch(error => logger.debug('main', `An error occurred: ${error.message}`));
      }
    })
    .catch(error => logger.error('main', error.message));

app.on('window-all-closed', () => {
  // should not quit
});

app.on('quit', () => logger.debug('main', 'application quit'));

function registerEvents() {
  // add event listeners for global config modification
  for (const key in global.__config) {
    if (global.__config.hasOwnProperty(key)) {
      ipcMain.on(`main-config-changed-${key}`, (event, value) => {
        logger.info('main', `monitor global config changed, key: ${key}, value: ${value}`);
        global.__config.updateAndFlush(key, value);
        if (tray.danmuWindow !== null) {
          tray.danmuWindow.webContents.send(key, value);
        }
      });
    }
  }

  // add event listeners for window movement
  ipcMain.on('window-danmu-move', (event, displayId) => {
    logger.info('main', `capture moving danmu window event, displayId: ${displayId}`);
    if (tray.danmuWindow !== null) {
      const toDisplay = screen.getAllDisplays()
          .filter(display => display.id === displayId);
      if (!toDisplay || toDisplay.length !== 1) {
        logger.error('main', 'move danmu window error');
        return;
      }

      tray.danmuWindow.setBounds({
        width: toDisplay[0].workArea.width,
        height: toDisplay[0].workArea.height,
        x: toDisplay[0].workArea.x,
        y: toDisplay[0].workArea.y
      });
    }
  });
}
