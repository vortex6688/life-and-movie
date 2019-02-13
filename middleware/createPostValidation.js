// Post Validation middleware

module.exports = (req, res, next) => {
  if(!req.files.image || !req.body.title || !req.body.content) {
    return res.redirect('/create');
  }
  next()
}


