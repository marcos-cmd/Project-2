import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link, useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import Pagination from "@material-ui/lab/Pagination";
import Typography from "@material-ui/core/Typography";
import Virus from "./Virus";
import Pin from '../../../pin.png';
import Positive from '../../../positive.png';
import RoadMap from '../../../roadmap.png'
import virusImg from '../../../virusCluster.png'
import syringe from '../../../syringe.png'
import mask from '../../../mask.png'

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#cfcfcf',
  },
  coronaUpdate: {
    color: "#455a64",
    fontWeight: 'bold',
    fontFamily: "Raleway, sans-serif",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "5rem",
    padding: '280px 0px',
    height: "50%",
  },
angledBackground: {
  height: '1000px',
  background: 'linear-gradient(28deg, #cfcfcf 47%, transparent calc(44% + 2px))',
  display: 'flex',
  alignItems: 'center',
},

generalInfo:{
  fontFamily: 'Raleway, sans-serif',
  height: '900px', 
  width: '80%',
  background: 'white',
  boxShadow: '5px 5px 20px 0px #1c313a',
  color:"#455a64",
},
title:{
 textAlign: 'center',
 padding: '50px 0px 30px 0px',
 fontSize: '50px',
 borderBottom: '1px solid #cfcfcf',
},
sectionTitles:{
  padding: '100px 0 30px 0'
},
topRow: {
display: 'flex',
justifyContent: 'space-around',
fontSize: '20px',
textAlign: 'center',
padding: '50px 0px 40px 0px',
borderBottom: '1px solid #cfcfcf',
height: '40%',
},
sectionOne: {
  background: `url(${Pin})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
},
sectionTwo: {
background: `url(${Positive})`,
backgroundRepeat: 'no-repeat',
backgroundPosition: 'center',
},
sectionThree:{
textAlign: 'center',
fontSize: '20px',
height: '40%',
marginTop: '40px',
background: `url(${RoadMap})`,
backgroundRepeat: 'no-repeat',
backgroundSize: 'contain',
},
reminder: {
  background: "#cfcfcf",
  fontFamily: "Raleway, sans-serif",
  height: '600px',
},

  blogsContainer: {
    paddingTop: theme.spacing(3),
    maxWidth: '100%',
    background: '#cfcfcf',
  },
  blogTitle: {
    fontWeight: 400,
    paddingBottom: theme.spacing(3),
    textAlign: "center",
  },
  card: {
    maxWidth: "80%",
  },
  media: {
    height: 240,
  },
  cardActions: {
    display: "flex",
    margin: "0 10px",
    justifyContent: "space-between",
  },
  author: {
    display: "flex",
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    fontcolor: "white",
  },
}));

export default function About() {
  const classes = useStyles();
  const usersname = localStorage.getItem("username");
  return (
    <div>
      <Virus></Virus>
      <Box>
        <Box className={classes.coronaUpdate}>
          
          <Box>ROAMING FOR RONA</Box>
        </Box>
      </Box>
      <Box className={classes.angledBackground} >
        <Container className={classes.generalInfo}>
          <h1 className={classes.title}>WE  CATCH  CORONA  SO  YOU  DON'T  HAVE  TO.</h1>
          <div className={classes.topRow}>
            <div className={classes.sectionOne}>
            <h1 className={classes.sectionTitles}>THINK YOU HAVE CORONA? </h1>
          <p >Sign up and find a location near you to get tested.</p>
          </div>
          <div className={classes.sectionTwo}>
            <h1 className={classes.sectionTitles} >TESTED POSITIVE? </h1>
          <p>Track on your profile so others around you can stay safe.</p>
          </div>
          </div>
          <div className={classes.sectionThree}>
            <h1 style={{padding: '60px 0 30px 0'}}>GOING SOMEWHERE?</h1>
          <p >Know before you go, check to see active cases of the locations you are going. Maybe we'll stay home today...</p>
          </div>
        </Container>
           
      </Box>
     




      <Container maxWidth="lg" className={classes.blogsContainer}>
        <Typography variant="h4" className={classes.blogTitle}></Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image= {virusImg}
                  title="Testing Site Locations"
                  component={Link}
                  to="https://sf.gov/topics/coronavirus-covid-19"
                  color="inherit"
                ></CardMedia>
                    
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                  COVID-19 Resources
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    sf.gov
                  </Typography>
                </CardContent>
              </CardActionArea>
              {/* <CardActions className={classes.cardActions}>
                <Box className={classes.author}>
                  <Avatar src="data:image/jpeg;base64,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" />
                  <Box ml={2}>
                    <Typography variant="subtitle2" component="p">
                      CVS Pharmacy
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      component="p"
                    >
                      Location: Fremont
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <BookmarkBorderIcon />
                </Box>
              </CardActions> */}
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image= {syringe}
                  title="Contemplative Reptile"
                  to="https://www.cdc.gov/coronavirus/2019-ncov/vaccines/index.html"
                ></CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Vaccine Updates
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    CDC - Status of vaccinations 
                  </Typography>
                </CardContent>
              </CardActionArea>
              {/* <CardActions className={classes.cardActions}>
                <Box className={classes.author}>
                  <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80" />
                  <Box ml={2}>
                    <Typography variant="subtitle2" component="p">
                      User
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      component="p"
                    >
                      Test Date: May 14, 2020
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <BookmarkBorderIcon />
                </Box>
              </CardActions> */}
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image= {mask}
                  title="Contemplative Reptile"
                  // component={Link}
                  href={`https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/prevention.html`}
                  color="inherit"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Prevention
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Learn how to protect yourself and others
                  </Typography>
                </CardContent>
              </CardActionArea>
              {/* <CardActions className={classes.cardActions}>
                <Box className={classes.author}>
                  <Avatar src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                  <Box ml={2}>
                    <Typography variant="subtitle2" component="p">
                      Login
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      color="textSecondary"
                      component="p"
                    >
                      Most Recent Login: Nov 17, 2020
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <BookmarkBorderIcon />
                </Box>
              </CardActions> */}
            </Card>
          </Grid>
        </Grid>
        {/* <Box my={4} className={classes.paginationContainer}>
          <Pagination count={3} />
        </Box> */}
      </Container>
      <Box className={classes.reminder}>
        <h1>Remember</h1>
        <p>Wash your hands</p>
        <p>Wear your mask when going out</p>
      </Box>
      {/* <TableFooter></TableFooter> */}
    </div>
  );
}
