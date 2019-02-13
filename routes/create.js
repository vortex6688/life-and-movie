const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const path = require('path');
const fileUpload = require('express-fileupload');
const validationMiddleware = require('../middleware/createPostValidation');
const authCheck = require('../middleware/authCheck');

// Use Fileuploader
router.use(fileUpload());


router.get('/', authCheck, (req, res) => {
  if (req.session.userId) {
    return res.render('create/create');
  }
  res.redirect('login');
});

router.post('/', validationMiddleware, (req, res) => {
  const { image } = req.files
  image.mv(path.resolve(__dirname, '../public/images/posts', image.name), (error) => {
    Post.create({
      ...req.body,
      image: `/images/posts/${image.name}`,
    }, 
    (error, post) => {
      res.redirect('/');
    })
  })
});

module.exports = router;