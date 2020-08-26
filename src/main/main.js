import {app} from 'electron';
import installExtension, {VUEJS_DEVTOOLS} from 'electron-devtools-installer';
import CreekServer from './server';
import CreekTray from './tray';
import config from './config';

let creekServer = null;

app.whenReady()
    .then(() => new CreekTray(config.startupStatus))
    .then(() => {
      /*
       * Load chrome extension: Vue-Devtools.
       * However, electron@9.0.0 has some bugs when installing Vue-Devtools, so we have to downgrade to electron@8.4.1.
       * see https://github.com/electron/electron/issues/23662
       */
      if (process.env.DEV) {
        installExtension(VUEJS_DEVTOOLS)
            .then((name) => console.info(`Added Extension:  ${name}`))
            .catch((err) => console.info('An error occurred: ', err));
      }
    })
    .then(() => creekServer = new CreekServer())
    .then(() => creekServer.startup(config.localServerPort, config.localServerHost))
    .catch(console.error);

app.on('quit', () => creekServer.shutdown());

app.on('window-all-closed', () => {
  // should not quit
});
