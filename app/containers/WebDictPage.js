import React from 'react';
import WebDict from "../components/WebDicts";
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as action from "../actions/action";
import Grid from "@material-ui/core/Grid";

function WebDicts(props) {
  const {setWord, location, dicts,using} = props;
  let {word} = props;
  //跳转至当简洁字典,使用store里储存的的word,否则使用查询参数里的word
  if (!word) {
    word = location.search.replace("?", "");
    //传来的参数被编码,解码储存
    setWord(decodeURI(word));
  }
  return (
    <Grid direction="column" container justify="center" alignItems="center">
      {
        dicts.map((dict) => (
          using.webDict[dict.enName] ? <WebDict key={dict.name} {...{word, ...dict, location}}/> : null
        ))
      }
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  word: state.search.word, //当前搜索单词
  dicts: state.search.dicts,
  using: state.search.using
});

const mapDispatchToProps = (dispatch) => bindActionCreators(action, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WebDicts);
