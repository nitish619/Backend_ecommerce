const mongoose = require('mongoose');

const comicBookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
  },
  issueNumber: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  coverImage: {
    type: String, // URL to image
  },
}, { timestamps: true });

module.exports = mongoose.model('ComicBook', comicBookSchema);
