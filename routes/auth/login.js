const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../../models/User");
const redirectAuthenticated = require('../../middleware/redirectAuthenticated');


router.get('/', redirectAuthenticated, (req, res) => {
  res.render('auth/login');
});

router.post('/', (req, res) => {
  const {email, password} = req.body;
// Try to find a user
  User.findOne({email: email}, (error, user) => {
    if (user) {
      // compare the user password
      bcrypt.compare(password, user.password, (error, match) => {
        // If password match, then auth the user
        if (match) {
          // Store user session
          req.session.userId = user._id;
          res.redirect('/');
          // Else, redirect user back
        } else {
          res.redirect('login');
        }
      })
      // I user does not exist, redirect user back
    } else {
      return res.redirect('/login');
    }
  })



});

module.exports = router;