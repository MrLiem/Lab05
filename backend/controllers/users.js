const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { User } = require("../models/user");

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});

router.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true, user });
  });
});

router.post("/login", (req, res) => {
  // find the email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.status(400).json(err);
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found",
      });
    }

    //comparePassword
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({ loginSuccess: false, message: "wrong password" });
      }
      //generate Token
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({
          loginSuccess: true,
          userId: user._id,
          x_auth: user.token,
          isAdmin: user.isAdmin,
        });
      });
    });
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "" },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) return res.json({ success: false, message: err });
      return res.status(200).json({ success: true });
    }
  );
});

module.exports = router;
