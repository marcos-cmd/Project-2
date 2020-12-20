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
import CurrentCasesTable from "./CurrentCasesTable";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import CasesMap from "./CasesMap";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  all: {
    background:
      "linear-gradient(209deg, #E85A50 44%, transparent calc(40% + 2px)),linear-gradient(506deg, white 50%, #E85A50 calc(40% + 2px))",
    backgroundSize: "cover",
    color: "black",
    height: "100vh",
  },

  root: {
    display: "flex",
    fontFamily: "Raleway, sans-serif",
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
    background: "white",
    opacity: "0.93",
    color: "#FF0344",
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
    color: "#FF0344",
  },
  signOut: {
    fontFamily: "Raleway, sans-serif",
    color: "#FF0344",
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
    zIndex: 1,
    overflow: "hidden",
    height: "100vh",
    boxShadow: "5px 5px 20px 0px #7979796b",
    backgroundColor: "rgba(255, 255, 255, .15)",
    backdropFilter: "blur(5px)",
  },
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
    boxShadow: "5px 5px 20px 0px #7979796b",
    backgroundColor: "rgba(255, 255, 255, .15)",
    backdropFilter: "blur(5px)",
  },
  mainGrid: {
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    flexGrow: 1,
  },
  container: {
    padding: "10px",
    marginTop: "80px",
    boxShadow: "5px 5px 20px 0px #7979796b",
    backgroundColor: "rgba(255, 255, 255, .15)",
    backdropFilter: "blur(10px)",
  },
  testingHistory: {
    backgroundColor: "rgba(255, 255, 255, .15)",
    backdropFilter: "blur(20px)",
    height: "150px",
    fontWeight: "bold",
    padding: "5px",
    overflowY: "scroll",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    width: " 90%",
    backgroundColor: "rgba(255, 255, 255, .15)",
    backdropFilter: "blur(20px)",
    color: "#FF0344",
  },
  fixedHeight: {
    height: 300,
    width: "100%",
    margin: "0 auto",
    color: "#FF0344",
  },
  cardActions: {
    display: "flex",
    margin: "0 10px",
    justifyContent: "space-between",
  },
  resultForm: {
    margin: "20px 0 5px",
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
    margin: "20px 0 20px 0",
    padding: "10px",
    boxShadow: "5px 5px 20px 0px #7979796b",
    backgroundColor: "rgba(255, 255, 255, .15)",
    backdropFilter: "blur(10px)",
    overflowY: "scroll",
    height: "500px",
  },
  formcontrol: {
    width: "52%",
  },
}));

export default function Profile() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const dispatch = useDispatch();
  const history = useHistory();
  // console.log('props', props);
  const { username } = useParams();
  const [user, setUser] = useState([]);
  const [testResult, setTestResult] = useState("true");

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
    dispatch(setViewerToken(null));
    history.push("/");
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setTestResult(true);
  };
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
                <a
                  href="/"
                  style={{ textDecoration: "none", color: "#FF0344" }}
                >
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
          <Grid container xs={11} className={classes.mainGrid}>
            <Grid item style={{ width: "28%" }} className={classes.container}>
              <Typography gutterBottom variant="h5" component="h2">
                {username.toUpperCase()}
              </Typography>
              <Card className={classes.testingHistory}>
                <CardContent style={{ padding: 0 }}>
                  <h3>
                    <strong>YOUR TESTING HISTORY</strong>
                  </h3>
                  <hr></hr>
                  <div>
                    {user.length
                      ? user?.map((data) => (
                        <p>
                          {moment(data.testDate.slice(0, 10)).format('MM/DD/YY')} : {data.testResult}
                        </p>
                      ))
                      : null}
                  </div>
                </CardContent>
              </Card>

              <Snackbar
                open={!testResult}
                autoHideDuration={1500}
                onClose={handleClose}
              >
                <Alert severity="error">All fields are required.</Alert>
              </Snackbar>

              <form
                noValidate
                autoComplete="off"
                className={classes.resultForm}
              >
                <TextField
                  id="date"
                  name="date"
                  label="MM/DD/YY"
                  variant="outlined"
                  value={moment(date).format('MM/DD/YY')}
                  onChange={handleChangeDate}
                  required
                  style={{ width: "42%" }}
                />
                <FormControl className={classes.formcontrol}>
                  <InputLabel
                    id="demo-simple-select-label"
                    style={{ marginLeft: "15px" }}
                  >
                    Test Result
                  </InputLabel>
                  <Select
                    id="demo-simple-select-label"
                    label="Positive or Negative"
                    variant="outlined"
                    value={results}
                    onChange={handleNewResults}
                    required
                  >
                    <MenuItem value="Positive">Positive</MenuItem>
                    <MenuItem value="Negative">Negative</MenuItem>
                  </Select>
                </FormControl>
              </form>
              <Button
                onClick={addTestResults}
                variant="outlined"
                style={{ width: "100%" }}
              >
                Submit
              </Button>
            </Grid>

            <Grid item style={{ width: "68%" }} className={classes.container}>
              <h2>DAILY CASES</h2>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>

            <Grid
              item
              style={{ width: "68%" }}
              className={classes.mapContainer}
            >
              <Switch>
                <Route
                  exact
                  path={`/Profile/${username}`}
                  component={CasesMap}
                />
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
            <Grid
              item
              style={{ width: "28%" }}
              className={classes.mapContainer}
            >
              <CurrentCasesTable />
            </Grid>
          </Grid>
        </div>
      </BrowserRouter>
    </div>
  );
}
