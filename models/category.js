const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    validate(value) {
      if (value.length > 20 || value.length < 4) {
        throw new Error('Category names must be 4 to 20 characters long.');
      }
    },
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
