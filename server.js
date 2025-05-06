const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride =require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const validator = require("validator");
const connectDB = require("./config/database");
const mainRoutes =require("./routes/main");
const debug = require("debug")("app:session");

// use .env file in config folder
require("dotenv").config({  path: "./config/.env" });

// passport config
require("./config/passport")(passport);

// connect to Database
connectDB();

// Set up sessions - stored in MongoDB
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.DB_STRING,
        }),
    })
);

app.use((req, res, next) => {
    debug("Session:", req.session);
    next();
});

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

// Body Parsing
app.use(express.urlencoded({  extended: true }));
app.use(express.json());

// Logging
app.use(logger("dev"));

// User forms for put and delete
app.use(methodOverride("_method"));

// User flash messages for errors, info, ect...
app.use(flash());

// Setup Routes for which the server is listening
app.use("/", mainRoutes);


// Server Running
app.listen(process.env.PORT || 8000, () =>{
    console.log(`Server is running on port ${process.env.PORT || 8000}`);
})