const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

const app = express();
const port = 3000;

mongoose
  .connect("mongodb://127.0.0.1:27017/AIwear")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => {
    console.error("Could not connect to MongoDB...");
    console.log(err);
  });

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
