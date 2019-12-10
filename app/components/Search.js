import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import {useStyles} from "./searchStyle";
import {SEARCH_BUTTONS} from "./Items";

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
          {
            SEARCH_BUTTONS.map(button => (
              <Button
                key={button.name}
                onClick={() => changeTo(button.route)}
                color={SEARCH_BUTTONS.getColor(location,button.route)}>
                {button.name}
              </Button>
            ))
          }
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}
