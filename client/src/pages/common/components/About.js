import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({

    coronaUpdate: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('data:image/jpeg;base64,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')`,
        height: "500px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontSize: "4rem",
        [theme.breakpoints.down("sm")]: {
            height: 300,
            fontSize: "3em"
        }

    },
    blogsContainer: {
        paddingTop: theme.spacing(3)
    },
    blogTitle: {
        fontWeight: 800,
        paddingBottom: theme.spacing(3)
    },
    card: {
        maxWidth: "100%",
    },
    media: {
        height: 240
    },
    cardActions: {
        display: "flex",
        margin: "0 10px",
        justifyContent: "space-between"
    },
    author: {
        display: "flex"
    },
    paginationContainer: {
        display: "flex",
        justifyContent: "center"
    }
}));

export default function About() {
    const classes = useStyles();
    // const { token } = useSelector(state => state.viewer);
    // const dispatch = useDispatch();
    // const history = useHistory();

    // const handleSignUp = () => {

    // };
    // const handleSignOut = () => {
    //     localStorage.removeItem('token');
    //     dispatch(setViewerToken(null));
    //     history.push('/');
    // };

    return (
        <div className={classes.root}>

            <Box>
                <Box className={classes.coronaUpdate}>
                    <Box>Corona Virus Updates</Box>
                </Box>
            </Box>
            <Container maxWidth="lg" className={classes.blogsContainer}>
                <Typography variant="h4" className={classes.blogTitle}>
                    Infected Users
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQwa2hf7EJH4I5xksAc8hN8LcvkgUuC_QQhAg&usqp=CAU"
                                    title="Contemplative Reptile"
                                    component={Link}
                                    to='/covid+locations'
                                    color="inherit">

                                </CardMedia>

                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Test Site Locations
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Where can you get tested?
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions className={classes.cardActions}>
                                <Box className={classes.author}>
                                    <Avatar src="" />
                                    <Box ml={2}>
                                        <Typography variant="subtitle2" component="p">
                                            CVS Pharmacy
                                        </Typography>
                                        <Typography variant="subtitle2" color="textSecondary" component="p">
                                            Location: Fremont
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box>
                                    <BookmarkBorderIcon />
                                </Box>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image="data:image/png;base64,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"
                                    title="Contemplative Reptile"
                                    component={Link}
                                    to='/Profile'
                                    color="inherit">
                                </CardMedia>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Test Results
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Tested
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions className={classes.cardActions}>
                                <Box className={classes.author}>
                                    <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80" />
                                    <Box ml={2}>
                                        <Typography variant="subtitle2" component="p">
                                            User
                                        </Typography>
                                        <Typography variant="subtitle2" color="textSecondary" component="p">
                                            Test Date: May 14, 2020
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box>
                                    <BookmarkBorderIcon />
                                </Box>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image=""
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Form
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">

                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions className={classes.cardActions}>
                                <Box className={classes.author}>
                                    <Avatar src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                                    <Box ml={2}>
                                        <Typography variant="subtitle2" component="p">
                                            input
                                        </Typography>
                                        <Typography variant="subtitle2" color="textSecondary" component="p">
                                            May 14, 2020
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box>
                                    <BookmarkBorderIcon />
                                </Box>
                            </CardActions>
                        </Card>
                    </Grid>

                </Grid>
                <Box my={4} className={classes.paginationContainer}>
                    <Pagination count={3} />
                </Box>
            </Container>
        </div>
    );
};
