import {BrowserWindow} from "electron";
import config from "../common/config";

let window = null;

/**
 * create config window
 */
const createConfigWindow = async () => {
  window = new BrowserWindow({
    width: 480,
    height: 400,
    webPreferences: {
      nodeIntegration: true
    }
  });
  await window.loadFile(config.htmlPath.preference);
};

export {createConfigWindow};
