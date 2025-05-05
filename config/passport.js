const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");
const Organization = require("../models/Organization");
const { logout } = require("../controllers/auth");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      try {
        let user = await User.findOne({ email: email.toLowerCase() });
       
        if(!user){
          user = await Organization.findOne({ email: email.toLowerCase() });
        }

        if (!user) {
          return done(null, false, { msg: `Email ${email} not found.` });
        }

        if (!user.password) {
          return done(null, false, {
            msg:
              "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }

        try {
          const isMatch = await user.comparePassword(password);
          
          if (isMatch) {
            return done(null, user);
          }
          
          return done(null, false, { msg: "Invalid email or password." });
        } catch (err) {
          return done(err);
        }
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => {
    const type = user.schema?.path("organization") ? "organization" : "user" ;
    console.log("type is: ", type);
    done(null, { id: user.id, type});
  });


  passport.deserializeUser(async (obj, done) => {
    try {
      const user =
        obj.type === "user"
          ? await User.findById(obj.id)
          : await Organization.findById(obj.id);

      if (!user) {
        return done(new Error(`No user found with ID ${obj.id} in ${obj.type}`));
      }
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
