const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Post = require('../models/post');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate(value) {
        if (value.length < 3) {
          throw new Error('Name must be at least 3 characters long.');
        }
      },
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email.');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 8) {
          throw new Error('Password must be at least 8 characters long.');
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.pre('remove', async function (next) {
  const user = this;
  try {
    await Post.deleteMany({ authorId: user._id });
    next();
  } catch (err) {
    return new Error();
  }
});

userSchema.statics.findByCredentials = async function (email, password) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Wrong credentials. Try again.');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return user;
    }
  } catch (err) {
    return err.message;
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
