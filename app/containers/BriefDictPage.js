import React from 'react';
import BriefDict from '../components/BriefDicts';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import * as action from "../actions/action";
import cheerio from "cheerio";
import requests from "../misc/requests";
import {useStyles} from "../components/briefDictStyle";
import Grid from "@material-ui/core/Grid";

function BriefDicts(props) {
  const classes = useStyles();
  const {location, dicts, setWord,using} = props;
  let {word} = props;
  //跳转至当简洁字典,使用store里储存的的word,否则使用查询参数里的word
  if (!word) {
    word = location.search.replace("?", "");
    //传来的参数被编码,解码储存
    setWord(decodeURI(word));
  }
  return (
    <Grid container justify="center">
      {
        dicts.map((dict) => (
          using.briefDict[dict.enName] ?
            <BriefDict key={dict.name} {...{
              handleOnWordClick,
              fetchData,
              classes,
              url: dict.url,
              name: dict.name,
              enName: dict.enName
            }}/> : null
        ))
      }
    </Grid>
  );

  function handleOnWordClick(e, enName) {
    e.preventDefault();
    const href = e.target.href;
    const regex = getRegex(enName);
    const matchWord = regex.exec(href);
    //跳转至点击的单词
    if (matchWord) {
      setWord(matchWord[1]);
    }
  }

  //解析出单词的部分解释
  function parse(data, name) {
    const $ = cheerio.load(data);
    if (name === 'bing') {
      let result = $.html('div.qdef > .hd_area') + $.html('div.qdef > ul');
      if (!result) {
        //长句翻译
        result = $.html('.rs_area');
      }
      return result;
    } else if (name === 'youdao') {
      const chunk = $.html('#ec');
      let result = chunk ? chunk : $.html('#ce');
      if (!result) {
        //长句翻译
        result = $.html('#fanyi') ? $.html('#fanyi') : $.html('#web_trans_contentWrp');
      }
      return result;
    }
  }

  //部分单词为a标签,可以点击,匹配url里的单词
  function getRegex(name) {
    if (name === 'bing') {
      return /search\?q=([a-zA-Z]*)?&/;
    } else if (name === 'youdao') {
      return /\?q=([a-zA-Z]*)/;
    }
  }

  function fetchData(setTags, urlList, enName, signal) {
    requests(`${urlList[0]}${word}${urlList[1]}`, signal).then(res => {
      setTags(parse(res.data, enName));
    }).catch(e => {
      console.log(e);
    });
  }
}

const mapStateToProps = (state) => ({
  word: state.search.word,
  defaultDict: state.search.defaultDict,
  dicts: state.search.dicts,
  using: state.search.using
});

const mapDispatchToProps = (dispatch) => bindActionCreators(action, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BriefDicts);
