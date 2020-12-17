const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const { User } = require('../model');

const localStrategy = new LocalStrategy(async (username, password, done) => {
  let user;
  try {
    user = await User.findOneByUsername(username);
  } catch (e) {
    return done(e, null);
  }
  if (user) {
    const doesPasswordMatch = await user.comparePassword(password);
    console.log("password", password)
    if (doesPasswordMatch) {
      console.log(doesPasswordMatch);
      return done(null, user);
    }
    console.log('happening');
    return done(null, false);
  } else {
    console.log('happening');
    return done(null, false);
  }
  //   if no user was found call done like return done(null, false);
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new JwtStrategy(jwtOptions, async (jwtToken, done) => {
  console.log(jwtToken);
  let user;

  try {
    user = await User.findById(jwtToken.sub);
    // user = await fetchUserByIdFromDb(jwtToken.sub);
  } catch (e) {
    return done(e, null);
  }

  if (!user) {
    return done(null, false);
  } else {
    // take the user that is being passed as the 2nd parameter
    // and attach it to req.user on the next request
    return done(null, user);
  }
});

passport.use(localStrategy);
passport.use(jwtStrategy);
