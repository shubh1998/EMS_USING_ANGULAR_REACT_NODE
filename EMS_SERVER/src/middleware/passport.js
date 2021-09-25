var passport = require("passport");
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var AuthTable = require("../models/AuthTable");
const config = require("../../config")

var opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.JWT_SECRET;
opts.passReqToCallback = true; //lets you access the http-request in callback
opts.failWithError = true;

passport.use(
  new JwtStrategy(opts, async function (req, jwt_payload, done) {
    //remove Bearer and fetch the naked JWT
    let token = req.headers.authorization.split(" ")[1];

    let user;

    if (jwt_payload.role) {
      user = await AuthTable.query()
        .where({
          auth_token: token,
          user_id: jwt_payload.id,
        })
        .first();
    }
    if (user) {
      return done(null, user);
    } else {
      return done(unauthorizedError("Authentication Failure"));
    }
  })
);
