import {dbDefaultDictValue} from "./dbManager";
import {BrowserWindow, clipboard, Menu, Tray} from "electron";
import path from "path";

const windows = new Set();
let tray;

let iconPath;
let indexPath;

if (process.env.NODE_ENV === 'production') {
  iconPath = path.join(__dirname, 'static', '16x16.png');
  indexPath = `file://${__dirname}/app.html`;
} else {
  iconPath = path.join(__dirname, '../static', '16x16.png');
  indexPath = `file://${__dirname}/../app.html`;
}

export function createMenu() {
  tray = new Tray(iconPath);
  const contextMenu = Menu.buildFromTemplate([
    {label: '退出', role: 'quit'},
    {
      label: '设置', click: () => {
        createMainWindow();
      }
    },
  ]);
  tray.setToolTip('dict');
  tray.setContextMenu(contextMenu);
}


function listenWindowsEvent(window: BrowserWindow) {
  window.on('blur', () => {
    if (process.env.NODE_ENV === 'production') {
      window.close();
    }
    // setTimeout(() => {
    //   window.close()
    // },5000)
  });
  window.once('ready-to-show', () => {
    window.show();
  });

  window.webContents.on('did-finish-load', () => {
    if (!window) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      window.minimize();
    } else {
      window.show();
      window.focus();
    }
  });

  window.on('closed', () => {
    windows.delete(window);
    window = null;
  });
}

export function createSubWindow(route, word) {
  route = route ? route : dbDefaultDictValue;
  word = word ? word : clipboard.readText('selection');
  let subWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 580,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true
    }
  });
  subWindow.loadURL(`${indexPath}#${route}?${word}`);
  listenWindowsEvent(subWindow);
  windows.add(subWindow);
  return subWindow;
}


export function createMainWindow() {
  let mainWindow = new BrowserWindow({
    show: false,
    width: 580,
    height: 465,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
    }
  });
  mainWindow.loadURL(indexPath);
  windows.add(mainWindow);
  listenWindowsEvent(mainWindow);
}

export function destroyWindows() {
  windows.clear();
}

export function destroyTray() {
  if (tray) {
    tray.destroy();
  }
}
