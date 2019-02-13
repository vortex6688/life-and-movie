const mongoose = require('mongoose');

// Post Schema
const PostSchema = new mongoose.Schema({
  title: { 
    type: String
  },
  content: {
    type: String
  },
  username: {
    type: String
  },
  image: {
    type: String
  },
  creationDate: {
    type: Date,
    default: new Date()
  }
})

const Post = mongoose.model('Post', PostSchema);

module.exports = Post