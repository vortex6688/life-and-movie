const express = require('express');
const router = express.Router();
const authCheck = require('../../middleware/authCheck');
const User = require("../../models/User");

router.post('/', (req, res) => {
  User.create(req.body, (error, user) => {
    if (error) {
      const registrationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
      req.flash('registrationErrors', registrationErrors);
      req.flash('data', req.body);
      return res.redirect('/register');
    }
    res.redirect('/');
  })
});

router.get('/', authCheck, (req, res) => {
  const data = req.flash('data');
  console.log(data)
  res.render('auth/register', {
    errors: req.flash('registrationErrors'),
    data: data
  });
});

module.exports = router