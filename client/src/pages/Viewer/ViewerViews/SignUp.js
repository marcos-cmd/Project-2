import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Navbar from '../../common/components/Navbar';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { setViewerToken } from '../ViewerReducer';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
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

const TextFieldInput = ({ input, meta, label }) => {
  // console.log('FIELD COMPONENT PROPS', props);
  return <TextField
    {...input}
    label={label}
  />;
};

// What Redux form does for us
// It will write the functions for updating form state
// It will also write state to determine the current state of each field
// It also gives us a function for getting the values out of the input
// and then putting it in out submit function

//what handleSubmit will do is pass the forms Values as the first parameter
// handleSubmit also preventsDefault for us right away
// to the function that it's calling
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  // test:{
  //   margin: '500px',
  // }
}));


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Covid Tracking
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
} 

export default function SignUp(props) {
  const classes = useStyles()

   const handleSignUp = async (formValues) => {
    console.log(formValues);
    //{ username: 'Your enterereduseRName', password: 'your password' }
    try {
      const res = await axios.post('/auth/signup', formValues);
      console.log('I AM THE SIGNUP USERS TOKEN', res.data);
      localStorage.setItem('token', res.data);
      localStorage.setItem('username', formValues.username)
      props.setViewerToken(res.data);
      props.history.push(`/Profile/${formValues.username}`);
      // sessionStorage.setItem('token', res.data);
    } catch (e) {
      throw new Error(e);
    }
  }
   
    const { handleSubmit } = props;
    return (
      <div>
        <div>
      <Navbar/>
        </div>
      <Container className={classes.test} component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
       
      <form className={classes.form} noValidate autoComplete="off">
      <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Field
          name='username'
          label='username'
          component={TextFieldInput}
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <Field
          name='password'
          label='password'
          component={TextFieldInput}
        />
        </Grid>
        <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submit}
          onClick={handleSubmit(handleSignUp)}>
          Sign up
        </Button>
        <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
      
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      </Container>
      </div>
    );
  
}


// const SignUp = (props) => {
//   const { handleSubmit, history } = props;
//
//   console.log(props);
//   const handleSignUp = async (formValues) => {
//     console.log(formValues);
//     //{ username: 'Your enterereduseRName', password: 'your password' }
//     try {
//       const res = await axios.post('/auth/signup', formValues);
//       console.log('I AM THE SIGNUP USERS TOKEN', res.data);
//       localStorage.setItem('token', res.data);
//       history.push('/users');
//       // sessionStorage.setItem('token', res.data);
//     } catch (e) {
//       throw new Error(e);
//     }
//   }
//
//   return (
//     <form noValidate autoComplete="off">
//       <Field
//         name='username'
//         label='username'
//         component={TextFieldInput}
//       />
//       <Field
//         name='password'
//         label='password'
//         component={TextFieldInput}
//       />
//       <Button
//         onClick={ handleSubmit(handleSignUp) }
//         variant="contained"
//         color="primary">
//         Sign up
//       </Button>
//     </form>
//   );
// };
function mapStateToProps(state) {
  return { superman: state.viewer };
};

// mapDispatchToProps

// const composedComponent = connect(mapStateToProps, { setUserToken })(SignUp);
//
//
// export const WrappedSignUp = reduxForm({ form: 'signUpForm' })(composedComponent);


// export const WrappedSignUp = reduxForm({ form: 'signUpForm' })(connect(mapStateToProps, { setUserToken })(SignUp));

export const WrappedSignUp = compose(
  reduxForm({ form: 'signUpForm' }),
  connect(mapStateToProps, { setViewerToken })
)(SignUp);
