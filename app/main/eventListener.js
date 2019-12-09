import {ipcMain} from "electron";
import {changeDB} from "./dbManager";
import {createSubWindow} from './windowManger'

export function listenChangeDB() {
  ipcMain.on('changeDB', (event, args) => {
    changeDB(args.action)
  })
}

export function listenCreateWindow() {
  ipcMain.on('createNewWindow', (event, args) => {
    createSubWindow(args.route, args.word);
  });
}
