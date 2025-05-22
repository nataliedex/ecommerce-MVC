const passport = require("passport");
const validator = require("validator");
const Customer = require("../models/Customer");
const Business = require("../models/Business");


module.exports = {
    getLogin : (req, res) => {
      console.log(req.user);
        if(req.user) {
          return res.redirect("/product");
        }
        res.render("login.ejs", { user: req.user || null });
      },

      postLogin : (req, res, next) => {
        console.log(req.user);
        const validationErrors = [];
        if (!validator.isEmail(req.body.email))
          validationErrors.push({ msg: "Please enter a valid email address." });
        if (validator.isEmpty(req.body.password))
          validationErrors.push({ msg: "Password cannot be blank." });
      
        if (validationErrors.length) {
          req.flash("errors", validationErrors);
          return res.redirect("/login");
        }
        req.body.email = validator.normalizeEmail(req.body.email, {
          gmail_remove_dots: false,
        });
      
        passport.authenticate("local", (err, user, info) => {
          if (err) {
            return next(err);
          }
          if (!user) {
            req.flash("errors", info);
            return res.redirect("/login");
          }
      
          return new Promise((resolve, reject) => {
            req.logIn(user, (err) => {
              if (err) {
                console.error("Login error:", err);
                return reject(err);
              }
              req.flash("success", { msg: "Success! You are logged in." });
      
            // Log session and user info for debugging
            console.log("Logged-in user:", req.user);
            console.log("Session details:", req.session);
      
            const redirectPath = (req.user.type === "business" ? "/product" : "/shop");
            const finalRedirect = req.session.returnTo || redirectPath;
      
            req.session.returnTo = null;
            res.redirect(finalRedirect);
            resolve();
          });
        }).catch(next);
        })(req, res, next);
    },

    logout: (req, res, next) => {
      console.log("Logging out user:", req.user);
    
      req.logout((err) => {
        if (err) {
          return next(err);
        }
    
        req.session.destroy((destroyErr) => {
          if (destroyErr) {
            console.error("Error destroying session:", destroyErr);
            return next(destroyErr);
          }
    
          res.clearCookie("connect.sid"); // or whatever your session cookie is named
          res.redirect("/");
        });
      });
    },

 
    getSignUp: async(req, res) => {
      try {
        if(req.user){
          const redirectPath = (req.user.type === "business" ? "/product" : "/shop");
          return res.redirect(redirectPath);
        }
        res.render("signup.ejs", {user: req.user || null});

      } catch(err){
        console.log(err);
        return res.status(500).send("An error occurred during getSignUp")
      }

    },
   // modify this sign up to check whether company or individual
    postSignUp: async(req, res, next) => {
      let Model;
      let userData;
      const validationErrors = validateSignupInputs(req.body);
    
        if(validationErrors.length){
        req.flash("errors", validationErrors);
        return res.redirect("../signup");
        }
        req.body.email = validator.normalizeEmail(req.body.email, {
        gmail_remove_dots: false,
        });

        const { userType } = req.body;

        if(userType === "business"){
            userData =  {
            userType: "business",
            companyName: req.body.companyName,
            email: req.body.email,
            password: req.body.password,
            };
            Model = Business;
        } else if(userType === "customer"){
            userData =  {
            userType: "customer",
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            };
            Model = Customer;
        }

        const redirectPath = "/product";
        console.log("Model:", Model);
        console.log("redirectPath: ", redirectPath);
    
        try {
            const existingUser = await Model.findOne({ email: req.body.email });
            
            if (existingUser) {
            req.flash("errors", {
                msg: "Account with that email address already exists.",
            });
            return res.redirect("../signup");
            }
            const newUser = new Model(userData);
            await newUser.save();
            
            return new Promise((resolve, reject) => {
            req.logIn(newUser, (err) => {
                if (err) {
                console.log("login error:", err);
                return reject(err);
                }
                res.redirect(redirectPath) ;
                resolve();
            });
            });
        } catch (err) {
            console.error("signup error:", err);
            return next(err);
        }

    },

};
  

function validateSignupInputs(body) {
    const errors = [];
    if (!validator.isEmail(body.email))
    errors.push({ msg: "Please enter a valid email address." });
    if (!validator.isLength(body.password, { min: 8 }))
    errors.push({ msg: "Password must be at least 8 characters long" });
    if (body.password !== body.confirmPassword)
    errors.push({ msg: "Passwords do not match." });
    return errors;
};