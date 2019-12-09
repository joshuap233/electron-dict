import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';

function BriefDict(props) {
  const {
    handleOnWordClick,
    classes,
    fetchData,
    name,
    enName,
    url
  } = props;
  const [tag, setTags] = useState('');
  const [isHidden, setIsHidden] = useState(false);
  const urlList = url.split('%s');

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetchData(setTags, urlList, enName, {signal});
    return () => {
      abortController.abort();
    };
  });

  return (
    <Grid container justify="center">
      <Grid onClick={() => setIsHidden(!isHidden)}>{name}</Grid>
      <Grid container alignItems="center" justify="center">
        {
          isHidden ? null :
            <Grid className={`${classes[enName] ? classes[enName] : null} ${classes.common}`}>
              <div onClick={e => handleOnWordClick(e, enName)} dangerouslySetInnerHTML={{__html: tag}}/>
            </Grid>
        }
      </Grid>
    </Grid>
  );
}


export default BriefDict;
