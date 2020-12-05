import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";
// import Logo from '../../../../public/logo.png'
import { useSelector, useDispatch } from "react-redux";
import { setViewerToken } from "../../Viewer";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    fontFamily: "Raleway, sans-serif",
    color: 'white',
    fontSize: '20px',
  },
  appBar: {
    background: "#455a64",
  },
  signIn: {
    fontFamily: "Raleway, sans-serif",
    color: 'white',
    fontSize: '20px',
  },
  logo: {
    height: '40px',
    cursor: 'pointer',
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const { token } = useSelector((state) => state.viewer);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSignUp = () => { };

  const handleSignOut = () => {
    localStorage.clear();
    dispatch(setViewerToken(null));
    history.push("/");
  };

  const handleClick = () => {
    history.push("/");
  }

  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.root}>
          <div onClick={handleClick}><img className={classes.logo} src='../../../logo.png' /></div>
          <div >
            {localStorage.getItem('token') ? (
              <Button onClick={handleSignOut}>Sign Out</Button>
            ) : (
                <div className={classes.signIn}>
                  <Button to="/signup" component={Link} className={classes.signIn}>
                    Sign Up
                </Button>
                  <Button to="/signin" component={Link} className={classes.signIn}>
                    Sign In
                </Button>
                </div>
              )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
