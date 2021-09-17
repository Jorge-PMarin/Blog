const express = require('express');
const path = require('path');
require('./db/mongoose');
const port = process.env.PORT || 3000;
const Post = require('./models/post');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: '*',
  })
);

app.use('/posts', postRouter);
app.use('/users', userRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
  });
} else {
  app.get('*', (req, res) => {
    res.send('API running.');
  });
}

app.listen(port, () => console.log(`Server listening on port ${port}...`));
