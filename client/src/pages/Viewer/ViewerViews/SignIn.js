import React from "react";
import { reduxForm, Field } from "redux-form";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../../common/components/Navbar";
import { setViewerToken } from "../ViewerReducer";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
   fontFamily: "Raleway, sans-serif",
    margin:'300px auto',
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(0, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: '2px 2px 6px 0px grey',
    padding: '20px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#cfcfcf',
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#455A64",
    color: '#cfcfcf',
    fontFamily: "Raleway, sans-serif",
    fontWeight: 'bold',
    fontSize: "20px"
  },
  font: {
    fontFamily: "Raleway, sans-serif",
  }
}));


// The Field components job is to render out input html
// and pass down functions for updating the state
// as well as check to see if the values being passed are valid
// and it will do this by passing down props to the component they render
// nombre de usuario
// gebruiksnaam
// const TextFieldInput = ({ input, meta, label }) => {
//   console.log(meta);
//   // console.log('FIELD COMPONENT PROPS', props);
//   return <TextField
//     {...input}
//     label={ language === 'Dutch' ? 'gebruiksnaam':'nombre de usuario'}
//     // label={label}
//   />;
// };

const TextFieldInput = ({ input, meta, label, ...custom }) => {
  // console.log('FIELD COMPONENT PROPS', props);
  return <TextField {...input} label={label} meta={meta} {...custom} />;
};

// What Redux form does for us
// It will write the functions for updating form state
// It will also write state to determine the current state of each field
// It also gives us a function for getting the values out of the input
// and then putting it in out submit function

//what handleSubmit will do is pass the forms Values as the first parameter
// handleSubmit also preventsDefault for us right away
// to the function that it's calling
const SignIn = (props) => {
  const { handleSubmit, history } = props;
  const classes = useStyles();

  console.log(props);
  const handleSignIn = async (formValues, dispatch) => {
    console.log(formValues);
    //{ username: 'Your enterereduseRName', password: 'your password' }
    try {
      const res = await axios.post("/auth/signin", formValues);
      localStorage.setItem("token", res.data);
      localStorage.setItem("username", formValues.username);
      dispatch(setViewerToken(res.data));
      history.push(`/Profile/${formValues.username}`);
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <Grid container component="main" >
      <CssBaseline />
      <Navbar />
      {/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */}
      <Grid item xs={12} sm={8} md={5} className={classes.root}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className={classes.font}>
            SIGN IN
          </Typography>
          <form noValidate autoComplete="off" className={classes.form}>
            <Field
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="username"
              label="username"
              component={TextFieldInput}
              autoFocus
              className={classes.font}
            />
            <Field
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="password"
              component={TextFieldInput}
              type="password"
              className={classes.font}
            />
            <Button
              type="submit"
              fullWidth
              onClick={handleSubmit(handleSignIn)}
              variant="contained"
              className={classes.submit}
            >
              SIGN IN
            </Button>
            <Grid item>
              <Link href="/signup" variant="body2" className={classes.font}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
            <Box mt={5}>
              <Copyright className={classes.font} />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export const WrappedSignIn = reduxForm({ form: "signInForm" })(SignIn);
