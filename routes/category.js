const express = require('express');
const Category = require('../models/category');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/', async (req, res) => {
  const category = new Category(req.body);
  try {
    await category.save();
    res.send();
  } catch(err) {
    res.send(err.errors.name.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({})
    res.send(categories)
  } catch(err) {
    res.sendStatus(500)
  }
})

module.exports = router;