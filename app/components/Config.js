import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {makeStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {CHECKBOX, DICT_LIST, TEXTFIELD} from './Items';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

export default function Config(props) {
  const classes = useStyles();
  const {
    change_config,
    tempConfig,
    isUsing,
    handleShortcutsChange,
    handleDefaultDictChange,
    handleChangeUsing
  } = props;

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
            onChange={handleDefaultDictChange}
          >
            {
              DICT_LIST.map(dict => (
                <MenuItem key={dict.name} value={dict.route}>{dict.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </Grid>
      {
        TEXTFIELD.map(item => (
          <Grid item key={item.name}>
            <TextField
              onClick={() => handleShortcutsChange(item.name, '')}
              onKeyDown={e => handleShortcutsChange(item.name, e)}
              value={tempConfig[item.name]}
              label={item.label}
              variant="outlined"/>
          </Grid>
        ))
      }
      <Grid item container>
        <List component="nav" aria-label="main mailbox folders">
          {
            CHECKBOX.map(item => (
              <ListItem key={item.label}>
                {
                  item.checkbox.map(icon => (
                    <ListItemIcon key={icon.type}>
                      <FormControlLabel
                        control={<Checkbox
                          checked={isUsing[icon.type][icon.name]}
                          onChange={() => handleChangeUsing(icon.type, icon.name)}
                          color="primary"
                        />}
                        label={icon.label}/>
                    </ListItemIcon>
                  ))
                }
                <ListItemText primary={item.label}/>
              </ListItem>
            ))
          }
        </List>
      </Grid>
    </Grid>
  );
}
