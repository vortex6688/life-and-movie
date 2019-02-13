const express = require('express');
const router = express.Router();
const Post = require("../models/Post");

router.get('/', async (req, res) => {
  const posts = await Post.find({})
  res.render('posts/posts', {
    posts: posts
  });
});

router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id)
  res.render('posts/single-post', {
    post: post
  });
});

module.exports = router;