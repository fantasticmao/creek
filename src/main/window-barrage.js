import {BrowserWindow, screen} from "electron";
import config from "../common/config";

let window = null;

/**
 * create barrage window, which is transparent and frameless
 */
const createBarrageWindow = async () => {
  const display = screen.getPrimaryDisplay();
  window = new BrowserWindow({
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
  window.setIgnoreMouseEvents(process.env.PROD);
  window.setAlwaysOnTop(process.env.PROD, 'pop-up-menu');
  await window.loadFile(config.htmlPath.barrage);

  // TODO 支持 Vue-Devtools
};

const closeBarrageWindow = async () => {
  if (window) {
    window.close();
  }
};

export {createBarrageWindow, closeBarrageWindow};
