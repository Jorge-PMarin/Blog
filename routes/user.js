const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');
const upload = multer({});

const router = express.Router();

//get users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

//create user
router.post('/', async (req, res) => {
  const user = new User(req.body);
  try {
    //

    const token = await user.generateToken();
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    res.send({ ...userObject, token });
  } catch (err) {
    res.sendStatus(500);
  }
});

//login user
router.post('/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateToken();
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    res.send({ ...userObject, token });
  } catch (err) {
    res.sendStatus(500);
  }
});

//logout user
router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (err) {
    res.sendStatus(500);
  }
});

//logoutAll
router.post('/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (err) {
    res.sendStatus(500);
  }
});

//update user
router.patch('/', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const validUpdates = ['name', 'email', 'password'];
  const isValidOperation = updates.every((update) =>
    validUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.sendStatus(400);
  }

  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });
    const updatedUser = await req.user.save();
    const UpdatedUserObj = updatedUser.toObject();
    delete UpdatedUserObj.tokens;
    delete UpdatedUserObj.password;
    UpdatedUserObj.token = req.token;
    res.send(UpdatedUserObj);
  } catch (err) {
    res.sendStatus(500);
  }
});

//delete user
router.delete('/', auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send();
  } catch (err) {
    res.sendStatus(500);
  }
});

router.post('/avatar', auth, upload.single('avatar'), async (req, res) => {
  try {
    req.user.avatar = req.file.buffer;
    const user = await req.user.save();

    //hide info
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.tokens;
    userObj.token = req.token;
    res.send(userObj);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
