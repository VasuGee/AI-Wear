//CHANGE /BROWSE ACCORDING TO HOW REACT WORKS
const User = require("../models/user");

module.exports.register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      console.log("Welcome to AI-Wear!");
      //res.redirect("/browse");
    });
  } catch (e) {
    console.log(e.message);
    //res.redirect("/register");
  }
};

module.exports.login = (req, res) => {
  console.log("Welcome Back!");
  const redirectUrl = req.session.returnTo || "/browse";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logout();
  // req.session.destroy();
  console.log("Logged Out!");
  res.redirect("/browse");
};
