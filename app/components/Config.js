import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {makeStyles} from '@material-ui/core/styles';
import route from '../constants/routes';
import keyCodeMap from '../constants/keyCodeMap';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button";
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

const DICT_LIST = [
  {route: route.WEB_DICT, name: "网页字典"},
  {route: route.BRIEF_DICT, name: "简洁字典"},
];


export default function Config(props) {
  const classes = useStyles();
  const {defaultDict, shortcuts, change_config, using} = props;
  const [tempConfig, setTempConfig] = useState({
    defaultDict: defaultDict,
    searchWord: shortcuts.searchWord,
    globalWakeUp: shortcuts.globalWakeUp,
  });

  const [isUsing, setIsUsing] = useState(using);

  function handleShortcutsChange(name, value) {
    const temp = {...tempConfig};
    temp[name] = value;
    setTempConfig(temp);
  }

  return (
    <Grid container alignItems="center" style={{padding: "40px"}} spacing={2} justify="space-between">
      <Grid item container alignItems="center" justify="space-between">
        <Grid onClick={() => change_config({...tempConfig, using: isUsing})}>
          <Button variant="contained" color="primary">
            保存所有设置
          </Button>
        </Grid>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>默认字典</InputLabel>
          <Select
            value={tempConfig.defaultDict}
            onChange={(e) => setTempConfig({...tempConfig, defaultDict: e.target.value})}
          >
            {
              DICT_LIST.map(dict => (
                <MenuItem key={dict.name} value={dict.route}>{dict.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <TextField
          onClick={() => handleShortcutsChange('globalWakeUp', '')}
          onKeyDown={e => handleShortcutsChange('globalWakeUp', `${tempConfig.globalWakeUp} ${keyCodeMap[e.keyCode]}`)}
          value={tempConfig.globalWakeUp}
          label="唤醒快捷键"
          variant="outlined"/>
      </Grid>
      <Grid item>
        <TextField
          onClick={() => handleShortcutsChange('searchWord', '')}
          onKeyDown={e => handleShortcutsChange('searchWord', `${tempConfig.searchWord} ${keyCodeMap[e.keyCode]}`)}
          value={tempConfig.searchWord}
          label="查词快捷键"
          variant="outlined"/>
      </Grid>
      <Grid item container>
        <List component="nav" aria-label="main mailbox folders">
          <ListItem>
            <ListItemIcon>
              <FormControlLabel
                control={<Checkbox
                  checked={isUsing.webDict.bing}
                  onChange={() => setIsUsing({
                    ...isUsing,
                    webDict: {...isUsing.webDict, bing: !isUsing.webDict.bing}
                  })}
                  color="primary"
                />}
                label="网页词典"
              />
            </ListItemIcon>
            <ListItemIcon>
              <FormControlLabel
                control={<Checkbox
                  checked={isUsing.briefDict.bing}
                  onChange={() => setIsUsing({
                    ...isUsing,
                    briefDict: {...isUsing.briefDict, bing: !isUsing.briefDict.bing}
                  })}
                  color="primary"
                />}
                label="简洁词典"
              />
            </ListItemIcon>
            <ListItemText primary="必应词典"/>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FormControlLabel
                control={<Checkbox
                  checked={isUsing.webDict.youdao}
                  onChange={() => setIsUsing({
                    ...isUsing,
                    webDict: {...isUsing.webDict, youdao: !isUsing.webDict.youdao}
                  })}
                  color="primary"
                />}
                label="网页词典"
              />
            </ListItemIcon>
            <ListItemIcon>
              <FormControlLabel
                control={<Checkbox
                  checked={isUsing.briefDict.youdao}
                  onChange={() => setIsUsing({
                    ...isUsing,
                    briefDict: {...isUsing.briefDict, youdao: !isUsing.briefDict.youdao}
                  })}
                  color="primary"
                />}
                label="简洁词典"
              />
            </ListItemIcon>
            <ListItemText primary="有道词典"/>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}
