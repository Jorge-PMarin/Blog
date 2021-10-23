import React from 'react';
import { Link } from 'react-router-dom';

const moment = require('moment');

export default function Post({ data }) {
  return (
    <Link to={`/post/${data._id}`} className="link">
      <div className="post">
        <div className="post__info">
          <p className="post__author">
            Author:
            {data.authorName}
          </p>
          <h4 className="post__title">{data.title}</h4>
          <h5 className="post__desc">{data.body}</h5>
          <p className="post__date">
            {moment(data.createdAt).format('lll')}
          </p>
        </div>
        <div className="post__container">
          <img
            src={`data:image/*;base64,${data.picture}`}
            alt="post"
            className="post__img"
          />
        </div>
      </div>
    </Link>
  );
}
