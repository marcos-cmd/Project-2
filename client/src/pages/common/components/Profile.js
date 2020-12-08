import React, { useEffect, useState } from "react";
import { useParams, useHistory, Switch, Route, BrowserRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import MainListItems from "./listitems";
import Chart from "./Chart";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import moment from "moment";
import axios from "axios";
import { setViewerToken } from "../../Viewer";
import { useDispatch } from "react-redux";
import TestSite from "./mapBoxContainer";
import Cluster from './Cluster.js';
import AddPlacesMap from "./AddPlacesMap";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { FormControl } from "@material-ui/core";
import Tour from './Tour'

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {"Copyright © "}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed

  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "#455a64",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
    fontFamily: "Raleway, sans-serif",
    fontWeight: "600",
  },
  signOut: {
    fontFamily: "Raleway, sans-serif",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    zIndex: 0,
    overflow: "hidden",
  },
  //add class here --
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  container: {
    paddingTop: "100px",
    paddingBottom: theme.spacing(4),
    margin: '0 20px',
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  history: {
    margin: "100px 0 0 20px",
    maxWidth: "100%",
  },
  cardActions: {
    display: "flex",
    margin: "0 10px",
    justifyContent: "space-between",
  },
  resultForm: {
    margin: "20px 0",
    display: 'flex',
    justifyContent: "space-between",
  },
  resultsTitle: {
    fontFamily: "Raleway, sans-serif",
    fontSize: "20px",
    padding: '40px 0px 10px 0px',
    fontWeight: 'bold',
  },
  mapContainer: {
    width: '85%',
    height: '400px',
    margin: '50px auto 50px auto',
    paddingBottom: '50px',
  },
  formcontrol: {
    minWidth: 120,
  }
}));

export default function Profile() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const dispatch = useDispatch();
  const history = useHistory();
  // console.log('props', props);
  const { username } = useParams();
  const [user, setUser] = useState([]);
  const [userId, setUserId] = useState('')

  // const fetchDatas = async () => {
  //     // console.log("i am user", username)
  //     const response = await axios.get(`/api/users/user/${username}`, { headers: { authorization: localStorage.getItem('token') } })
  //     console.log('res', response.data)
  //     setUser()
  //     console.log('user', user)
  // }

  useEffect(() => {
    // IIFE immediately invoked function 
    (async() => {
      try {
        const result = await axios.get(`/api/users/user/${username}`, {
          headers: { authorization: localStorage.getItem("token") },
        });
        const result2 = await axios.get(`/api/testData/user/${result.data[0]._id}`, {
          headers: { authorization: localStorage.getItem("token") },
        });
        console.log(result)
        console.log(result2)
        setUser(result2.data);
      } catch (error) {
        console.log(error);
      }
    })()

  }, [username]);

  const toggleDrawer = () => {
    if (open === true) {
      setOpen(false);
    } else setOpen(true);
  };

  // ==================================================================================//
  // === Test Results Input ===========================================================//
  // ==================================================================================//
  // Using useEffect will allow us to access previous test results to show on a page
  const [date, setDate] = useState(moment(new Date()).format("MM-DD-YY"));
  const [results, setResults] = useState("");

  //handles when user changes input in date inputfield
  const handleChangeDate = (e) => {
    setDate(e.target.value);
  };

  // handles when user changes input in results inputfield
  const handleNewResults = (e) => {
    console.log('value', e.target.value)
    setResults(e.target.value);
  };
  console.log(date);

  const addTestResults = async () => {
    const testDate = date;
    const testResult = results;
    try {
      const res = await axios.post(
        "/api/testData",
        { testDate, testResult },
        { headers: { authorization: localStorage.getItem("token") } }
      );
      window.location.reload(false);
    } catch (error) {
      throw new Error(error);
    }
  };
  const handleSignOut = () => {
    localStorage.clear();
    // localStorage.removeItem("username");
    dispatch(setViewerToken(null));
    history.push("/");
  };
  // ==================================================================================//
 console.log(user);
  return (
    <div>
      
      <BrowserRouter>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="absolute"
            className={clsx(classes.appBar, open && classes.appBarShift)}
          >
            <Toolbar className={classes.toolbar}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                className={clsx(
                  classes.menuButton,
                  open && classes.menuButtonHidden
                )}
              >
                <p className='menuIcon'> &gt; </p>
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                {username.toUpperCase()}
              </Typography>
              <Tour></Tour>
              <Button className={classes.signOut} onClick={handleSignOut}>
                Sign Out
            </Button>
            </Toolbar>
          </AppBar>

          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <MainListItems />
            <Divider />
            {/* <List>{secondaryListItems}</List> */}
          </Drawer>

          <Grid item xs={12} sm={6} md={6} className={classes.history}>
            <Card >
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {username.toUpperCase()}
                  </Typography>
                  <h3>Testing History</h3>
                  <div>
                    {user.length ? user?.map((data) => (
                      <p>
                        {data.testDate.slice(0, 10)} : {data.testResult}
                      </p>
                    )): null} 
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
            <h1 className={classes.resultsTitle}>Submit Test Results</h1>
            <form noValidate autoComplete="off" className={classes.resultForm}>


              <TextField
                id="date"
                name="date"
                label="MM/DD/YY"
                variant="outlined"
                value={date}
                onChange={handleChangeDate}
                required
              />
              <FormControl className={classes.formcontrol}>
                <InputLabel id="demo-simple-select-label">Test Result</InputLabel>
                <Select
                  id="demo-simple-select-label"
                  label="Positive or Negative"
                  variant="outlined"
                  value={results}
                  onChange={handleNewResults}
                  placeholder="Hello"
                  required
                >
                  <MenuItem value='Positive'>Positive</MenuItem>
                  <MenuItem value='Negative'>Negative</MenuItem>
                </Select>
              </FormControl>

              <Button
                onClick={addTestResults}
                variant="contained"
                backgroundColor="#455a64"
              >
                Submit
            </Button>
            </form>
          </Grid>

          <Grid item xs={12} sm={6} md={6} className={classes.container}>
            <Paper className={fixedHeightPaper}>
              <Chart />
            </Paper>
          </Grid>

        </div>

        <div className={classes.mapContainer}>
          <Switch>
            <Route path={`/Profile/${username}/add-places`} component={AddPlacesMap} />
            <Route path={`/Profile/${username}/testsite`} component={TestSite} />
            <Route path={`/Profile/${username}/covid+locations`} component={Cluster} />
          </Switch>

        </div>
      </BrowserRouter>
    </div>
  );
}
