import React from 'react';
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import {getRandomColor} from './Items';

export default function History(props) {
  const {history, delete_word, handleClick} = props;
  return (
    <Grid style={{padding: "40px"}} container justify="center" alignItems="center">
      <Grid container spacing={2}>
        {
          history.map(word => (
            <Grid item xs key={word}>
              <Chip
                avatar={<Avatar>{word[0]}</Avatar>}
                color={getRandomColor()}
                variant="outlined"
                size="medium"
                label={word}
                onDelete={() => delete_word(word)}
                onClick={() => handleClick(word)}
              />
            </Grid>
          ))
        }
      </Grid>
    </Grid>
  );


}

