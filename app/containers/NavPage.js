import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as action from "../actions/action";
import Nav from "../components/Nav";

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(action, dispatch);

export default connect(null, mapDispatchToProps)(Nav);
