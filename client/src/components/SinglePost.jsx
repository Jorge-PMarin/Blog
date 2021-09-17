import React, { useEffect, useState, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import defaultUserPic from '../images/user.png';
import { UserContext } from '../context/userContext';

const axios = require('axios');

const API = process.env.BASE_URL;

export default function SinglePost() {
  const [post, setPost] = useState({});
  const [updateMode, setUpdateMode] = useState(false);
  const { user } = useContext(UserContext);
  const location = useLocation();

  // post updates
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [postPic, setPostPic] = useState();

  useEffect(() => {
    const postToDisplayId = location.pathname.split('/')[2];

    async function fetchPost() {
      try {
        const res = await axios(`${API}/posts/${postToDisplayId}`);
        setPost(res.data);
        setTitle(res.data.title);
        setBody(res.data.body);
        setPostPic(res.data.picture);
      } catch (err) {
        console.log(err);
      }
    }
    fetchPost();
  }, []);

  async function handleDelete() {
    try {
      await axios({
        method: 'delete',
        url: `${API}/posts/${post._id}`,
        headers: {
          Authorization: user.user.token,
        },
      });
      window.location.replace(`/?user=${user.user.name}`);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdate() {
    try {
      await axios({
        method: 'patch',
        url: `${API}/posts/${post._id}`,
        headers: {
          Authorization: user.user.token,
        },
        data: {
          title,
          body,
        },
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <article className="singlePost">
      {console.log(post.authorId?.avatar)}
      {
                updateMode ? (
                  <input
                    value={title}
                    className="singlePost__titleInput"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                ) : (
                  <h1 className="singlePost__title">{title}</h1>
                )
            }
      {!updateMode && (
      <section className="singlePost__info">
        <div className="singlePost__info__author">
          {post.authorId?.avatar ? (
            <div className="singlePost__info__author__container">
              <img
                src={`data:image/*;base64,${post.authorId?.avatar}`}
                alt="Author"
                className="singlePost__info__author__container__pic"
              />
            </div>
          ) : (
            <div className="singlePost__info__author__container">
              <img
                src={defaultUserPic}
                alt="Author"
                className="singlePost__info__author__container__pic"
              />
            </div>
          )}
          <div className="div singlePost__info__author__about">
            <Link to={`/?user=${post.authorName}`} className="link">
              <p className="singlePost__info__author__about__name">{post.authorName}</p>
            </Link>
            <button type="button" className="singlePost__info__author__about__followBtn">Follow</button>
          </div>
        </div>
        {(post.authorName === user.user?.name) && (
        <div className="singlePost__info__edit">
          <i onClick={() => setUpdateMode(true)} className="fas fa-edit singlePost__info__edit__updateIcon" />
          <i onClick={handleDelete} className="fas fa-trash singlePost__info__edit__thrashIcon" />
        </div>
        )}
      </section>
      )}
      <section className="singlePost__content">
        <img
          src={`data:image/*;base64,${postPic}`}
          alt="post"
          className="singlePost__content__img"
        />
        {
                    updateMode ? (
                      <>
                        <textarea
                          className="singlePost__content__textarea"
                          value={body}
                          onChange={(e) => setBody(e.target.value)}
                        />
                        <button type="button" className="singlePost__content__updateBtn" onClick={handleUpdate}>Update</button>
                      </>
                    ) : (
                      <p className="singlePost__content__text">{body}</p>
                    )
                }
      </section>
    </article>
  );
}