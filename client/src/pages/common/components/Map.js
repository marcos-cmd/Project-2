import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import MapContainer from './MapContainer'
const useStyles = makeStyles((theme) => ({
  box:{
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    margin: '40px 0px 40px 40px',
  }

}))

 const Map = () => {
  const classes = useStyles();

  return(
    <div className={classes.box}>
      <MapContainer/>
    </div>

  )
}

export default Map;