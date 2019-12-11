import React, {createRef, useLayoutEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {useStyles} from "./webDictStyle";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import {WEB_DiCT_BUTTONS} from './Items';

function WebDict(props) {
  const node = createRef();
  const {
    word,
    insertCss,
    insertJs,
    url,
    name
  } = props;
  //解析出真正的请求url(去除%s占位符)
  const urlList = url.split('%s');
  const [isHidden, setIsHidden] = useState(false);
  const classes = useStyles({isHidden});

  useLayoutEffect(() => {
    node.current.addEventListener('dom-ready', () => {
      try {
        node.current.insertCSS(insertCss);
        node.current.executeJavaScript(insertJs);
      } catch (e) {

      }
      return node.current.removeEventListener('dom-ready', () => {
        console.log("clear dom-ready event");
      });
    });
  }, [node]);

  return (
    <>
      <Grid
        container
        justify="flex-start" alignItems="center">
        <MenuBookIcon/>
        <Button
          title={isHidden ? "点击显示" : "点击隐藏"}
          onClick={() => setIsHidden(!isHidden)}
          className={classes.button}>
          {name}
        </Button>
        {
          WEB_DiCT_BUTTONS.map(button => (
            <Button key={button.name} onClick={() => {
              button.handleClick(node);
            }}>
              {
                button.icon
              }
            </Button>
          ))
        }
      </Grid>
      <webview
        useragent="Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"
        ref={node}
        src={`${urlList[0]}${word}${urlList[1]}`}
        className={classes.webview}
      />
    </>
  );
}


export default WebDict;
