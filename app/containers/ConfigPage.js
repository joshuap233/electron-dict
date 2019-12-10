import React, {useState} from 'react';
import {connect} from 'react-redux';
import Config from '../components/Config';
import {bindActionCreators} from "redux";
import * as action from "../actions/action";
import keyCodeMap from "../constants/keyCodeMap";


const mapStateToProps = (state) => ({
  defaultDict: state.search.defaultDict,
  dict: state.search.dict,
  shortcuts: state.search.shortcuts,
  using: state.search.using
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(action, dispatch);

function ConfigPage(props) {
  const {defaultDict, shortcuts, using, change_config} = props;
  const [isUsing, setIsUsing] = useState(using);

  const [tempConfig, setTempConfig] = useState({
    defaultDict: defaultDict,
    searchWord: shortcuts.searchWord,
    globalWakeUp: shortcuts.globalWakeUp,
  });
  return <Config {...{
    change_config,
    isUsing,
    tempConfig,
    handleShortcutsChange,
    handleDefaultDictChange,
    handleChangeUsing
  }}/>;

  function handleShortcutsChange(name, value) {
    if (value) {
      value = `${tempConfig[name]} ${keyCodeMap[value.keyCode]}`;
    }
    const temp = {...tempConfig};
    temp[name] = value;
    setTempConfig(temp);
  }

  function handleDefaultDictChange(e) {
    const temp = {...tempConfig};
    temp.defaultDict = e.target.value;
    setTempConfig(temp);
  }

  function handleChangeUsing(type, name) {
    const temp = {...isUsing};
    temp[type][name] = !temp[type][name];
    setIsUsing(temp);
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigPage);
