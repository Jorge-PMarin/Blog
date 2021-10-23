import React, { useEffect, useState, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import defaultUserPic from '../images/user.png';
import { UserContext } from '../contexts/user/userContext';
import { axiosInstance } from '../config';
import TextareaAutosize from 'react-textarea-autosize';

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
        const res = await axiosInstance(`/posts/${postToDisplayId}`);
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
      await axiosInstance({
        method: 'delete',
        url: `/posts/${post._id}`,
        headers: {
          Authorization: user.user.token,
        },
      });
      window.location.replace(`/`);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdate() {
    try {
      await axiosInstance({
        method: 'patch',
        url: `/posts/${post._id}`,
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
      {updateMode ? (
        <input
          value={title}
          className="singlePost__titleInput"
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
      ) : (
        <h1 className="singlePost__title">{title}</h1>
      )}
      {!updateMode && (
        <section className="singlePost__info">
          <div className="singlePost__author">
            {post.authorId?.avatar ? (
              <div className="singlePost__wrapper">
                <img
                  src={`data:image/*;base64,${post.authorId?.avatar}`}
                  alt="Author"
                  className="singlePost__avatar"
                />
              </div>
            ) : (
              <div className="singlePost__wrapper">
                <img
                  src={defaultUserPic}
                  alt="Author"
                  className="singlePost__avatar"
                />
              </div>
            )}
            <div className="div singlePost__about">
              <Link to={`/?user=${post.authorId?.name}`} className="link">
                <p className="singlePost__author-name">
                  {post.authorId?.name}
                </p>
              </Link>
              <button
                type="button"
                className="singlePost__follow-btn"
              >
                Follow
              </button>
            </div>
          </div>
          {post.authorId?.name === user.user?.name && (
            <div className="singlePost__options">
              <i
                onClick={() => setUpdateMode(true)}
                className="fas fa-edit singlePost__update-icon"
              />
              <i
                onClick={handleDelete}
                className="fas fa-trash singlePost__delete-icon"
              />
            </div>
          )}
        </section>
      )}
      <section className="singlePost__content">
        <img
          src={`data:image/*;base64,${postPic}`}
          alt="post"
          className="singlePost__post-img"
        />
        {updateMode ? (
          <>
            <TextareaAutosize
              className="singlePost__textarea"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <button
              type="button"
              className="singlePost__update-btn"
              onClick={handleUpdate}
            >
              Update
            </button>
          </>
        ) : (
          <p className="singlePost__text">{body}</p>
        )}
      </section>
    </article>
  );
}
