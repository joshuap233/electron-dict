/* eslint global-require: off */
/**
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import {app} from 'electron';
import {autoUpdater} from 'electron-updater';
import log from 'electron-log';
import {listenChangeDB, listenCreateWindow} from './main/eventListener';
import {clearShorts, registerShortcuts} from './main/shortCutsRegister';
import {setSession} from './main/sessionManager';
import {createMainWindow, createMenu, destroyTray, destroyWindows} from './main/windowManger';

const gotTheLock = app.requestSingleInstanceLock();
export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

// 保证单一实例
if (!gotTheLock) {
  app.quit();
} else {
  app.on('ready', async () => {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      await installExtensions();
    }
    registerShortcuts();
    listenCreateWindow();
    listenChangeDB();
    setSession();
    createMainWindow();
    createMenu();
  });
}

app.on('window-all-closed', () => {
  // if (process.platform !== 'darwin') {
  //   app.quit();
  // }
});


app.on('will-quit', () => {
  clearShorts();
  destroyTray();
  destroyWindows();
  app.releaseSingleInstanceLock();
});

