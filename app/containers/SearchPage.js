import React from 'react';
import Search from "../components/Search";
import * as action from '../actions/action';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import {ipcRenderer} from "electron";

const mapStateToProps = (state) => ({
  defaultDict: state.search.defaultDict,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(action, dispatch);

function SearchPage(props) {
  const {setWord, defaultDict, changeTo, location} = props;
  return (
    <Search {...{handleKeyDown, handleBtnClick, changeTo, location}}/>
  );

  function createNewWindow(inputValue) {
    ipcRenderer.send('createNewWindow', {route: defaultDict, word: inputValue});
  }

  //搜索按钮点击
  function handleBtnClick(inputValue) {
    if (inputValue) {
      setWord(inputValue);
      createNewWindow(inputValue);
    }
  }

  //处理回车
  function handleKeyDown(e, inputValue) {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (inputValue) {
        setWord(inputValue);
        createNewWindow(inputValue);
      }
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
