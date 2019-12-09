import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  webview: {
    margin: "0",
    width: 580,
    height: 680,
    display: (props) => (props.isHidden ? "none" : "")
  },
  logo: {
    width: 32,
    height: 32
  }
}));
