const {CHANGE_CONFIG, CHANGE_SEARCH_WORD, DELETE_WORD} = require("../actions/action");
const {db} = require('../misc/database');
const dbHistory = db.get('history');
const dbDefaultDict = db.get('defaultDict');
const dbDicts = db.get('dicts');
const dbShortcuts = db.get('shortcuts');
const dbUsing = db.get('using');
const addWordToHistory = (word) => {
  dbHistory.find('word') ? dbHistory.pull(word).write() : null;
  dbHistory.push(word).write();
};

const deleteWordFromHistory = (word) => {
  dbHistory.pull(word).write();
};

const changeDefaultDict = (defaultDict) => {
  if (dbDefaultDict.value() !== defaultDict) {
    db.update('defaultDict', () => defaultDict).write();
  }
};

const changeShortsCuts = (config) => {
  db.set('shortcuts.searchWord', config.searchWord).write();
  db.set('shortcuts.globalWakeUp', config.globalWakeUp).write();
};

const changeDictIsUsing = (using) => {
  db.set('using',using).write();
};

export const dbHistoryValue = dbHistory.value();
export const dbDefaultDictValue = dbDefaultDict.value();
export const dbDictsValue = dbDicts.value();
export const dbShortcutsValue = dbShortcuts.value();
export const dbUsingValue = dbUsing.value();
export const changeDB = (action) => {
  const {type, word, config} = action;
  switch (type) {
    case CHANGE_SEARCH_WORD: {
      addWordToHistory(word);
      break;
    }
    case DELETE_WORD: {
      deleteWordFromHistory(word);
      break;
    }
    case CHANGE_CONFIG: {
      changeDefaultDict(config.defaultDict);
      changeShortsCuts(config);
      changeDictIsUsing(config.using);
      break;
    }

  }
};

