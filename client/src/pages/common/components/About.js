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

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#cfcfcf',
  },
  coronaUpdate: {
    color: "#455a64",
    fontFamily: "Quicksand, sans-serif",
    zIndex: 1,
    height: "500px",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "5rem",
    paddingTop: theme.spacing(9),
    [theme.breakpoints.down("sm")]: {
      height: 300,
      fontSize: "3em",
    },
  },
angledBackground: {
  height: '1000px',
  background: 'linear-gradient(28deg, #cfcfcf 47%, #fff calc(44% + 2px))',
  display: 'flex',
  alignItems: 'center',
},

generalInfo:{
  // border: 'solid 5px #1c313a',
  height: '600px',
  background: 'white',
  boxShadow: '5px 5px 20px 0px #1c313a',
},

  blogsContainer: {
    paddingTop: theme.spacing(3),
    
    
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
    <div >
      <Box>
        <Box className={classes.coronaUpdate}>
          <Virus></Virus>
          <Box>Roaming for Rona</Box>
        </Box>
      </Box>
      <Box className={classes.angledBackground} >
        <Container className={classes.generalInfo}>

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
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQwa2hf7EJH4I5xksAc8hN8LcvkgUuC_QQhAg&usqp=CAU"
                  title="Testing Site Locations"
                  component={Link}
                  to="/testsite"
                  color="inherit"
                ></CardMedia>

                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Test Site Locations
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Where can you get tested?
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className={classes.cardActions}>
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
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASIAAACuCAMAAAClZfCTAAABU1BMVEX8y0DrtS/////wYFiMREXX2dhDseb4+Pj8//yJQkX9zj/e4N+JQEFav5XhSEZEsOlWXnHt7+6ZU0Xp6en0wCuXW1mocrDqvEGDNTSIQEeANUXxvC7wUkqfXUBCsuLuW1meZ2nMr7BMu47fWFb91D/htEGkaK35YVvV7vf75ORrveNBR1HvUlus2e+dXqWCx+jt9/LK5/j72tX4u7ZLU3SAzKqz38zxysji0uWQOjXygXfK7OjQttXwbWT4skTx6PLItVHzj4k7u/vva1azhLuybauOzPSLIizyc3TyhU/Docc6R1iN0rk2TXnfNjO2j71dpNj1qaRXmLy0tbxQuL73p02qTEghJTXfwkt1QESrckHEjTh7cYeBW2eYMSGJJDloh6ZBaIb4lUzB1e9rm9lfvrGhkWVma2yiPVGofX23kJD71HR5j8eAh8mnmseXm6qnllvL2A0iAAAL40lEQVR4nO3d+X/TRhYAcEc21liEKg4Qx0ZIi1fER+I4zn0SSLJpoGxpaOnucrVLS7v37v//0857I9ljSU4sR8eMqxc+5DDxB30/b96clnO5LLLIIossssgiiyyyyCKLLLLIIossshA3tLT/AzJEhnRlaJqt2badKY0KzZ75dErjjYZGGZQ3aAZ9WlmxGnlrJf/EzoR8oVGi05W8Eytv7IzIG1rOfm6BjsWMnmRC3tC0J5BDlnV6allW3jrNiHwBSWRZz3O2/QSoVqAcZTEUNrSvU3CxIZ9WPmVEmidmLFalc6hF88n2/pO0/8cJB6081nD0izQt3KcWIHnjN5ZWUJytvDdY6uRs/yMQv0GigMAibT8PfCwjYmOiledP3pwGJ1F+qouR5qu8dnAWQW+/MkIob3sr/DSZaXblsSfejCC6InzPUZmepmc/nq9542+N0ES+56i9nZZlE+1xrVrwROn70ESW9ykKpdr8lOSRPe8XKoQnytPfm/U8T+3ddBSkSs0rVChNkEV537MUCtX5e2lfXRShBRFNmEW+55m/N5P29UUQDlGpsMjHBERDv7/oED2YeZD2Bd483CxafFQu32VRvlve+PqLsHHX/XV4gr8vulk0I38eOUSL/1AGQZSd8EQKHyqWbkYkvZFL9EghZHCJExCpHDFR7nNEshsNiLgkUiZoaBwRjSEiyY0CiCCLvvh92FCuIJLbKIiIKDcOD5HURsFZxKTGD5+ql0hmoyuIoswimY0SI5LXKDkiaY0SJJLVaBTRDXu1QKIZOQ+UXJlFRBkac9+YSM48uopIVSbOphFEUhqNIjo+fHW2cPbqkBe7NYjbExLJaDSC6MXS0gLE0hIiES/RrUmJJDQKnIAcLzAgNHrV/3mZi4mJ5DMKzCJMIVcJjEJXpCuIpDMKIjpbGASFWj0cKTERkWxGfiKyuzoAWt09XF1YOnYfioZIMqOALOKSaHVXUQ6dkj1crgPj9phEchl5iGBZgybR0hmWItrEiLK7tHAWNZFURn4i2s6WzsguE3KaHXtQvTbGJpLJyN/QwIR+OqZChH23sHCshIxriSQy8hIRRIHic3youEJLMRDJY+QnOoZadIhTWFeINTT1bvm6CEMkjZGfSMFC/QK+2nWGj2yAHWW5lskooNN/4Rgpx0uDrh+Ibl8b4YgENuJP/QQQlVnrerHrzEGcdhZ1LRLa6J9XEymHUI0GM9nV3fCLRmMSCWtUuYZIebHa95lsijY2kbBGXPjKNe4bHq7+gQXM0tzLvr4W3Q1PJIGRb3TNFqx/+tfP39D4+d//GWRG5D2aJEb+LFKa57peNIt6kQZ86qw5RNwpq8AIOS6SxWiICFpZB23Qp+gg6e2ek2HR1yIJjDxZ1HN4AIYRwWe92G6G2y0KRTQj9vYaR0SUcls36YcDQ//SAYt9dR5qTy0ckdh5xGdRj5LgBy1F7W6HRrfNnKibboZJpJBEQhtxRB3IGR2yptMEDAQhvW4Rijc0vZ4ydkEKSyTyXvaAqMO6MFqbyXCTIh3MIvpgb+ySHZpI4DzqEzEh3ewo/qLT7GIiFfVmbFkksJFDtPdfHYuy2WTr14q6vrOxs95SnW876Fc048sicY0covsooLfZqUV1Y98yMPLPdthJxiar2e0x02gSIlGNgKhU2vtGN01ahrCFkcuG4b4GhEod7SBLkwrSkt2JL4tENcIsWnx/As2MNaNW3uBf/mLljWcqDLudPIoxiwQ1okSlwl4Rxz5luPwNw/ciIcNqQXKxgt6Nk0hII8iiPUgi2oag6AQIQYCR0sZhZTNOIhGNgOhLmHPQSkxjPUDIonl0pML8BLu1Ls734yIS0AiIPpzAmgeMC9W8/7V6iGY8g5p9jjO3mx3Bks+IEn18jVN6GFNf0q7Mc68C49mFATV7nT7chEmc3hna64icSDyjSm0PevMi9OYqU+EzydhX1CP42T6kEQ6xxynYNyESzqhSq2Ipgnm8v1Yb+zS51COKZkDF7kAamXETiWZUqb3HJTQYNV44Lg1OCJayIY+MSwXG2LBYMsbQ6GZEYhlplR9+hEoE/Vmr4VQftxwZF3j0mlzCN/sgY8IQ81aUOyDiG2mVL1/DqPlcYT1+gwqR9QZiQVcPs9hL1v6AC6dynUh3QIQ3comgWmMpgu6dtKyBkFuhDJVlEa3sI3dCoiMSyahPxKo1FYK21aIV+kiF4TahP2U5BfW6DSOjMaayNycSyKjCxtb9LDpq4XS/lW+0cG2t38sxomJxrNl+BETCGEFDY5nhahjrmDytFq7P7vTHAYZTi4DouqOOkRAJYwQNDSfwxJ2gwUAa12bpnx1upIS1CDLup9vxl2uRjLDTN3ESq7r5sq6w9VjCzWqxSBFcNYl2T198o8oP76Fc43hw3xkQGTuMiJ/3GxsKLKvBXKUcwaFieYw0uMXTCQyZm6zz4o2GVkbYBASyKP4JiFhGlOij6RYjt6U18l9vEKVlcPNZthqC7ew8SSIRjOhM/0dcliWEX5U1NlrDM34YAjRxvaipRnOoWBYjrVKb/eCOjIhyMTCy+IUjOoklOCqitSjiI1jCG8Gq40fThF1G2DBTjaD77+KaCB6LoG2yCxPWW/Bxq/8ZPuCbWIjSNgKi2fcnOAchw908J3ShErfH14dvVBR7LUrfCLca9/BUkd6DY2rr+YB1NdxI6+LJke5Y+7HREqVrxLYaP+AuEe34qYS6P9TYGoZxiVvWPTx6NOaufsREqZ6tQaLS3usTZ4kfhow7F8agahvPWjAbIT12cK2XDlGaeeQQLeOxEN1cQw6yfnnRwFMP+5ctdhqrh0ce9W58h2eENQKiamF5+auiabJTVgqSKGqLhuqeVmOb1fEenhHVyIZyvfzV8vJf8aisXuxij0WcU1jsMF+z6Bx4HKs3i4koPSM6dAQhanRimkXIpPM17pwaHC1qswNsRb2sjHvYMQ6itIxoQ5tDIcgj6LGg92/3mv0E6pi6c7C4GOOJWZGNtMrm3Bz1QSYTDw/rpnOsuNvGr1ihhhWltImSN4KhhjYHwfLoT9+e4xSjf2q/6Jzl18dbsI6fKPlz/ppWmWPBhLDu6Ow0+gCIdfbhXrYXF1HieaT9eXOub0SFYBTdbA+9SkYHr+5aKJ84iRI24oTm5iCHWJBOG2b+TphdPLQPWRS82ZEwUYJGWs7mhea+HbrEg8/fQXz+/HLQwKK5C5ZMRlcJbdeduFOvH7gdmShEiRnZT3mhvzzie/SX9TuDqG/300iIhpaYkUdoj3+F9TYnRL+keRQ64iVKwEjzCnEvQifKGi/0Ev4WjigBI/vpH4dyaOh1+lwzq28pa7QcsaY2euMj1h2QdIyGhar0YngiEKrXmRAtUDSpthjR6K2PWHdAUjHSOKHNaqFU4rMI2ll9G+oRChGwcm59GfVtVcQ10rgk2nw6Wx2+IcYBxTnAfr8vVBdodJ2Mkf3LoFbjy2R8RGu0am9j7typC0sUp5HW7842Nf9tVYAITUBoi5VuMYliNXIbmq3lfEQq5g0bCzGhOuv1BatF8RrRHo3m0SYIBdyc545rRJwccjt9oXq0eI00za788uuv/7O1QKIDljoH/QGSU4rUq2+qAvdVSZwoLiN4n2WbBn4dcIunLWfY6AptK6EjMaKYx0daLjCLYEDNT2O3wgtNDREyBd0ojDfC0RGLKG+gKjcRDBhf1uvOPGTQykQs16llESTSNq1IW1vb3IgoI/IF8e56ZA0tysiIMqKMKJgogrcfdINMKVGkMZ1EUWYRmUKi2cJ1b6ETKh5xb9AsPZH7ZvGzi7+LLu6zt/kuzD+YJiKKFF2U2DNWp40o+qg+nI6GplWdCypFE86TIdHb6SCy39ZKhVIsWVR7PB0NLWc/rFVL1cijVKu9S0AoESLNfvcwjnibRA4ldpDm3oM4Igmg5M5jJXM1sURSRBIbJUYkr1FyRNIaJQakSWuUGBFE2hc7WSRKJKdRskRSGiVMJKNR0kS5hIbEEUbSQpp8eZQ0UU6+tpYCkWxGaRBJZpSGkGT1KA0iyYxSIcpJ1dbSIpLIKC0hidra/wE5GDJLas7quQAAAABJRU5ErkJggg=="
                  title="Contemplative Reptile"
                ></CardMedia>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Test Results
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Status of Infected Users
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
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="data:image/jpeg;base64,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"
                  title="Contemplative Reptile"
                  component={Link}
                  to={`/Profile/${usersname}`}
                  color="inherit"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Profile Page
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  ></Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className={classes.cardActions}>
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
}
