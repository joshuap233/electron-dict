import {CHANGE_CONFIG, CHANGE_SEARCH_WORD, DELETE_WORD} from '../actions/action';
import {dbDefaultDictValue, dbDictsValue, dbHistoryValue, dbShortcutsValue, dbUsingValue} from '../main/dbManager';
import {ipcRenderer} from "electron";


const defaultState = {
  word: '',
  defaultDict: dbDefaultDictValue,
  history: dbHistoryValue,
  dicts: dbDictsValue,
  shortcuts: dbShortcutsValue,
  using: dbUsingValue,
};

export default function (state = defaultState, action) {
  ipcRenderer.send('changeDB', {action});
  const {type, word, config} = action;
  switch (type) {
    case CHANGE_SEARCH_WORD: {
      //如果有相同的词则删除,添加新词到末尾
      const history = new Set(state.history);
      history.delete(word);
      history.add(word);
      return {...state, word: word, history: [...history]};
    }
    case DELETE_WORD: {
      const history = state.history.slice();
      history.splice(history.indexOf(word), 1);
      return {...state, history};
    }
    case CHANGE_CONFIG: {
      return {
        ...state,
        shortcuts: {searchWord: config.searchWord, globalWakeUp: config.globalWakeUp},
        using: config.using
      };
    }
    default:
      return state;
  }
}
