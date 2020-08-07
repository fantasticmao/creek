import {app} from 'electron';
import installExtension, {VUEJS_DEVTOOLS} from 'electron-devtools-installer';
import CreekServer from './server';
import CreekTray from './tray';

// TODO read from config file
const port = process.env.LOCAL_SERVER_PORT;
const host = process.env.LOCAL_SERVER_HOST;
const initStatus = false;

let creekServer = null;

app.whenReady()
    .then(() => new CreekTray(initStatus))
    .then(() => {
      /*
       * Load chrome extension: Vue-Devtools.
       * However, electron@9.0.0 has some bugs when installing Vue-Devtools, so we have to downgrade to electron@8.4.1.
       * see https://github.com/electron/electron/issues/23662
       */
      if (process.env.DEV) {
        installExtension(VUEJS_DEVTOOLS)
            .then((name) => console.log(`Added Extension:  ${name}`))
            .catch((err) => console.log('An error occurred: ', err));
      }
    })
    .then(() => creekServer = new CreekServer())
    .then(() => creekServer.startup(port, host))
    .catch(console.error);

app.on('quit', () => creekServer.shutdown());

app.on('window-all-closed', () => {
  // should not quit
});
