const express = require('express');
const Post = require('../models/post');
const auth = require('../middleware/auth');

const multer = require('multer');
const upload = multer({});

const router = express.Router();

//create post
router.post('/', auth, async (req, res) => {
  const post = new Post({
    ...req.body,
    authorId: req.user._id,
    authorName: req.user.name,
  });

  try {
    await post.save();
    res.send(post);
  } catch (err) {
    res.sendStatus(500);
  }
});

//get all posts
router.get('/', async (req, res) => {
  try {
    let posts = [];
    let posts_objs = [];
    if (req.query.user) {
      posts = await Post.find({ authorName: req.query.user });
    } else {
      posts = await Post.find();
    }
    posts.forEach((post) => {
      posts_objs.push(post.toObject());
    });
    res.send(posts_objs);
  } catch (err) {
    res.sendStatus(500);
  }
});

//get post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('authorId', [
      'avatar',
      'name',
    ]);
    if (!post) {
      return res.sendStatus(404);
    }
    const post_obj = post.toObject();
    res.send(post_obj);
  } catch (err) {
    res.sendStatus(err);
  }
});

//update post
router.patch('/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const validUpdates = ['title', 'body'];
  const isValidOperation = updates.every((update) =>
    validUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.sendStatus(400);
  }

  try {
    const post = await Post.findOne({
      _id: req.params.id,
      authorId: req.user._id,
    });

    if (!post) return res.sendStatus(401);

    updates.forEach((update) => {
      post[update] = req.body[update];
    });
    const updatedPost = await post.save();
    res.send(updatedPost);
  } catch (err) {
    res.sendStatus(500);
  }
});

//upload post picture
router.post('/picture', auth, upload.single('picture'), async (req, res) => {
  try {
    const post = await Post.findById(req.body.id);
    post.picture = req.file.buffer;
    await post.save();
    res.send();
  } catch (err) {
    res.sendStatus(500);
  }
});

//delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findOneAndRemove({
      _id: req.params.id,
      authorId: req.user._id,
    });
    if (!post) return res.sendStatus(401);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
