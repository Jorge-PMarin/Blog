import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/user/userContext';
import { axiosInstance } from '../config';
import TextareaAutosize from 'react-textarea-autosize';

export default function WritePost() {
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [file, setFile] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file)
      return alert(
        'Choose a picture for your post by clicking on the plus icon'
      );
    let post;

    try {
      const resText = await axiosInstance({
        method: 'post',
        url: `/posts`,
        headers: {
          Authorization: user.user.token,
        },
        data: {
          title,
          body,
        },
      });
      post = resText.data;
    } catch (err) {
      return console.log(err);
    }

    // upload image
    const formData = new FormData();
    formData.append('picture', file);
    formData.append('id', post._id);
    try {
      await axiosInstance({
        method: 'post',
        url: `/posts/picture`,
        headers: {
          Authorization: user.user.token,
        },
        data: formData,
      });
    } catch (err) {
      console.log('not working');
    }
    window.location.replace(`post/${post._id}`);
  }

  return (
    <div className="writePost">
      {file && (
        <img
          src={URL.createObjectURL(file)}
          alt="post"
          className="writePost__img"
          id="post_pic"
        />
      )}

      <form className="writePost__form" onSubmit={handleSubmit}>
        <div className="writePost__form-group">
          <label htmlFor="file-input" required>
            <i className="fas fa-plus writePost__plus-icon" />
          </label>
          <input
            type="file"
            className="writePost__file-input"
            id="file-input"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            className="writePost__title-input"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writePost__form-group">
          <TextareaAutosize
           placeholder="Tell your story..."
           className="writePost__textarea"
           onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <button type="submit" className="writePost__btn">
          Publish
        </button>
      </form>
    </div>
  );
}
