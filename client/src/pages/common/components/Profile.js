import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import { mainListItems, secondaryListItems } from './listitems';
import Chart from './Chart';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import axios from 'axios';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
        </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    //add class here --
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    card: {
        maxWidth: "100%",
    },
    cardActions: {
        display: "flex",
        margin: "0 10px",
        justifyContent: "space-between"
    },

}))



export default function Profile(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    // console.log('props', props);
    const { username } = useParams();
    const [user, setUser] = useState([]);

    // const fetchDatas = async () => {
    //     // console.log("i am user", username)
    //     const response = await axios.get(`/api/users/user/${username}`, { headers: { authorization: localStorage.getItem('token') } })
    //     console.log('res', response.data)
    //     setUser()
    //     console.log('user', user)
    // }

    useEffect(async () => {
        await axios.get(`/api/testData/usertests`, { headers: { authorization: localStorage.getItem('token') } })
            .then((res) => {
                console.log('testData', res.data)
                setUser(res.data)
            });
    }, [username]);
    // setUser(testData)
    // console.log('user', user)

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    // ==================================================================================//
    // === Test Results Input ===========================================================//
    // ==================================================================================//
    // Using useEffect will allow us to access previous test results to show on a page
    const [date, setDate] = useState(
        moment(new Date()).format("MM-DD-YY")
    );
    const [results, setResults] = useState(null);

    //handles when user changes input in date inputfield
    const handleChangeDate = e => {
        setDate(e.target.value);
    };

    // handles when user changes input in results inputfield
    const handleNewResults = e => {
        setResults(e.target.value);
    }
    console.log(date);

    const addTestResults = async () => {
        const testDate = date;
        const testResult = results;
        try {
            const res = await axios.post('/api/testData', { testDate, testResult }, { headers: { authorization: localStorage.getItem('token') } })
            console.log('this is res', res);
        } catch (error) {
            throw new Error(error);
        }
    };
    // ==================================================================================//

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        User Profile
                    </Typography>

                    <IconButton color="inherit">
                        <Badge badgeContent={1} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
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
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>{mainListItems}</List>
                <Divider />
                <List>{secondaryListItems}</List>
            </Drawer>

            <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQwa2hf7EJH4I5xksAc8hN8LcvkgUuC_QQhAg&usqp=CAU"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {username}
                            </Typography>
                            <h3>Testing History</h3>
                            <div>
                                {user.map(data => (
                                    <p>{data.testDate} : {data.testResult}</p>
                                ))}
                            </div>



                        </CardContent>
                    </CardActionArea>
                    <CardActions className={classes.cardActions}>
                        <Box className={classes.author}>

                            <Box ml={2}>
                                <Typography variant="subtitle2" component="p">

                                </Typography>
                                <Typography variant="subtitle2" color="textSecondary" component="p">
                                </Typography>
                            </Box>
                        </Box>

                    </CardActions>
                </Card>
            </Grid>
            <main className={classes.content}>
                <form className={classes.root} noValidate autoComplete="off">
                    <div>
                        <TextField id="date" name="date" label="MM/DD/YY" variant="outlined" value={date} onChange={handleChangeDate} required />
                        <TextField id="outlined-basic" label="Positive or Negative" variant="outlined" value={results} onChange={handleNewResults} required />
                    </div>
                    <Button onClick={addTestResults} variant="contained" color="primary">Submit Test Results</Button>
                </form>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Chart */}
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper className={fixedHeightPaper}>
                                <Chart />
                            </Paper>
                        </Grid>


                    </Grid>
                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    );

}
