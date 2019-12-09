const {push} = require('connected-react-router');
export const DELETE_WORD = 'DELETE_WORD';
export const CHANGE_DEFAULT_DICT = 'CHANGE_DEFAULT_DICT';
export const CHANGE_SEARCH_WORD = "CHANGE_SEARCH_WORD";
export const CHANGE_CONFIG = 'CHANGE_CONFIG';
export const CHANGE_DICT_USING = 'CHANGE_DICT_USING';

export function setWord(word) {
  return {
    type: CHANGE_SEARCH_WORD,
    word
  };
}

export function changeTo(path) {
  return (dispatch, getState) => {
    //防止重复提交route
    if (getState().router.location.pathname !== path) {
      dispatch(push(path));
    }
  };
}


export function change_default_dict(defaultDict) {
  return {
    type: CHANGE_DEFAULT_DICT,
    defaultDict
  };
}

export function delete_word(word) {
  return {
    type: DELETE_WORD,
    word
  };
}

export function change_config(config) {
  return {
    type: CHANGE_CONFIG,
    config
  };
}

export function change_dict_using(config) {
  return {
    type: CHANGE_DICT_USING,
    config
  };
}
