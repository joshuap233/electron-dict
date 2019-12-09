import {globalShortcut, Notification} from "electron";
import {createMainWindow, createSubWindow} from './windowManger';
import {dbShortcutsValue} from './dbManager';

let {searchWord, globalWakeUp} = dbShortcutsValue;

function formatShortcuts(shortcuts: Object) {
  return shortcuts
    .replace('ctrl', 'CommandOrControl')
    .replace(/\s/g, '+')
    .trimLeft();
}

export function registerShortcuts() {


  if (searchWord) {
    searchWord = formatShortcuts(searchWord);
    globalShortcut.register(searchWord, () => {
      let subWindow = createSubWindow();
      subWindow.webContents.send('search');
    });

    if (!globalShortcut.isRegistered(searchWord)) {
      let option = {
        title: '通知',
        body: `${searchWord}已被注册`
      };
      let n = new Notification(option);
      n.show();
    }
  }

  if (globalWakeUp) {
    globalWakeUp = formatShortcuts(globalWakeUp);
    globalShortcut.register(globalWakeUp, () => {
      createMainWindow();
    });

    if (!globalShortcut.isRegistered(globalWakeUp)) {
      let option = {
        title: '通知',
        body: `${globalWakeUp}已被注册`
      };
      let n = new Notification(option);
      n.show();
    }
  }
}

export function clearShorts() {
  globalShortcut.unregisterAll();
}
