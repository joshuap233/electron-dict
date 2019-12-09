import React from 'react';
import {connect} from 'react-redux';
import Config from '../components/Config';
import {bindActionCreators} from "redux";
import * as action from "../actions/action";



const mapStateToProps = (state) => ({
  defaultDict: state.search.defaultDict,
  dict: state.search.dict,
  shortcuts: state.search.shortcuts,
  using:state.search.using
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(action, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Config);
