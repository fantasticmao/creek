import {app} from 'electron';
import installExtension, {VUEJS_DEVTOOLS} from 'electron-devtools-installer';
import {newTray} from './tray';
import CreekConfig from './config';
import logger from './logger';

let tray;

app.whenReady()
    .then(() => global.__config = new CreekConfig())
    .then(() => tray = newTray())
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
