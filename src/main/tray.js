import {Menu, shell, Tray} from "electron";
import config from "../common/config";
import ConfigWindow from "./window-config";
import BarrageWindow from "./window-barrage";

/**
 * Tray's menu base template
 */
const menuBaseTemplate = [
  {type: 'separator'},
  {label: 'Check for Updates...', click: () => shell.openExternal(config.checkForUpdates)},
  {label: 'Preferences...', accelerator: 'Command+,', click: () => new ConfigWindow()},
  {label: 'About Creek'},
  {type: 'separator'},
  {label: 'Quite Creek', accelerator: 'Command+Q', role: 'quit'}
];

/**
 * Tray, which is create by Electron Tray
 * @see {@link https://www.electronjs.org/docs/api/tray} Electron Tray
 */
class CreekTray {
  /**
   * Tray, create by Electron
   */
  tray;
  /**
   * BrowserWindow, create by Electron
   * @default null
   */
  barrageWindow = null;

  /**
   * Create tray
   * @param {boolean} status - Turn on or turn off
   */
  constructor(status) {
    this.tray = new Tray(config.imagePath.logo);
    this.tray.setToolTip('Creek');
    if (status) {
      this.turnOn();
    } else {
      this.turnOff();
    }
  }

  turnOn() {
    // create barrage window
    if (this.barrageWindow === null) {
      this.barrageWindow = new BarrageWindow();
    }

    // reset tray menu
    const menuTemplate = [
      {label: 'Creek: On', enabled: false, icon: config.imagePath.serverOn},
      {label: 'Turn Creek Off', accelerator: 'Command+S', click: () => this.turnOff()}
    ].concat(menuBaseTemplate);
    this.tray.setContextMenu(Menu.buildFromTemplate(menuTemplate));
  }

  turnOff() {
    // close barrage window
    if (this.barrageWindow !== null) {
      this.barrageWindow.close();
      this.barrageWindow = null;
    }

    // reset tray menu
    const menuTemplate = [
      {label: 'Creek: Off', enabled: false, icon: config.imagePath.serverOff},
      {label: 'Turn Creek On', accelerator: 'Command+S', click: () => this.turnOn()}
    ].concat(menuBaseTemplate);
    this.tray.setContextMenu(Menu.buildFromTemplate(menuTemplate));
  }

}

export default CreekTray;
