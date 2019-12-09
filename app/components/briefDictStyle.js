import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles({
  common: {
    '&': {
      borderRadius: '5px'
    },
    background: '#eee',
    width: '500px',
    paddingLeft: '20px',
    paddingRight: '20px',
    marginTop: '20px',
    '& h2 > div ,& .hd_p1_1': {
      fontSize: '14px',
      color: "#777",
      display: 'flex',
      justifyContent: "space-between"
    },
    '& a': {
      textDecoration: 'none',
      color: "#292421",
      '&.amend': {
        display: "none"
      }
    },
    '& ul': {
      padding: '0',
      fontWeight: 'bold',
      listStyleType: "none",
      lineHeight: "24px",
    }
  },

  bing: {
    '& h1': {
      lineHeight: '0'
    },
    '& .pos': {
      display: 'inline-block',
      width: '40px',
    }
  },
  youdao: {}
});
