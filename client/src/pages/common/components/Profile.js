import React, { useEffect, useState } from "react";
import {
  useParams,
  useHistory,
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";
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
import Cluster from "./Cluster.js";
import AddPlacesMap from "./AddPlacesMap";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { FormControl } from "@material-ui/core";
import Tour from "./Tour";

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
  all: {
    background: 'linear-gradient(to right, #70a7ec7a, #b06ab3a6,#63b9dc4f)',
    backgroundSize: 'cover',
    color: "#FF0344",
    height: '100%',
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    // backgroundColor: 'rgba(255, 255, 255, .15)',
    // backdropFilter: 'blur(5px)',
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
    background: "#FF0344",
    opacity: '0.8',
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
    opacity: '0.8',
  },
  mainGrid: {
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  container: {
    padding: "15px",
    margin: "80px auto 0 auto",
    boxShadow: "1px 1px 5px #ccc",
    backgroundColor: 'rgba(255, 255, 255, .15)',
    backdropFilter: 'blur(5px)',
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    width: " 90%",
    background: "#404040",
    color: "#FF0344",
    // padding: "30px",
  },
  fixedHeight: {
    height: 260,
    width: "90%",
    margin: "0 auto",
    color: "#FF0344",
  },
  // history: {
  //   margin: "100px 0 0 20px",
  //   maxWidth: "100%",
  // },
  cardActions: {
    display: "flex",
    margin: "0 10px",
    justifyContent: "space-between",
  },
  resultForm: {
    margin: "20px 0",
    display: "flex",
    justifyContent: "space-between",
  },
  resultsTitle: {
    fontFamily: "Raleway, sans-serif",
    fontSize: "20px",
    padding: "40px 0px 10px 0px",
    fontWeight: "bold",
    color: "black",
  },
  mapContainer: {
    margin: "10px 0 50px 0",
    padding: "15px",
    boxShadow: "1px 1px 5px #ccc",
    backgroundColor: 'rgba(255, 255, 255, .15)',
    backdropFilter: 'blur(5px)',
  },
  formcontrol: {
    minWidth: 120,
  },
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
  const [testResult, setTestResult] = useState("true");
  // const fetchDatas = async () => {
  //     // console.log("i am user", username)
  //     const response = await axios.get(`/api/users/user/${username}`, { headers: { authorization: localStorage.getItem('token') } })
  //     console.log('res', response.data)
  //     setUser()
  //     console.log('user', user)
  // }

  useEffect(() => {
    // IIFE immediately invoked function
    (async () => {
      try {
        const result = await axios.get(`/api/users/user/${username}`, {
          headers: { authorization: localStorage.getItem("token") },
        });
        const result2 = await axios.get(
          `/api/testData/user/${result.data[0]._id}`,
          {
            headers: { authorization: localStorage.getItem("token") },
          }
        );
        console.log(result);
        console.log(result2);
        setUser(result2.data);
      } catch (error) {
        console.log(error);
      }
    })();
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
    console.log("value", e.target.value);
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
      setTestResult(true);
    } catch (error) {
      setTestResult(false);
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
    <div className={classes.all}>
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
                <p className="menuIcon"> &gt; </p>
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                <a href="/" style={{ textDecoration: "none", color: "white" }}>
                  ROAMING FOR RONA
                </a>
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
              paper: clsx(
                classes.drawerPaper,
                !open && classes.drawerPaperClose
              ),
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
          </Drawer>
         <Grid xs={11} className={classes.mainGrid}>
          <Grid item xs={4} className={classes.container}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {username.toUpperCase()}
                  </Typography>
                  <h3>Testing History</h3>
                  <div>
                    {user.length
                      ? user?.map((data) => (
                          <p>
                            {data.testDate.slice(0, 10)} : {data.testResult}
                          </p>
                        ))
                      : null}
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
            {/* <h2 className={classes.resultsTitle}>Submit Test Results</h2> */}
            <Typography component="div">
              <span style={{ color: "#ff0134", fontSize: "6" }}>
                {!testResult ? "Please fill out all fields" : ""}
              </span>
            </Typography>
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
                <InputLabel id="demo-simple-select-label">
                  Test Result
                </InputLabel>
                <Select
                  id="demo-simple-select-label"
                  label="Positive or Negative"
                  variant="outlined"
                  value={results}
                  onChange={handleNewResults}
                  placeholder="Hello"
                  required
                >
                  <MenuItem value="Positive">Positive</MenuItem>
                  <MenuItem value="Negative">Negative</MenuItem>
                </Select>
              </FormControl>

              <Button
                onClick={addTestResults}
                variant="contained"
                color="#FF0344"
              >
                Submit
              </Button>
            </form>
          </Grid>
          
          
          <Grid item xs={7} className={classes.container}>
            <h1>Daily Cases</h1>
            <Paper className={fixedHeightPaper}>
              <Chart />
            </Paper>
          </Grid>
         
          {/* <div className={classes.root} style={{marginLeft: '55px', marginRight: '0px'}}> */}
         
            <Grid item xs={7} className={classes.mapContainer}>
              <Switch>
                <Route
                  path={`/Profile/${username}/add-places`}
                  component={AddPlacesMap}
                />
                <Route
                  path={`/Profile/${username}/testsite`}
                  component={TestSite}
                />
                <Route
                  path={`/Profile/${username}/covid+locations`}
                  component={Cluster}
                />
              </Switch>
            </Grid>
            <Grid item xs={4} className={classes.mapContainer}>
              <h1>New Graph</h1>
              {/* {place holder for new graph} */}
            </Grid>
            </Grid>
           
          {/* </div> */}
        </div>
        {/* <div className={classes.root} style={{marginLeft: '55px', marginRight: '0px'}}>
            <Grid item xs={7} className={classes.mapContainer}>
              <Switch>
                <Route
                  path={`/Profile/${username}/add-places`}
                  component={AddPlacesMap}
                />
                <Route
                  path={`/Profile/${username}/testsite`}
                  component={TestSite}
                />
                <Route
                  path={`/Profile/${username}/covid+locations`}
                  component={Cluster}
                />
              </Switch>
            </Grid>
            <Grid item xs={4} className={classes.mapContainer}>
              <h1>New Graph</h1>
              {/* {place holder for new graph} */}
            {/* </Grid>
          </div> */} */}
      </BrowserRouter>
    </div>
  );
}
