import React from 'react';
import History from "../components/History";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as action from '../actions/action';
import {ipcRenderer} from "electron";

const mapStateToProps = (state) => ({
  history: state.search.history,
  defaultDict: state.search.defaultDict,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(action, dispatch);

function HistoryPage(props) {
  const {history, delete_word, setWord, defaultDict} = props;
  return (
    <History {...{history, handleClick, delete_word}}/>
  );

  function handleClick(word) {
    setWord(word);
    createNewWindow(defaultDict, word);
  }

  function createNewWindow(routers, word) {
    ipcRenderer.send('createNewWindow', {routers, word});
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryPage);
