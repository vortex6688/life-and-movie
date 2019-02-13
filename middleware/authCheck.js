// Authentication Validation middleware
const User = require('../models/User');

module.exports = (req, res, next) => {
  // Fetch User From Database
  User.findById(req.session.userId, (error, user) => {
    // Verify The User
    if(error || !user) {
      // Reject the request and redirect back to the login page
      return res.redirect('/login');
    }
    // If User is valid, permit request
    next()
  });
}