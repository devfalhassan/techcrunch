const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A post must have a title'],
    unique: true,
    trim: true
  },
  content: {
    type: String,
    required: [true, 'A post must have contents'],
    trim: true
  },
  tags: [String],
  coverImage: {
    type: String
  },
  images: [String],
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
