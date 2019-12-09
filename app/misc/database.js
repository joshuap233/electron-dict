const fs = require('fs-extra');

let {app, remote} = require('electron');

const path = require('path');

app = process.type === 'renderer' ? remote.app : app;

const dataStore = require('lowdb');

const FileSync = require('lowdb/adapters/FileSync');

const STORE_PATH = app.getPath('userData');

const init = require('../constants/init');

if (process.type !== 'renderer') {
  if (!fs.pathExistsSync(STORE_PATH)) {
    fs.mkdirpSync(STORE_PATH);
  }
}

const adapter = new FileSync(
  path.join(STORE_PATH, '/data.json'), {
    defaultValue: init
  }
);
export const db = dataStore(adapter);


