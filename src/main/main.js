import {app} from 'electron';
import CreekServer from './server';
import CreekTray from './tray';

// TODO read from config file
const port = process.env.LOCAL_SERVER_PORT;
const host = process.env.LOCAL_SERVER_HOST;
const initStatus = false;

let creekServer = null;

app.whenReady()
    .then(() => new CreekTray(initStatus))
    .then(() => creekServer = new CreekServer())
    .then(() => creekServer.startup(port, host))
    .catch(console.error);

app.on('quit', () => creekServer.shutdown());

app.on('window-all-closed', () => {
  // should not quit
});
