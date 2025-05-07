module.exports = {
  ensureAuth: function (req, res, next) {
    console.log("ensureAuth middleware triggered");
    if (req.isAuthenticated()) {
      if(req.user.userType === "customer" && req.originalUrl === "/forbusiness") {
        return res.redirect("/forcustomer");
      } else if (req.user.userType === "business" && req.originalUrl === "/forcustomer"){
        return res.redirect("/forbusiness");
      }
      return next();
    } else {
      res.redirect("/");
    }
  },
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/");
    }
  },
};
