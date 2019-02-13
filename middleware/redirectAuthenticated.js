// Redirect Authenticated users middleware

module.exports = (req, res, next) => {
  // If user is logged in and given the userId
  if(req.session.userId) {
      // Redirect back to the home page
      return res.redirect('/');
  };
  // Otherwise load the requested page
  next()
}