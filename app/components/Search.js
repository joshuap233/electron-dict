import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import routers from '../constants/routes';
import {useStyles} from "./searchStyle";


export default function Search(props) {
  const {
    handleBtnClick,
    handleKeyDown,
    changeTo,
    location,
  } = props;

  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");

  return (
    // 搜索栏
    <Grid container alignItems="center" justify="space-between">
      <Paper component="form" className={classes.root}>
        <InputBase
          autoFocus
          onKeyDown={(e) => handleKeyDown(e, inputValue)}
          onChange={(e) => setInputValue(e.target.value)}
          className={classes.input}
          placeholder="Search"
          inputProps={{'value': inputValue}}
        />
        <IconButton
          className={classes.iconButton}
          onClick={() => handleBtnClick(inputValue)}
        >
          <SearchIcon/>
        </IconButton>
      </Paper>
      {/*词典导航栏*/}
      <Grid item>
        <ButtonGroup variant="contained" size="medium">
          <Button
            onClick={() => changeTo(routers.CONFIG)}
            color={isCurrentRoute(routers.CONFIG)}>设置</Button>
          <Button
            onClick={() => changeTo(routers.HISTORY)}
            color={isCurrentRoute(routers.HISTORY)}>单词本</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );

  function isCurrentRoute(route) {
    return (location.pathname) === route ? "primary" : "default";
  }
}
