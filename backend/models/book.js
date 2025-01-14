const mongoose = require('mongoose');
const Author = require('./author'); // Import Author model

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1
  },
  published: {
    type: Number,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author', // Reference to Author model
    required: true
  },
  genres: [
    {
      type: String,
      required: true
    }
  ]
});

module.exports = mongoose.model('Book', bookSchema);
