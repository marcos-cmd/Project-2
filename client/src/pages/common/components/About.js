import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Virus from "./Virus";
import Pin from "../../../pin.png";
import Positive from "../../../positive.png";
import RoadMap from "../../../roadmap.png";
import virusImg from "../../../virusCluster.png";
import syringe from "../../../syringe.png";
import mask from "../../../mask.png";
import One from "../../../one.png";
import Two from "../../../two.png";
import Three from "../../../three.png";
import Navbar from "./Navbar";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#cfcfcf",
  },
  coronaUpdate: {
    color: "black",
    fontWeight: "bold",
    fontFamily: "Raleway, sans-serif",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "5rem",
    padding: "280px 0px",
    height: "50%",
    overflow: "hidden",
  },
  border:{
    border: '3px solid black',
    padding: '60px',
  },
  angledBackground: {
    height: "1000px",
    background:
      "linear-gradient(28deg, #E85A50 47%, transparent calc(44% + 2px))",
    display: "flex",
    alignItems: "center",
  },

  generalInfo: {
    fontFamily: "Raleway, sans-serif",
    height: "900px",
    width: "80%",
    boxShadow: "5px 5px 20px 0px #7979796b",
    color: "black",
    background:
      "linear-gradient(28deg, #ffffffbf 47%, transparent calc(51% + 2px))",
    backdropFilter: "blur(20px)",
  },
  title: {
    textAlign: "center",
    padding: "50px 0px 30px 0px",
    fontSize: "50px",
    borderBottom: "1px solid black",
    color: "#455a64",
  },
  sectionTitles: {
    padding: "100px 0 30px 0",
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "20px",
    textAlign: "center",
    padding: "50px 0px 40px 0px",
    borderBottom: "1px solid black",
    height: "40%",
  },
  sectionOne: {
    background: `url(${Pin})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  sectionTwo: {
    background: `url(${Positive})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    marginLeft: "20px",
  },
  sectionThree: {
    textAlign: "center",
    fontSize: "20px",
    height: "40%",
    marginTop: "40px",
    background: `url(${RoadMap})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
  },
  reminder: {
    background:
      "linear-gradient(141deg, #E85A50 47%, transparent calc(44% + 2px))",
    fontFamily: "Raleway, sans-serif",
    padding: "45px 0px",
    textAlign: "center",
  },
  reminderItems: {
    fontSize: "40px",
    height: "200px",
    padding: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cardsContainer: {
    padding: "20px 0px",
    maxWidth: "100%",
    background: "#E85A50",
  },
  card: {
    width: "80%",
    margin: "0 auto",
    backdropFilter: "blur(20px)",
    backgroundColor: "rgb(255 255 255 / .50)",
    boxShadow: "5px 5px 20px 0px #7979796b",
  },
  media: {
    height: 300,
  },
  footer: {
    background: "white",
    opacity: "0.8",
    color: "#FF0344",
    fontFamily: "Raleway, sans-serif",
    fontSize: "20px",
    height: "50px",
    textAlign: "center",
    paddingTop: "20px",
    boxShadow: "1px 5px 12px 8px #cfcfcf",
  },
}));

export default function About() {
  const classes = useStyles();
  // const usersname = localStorage.getItem("username");
  return (
    <div>
      <Navbar />
      <Virus />
      <Box>
        
        <Box className={classes.coronaUpdate}>
          <Box className={classes.border}>ROAMING FOR RONA</Box>
        </Box>
       
      </Box>
      <Box className={classes.angledBackground}>
        <Container className={classes.generalInfo}>
          <h1 className={classes.title}>
            WE CATCH CORONA SO YOU DON'T HAVE TO.
          </h1>
          <div className={classes.topRow}>
            <div className={classes.sectionOne}>
              <h1 className={classes.sectionTitles}>THINK YOU HAVE CORONA? </h1>
              <p>Sign up and find a location near you to get tested.</p>
            </div>
            <div className={classes.sectionTwo}>
              <h1 className={classes.sectionTitles}>TESTED POSITIVE? </h1>
              <p>Track on your profile so others around you can stay safe.</p>
            </div>
          </div>
          <div className={classes.sectionThree}>
            <h1 style={{ padding: "60px 0 30px 0" }}>GOING SOMEWHERE?</h1>
            <p>
              Know before you go, check to see active cases near your
              destination.
            </p>
          </div>
        </Container>
      </Box>

      <Container maxWidth="lg" className={classes.cardsContainer}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <a
              href="https://sf.gov/topics/coronavirus-covid-19"
              target="_blank"
            >
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={virusImg}
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
              </Card>
            </a>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <a
              href="https://www.cdc.gov/coronavirus/2019-ncov/vaccines/index.html"
              target="_blank"
            >
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={syringe}
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
              </Card>
            </a>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <a
              href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/prevention.html"
              target="_blank"
            >
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia className={classes.media} image={mask} />
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
              </Card>
            </a>
          </Grid>
        </Grid>
      </Container>
      <Box className={classes.reminder}>
        <h1 className={classes.title}>REMEMBER</h1>
        <div
          className={classes.reminderItems}
          style={{
            background: `url(${One})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <p>Wash your hands</p>
        </div>
        <div
          className={classes.reminderItems}
          style={{
            background: `url(${Two})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <p>Wear your mask when going out</p>
        </div>
        <div
          className={classes.reminderItems}
          style={{
            background: `url(${Three})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <p>Social distance whenever possible</p>
        </div>
      </Box>
      <footer className={classes.footer}>Roaming for Rona</footer>
    </div>
  );
}
