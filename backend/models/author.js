const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1
  },
  born: {
    type: Number,
  }
});

module.exports = mongoose.model('Author', authorSchema);
