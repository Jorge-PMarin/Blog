import React, { useState, useContext } from 'react';
import defaultUserPic from '../images/user.png';
import { UserContext } from '../context/userContext';
import { Logout, Update } from '../context/userActions';

const axios = require('axios');

const API = process.env.BASE_URL;

export default function Settings() {
  const { user, dispatchUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const [success] = useState(null);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passConfirm, setPassConfirm] = useState();
  const [file, setFile] = useState();

  async function handleSubmit(e) {
    e.preventDefault();

    // submit form text
    try {
      if (password !== passConfirm) {
        throw new Error('Passwords do not match');
      }
      const textRes = await axios({
        method: 'patch',
        url: `${API}/users`,
        headers: {
          Authorization: user.user.token,
        },
        data: {
          name,
          email,
          password,
        },
      });
      dispatchUser(Update(textRes.data));
    } catch (err) {
      setError('Something went wrong. Try again');
    }

    // submit picture
    console.log('yes');
    if (!file) return;
    const formData = new FormData();
    formData.append('avatar', file);
    try {
      const picRes = await axios({
        method: 'post',
        url: `${API}/users/avatar`,
        headers: {
          Authorization: user.user.token,
        },
        data: formData,
      });
      dispatchUser(Update(picRes.data));
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete() {
    const confirm = window.confirm('Are you sure?');
    if (!confirm) return;
    try {
      await axios({
        method: 'delete',
        url: `${API}/users`,
        headers: {
          Authorization: user.user.token,
        },
      });
      dispatchUser(Logout());
    } catch (err) {
      console.log(err);
    }
  }

  function handlePicPreview(e) {
    const pic = document.getElementById('pic');
    const picBlob = e.target.files[0];
    if (picBlob) {
      pic.src = URL.createObjectURL(picBlob);
    }
    setFile(picBlob);
  }

  return (
    <div className="settings">
      <div className="settings__top">
        <h1 className="settings__top__title">Update your account</h1>
        <span className="settings__top__deleteOption" onClick={handleDelete}>Delete account</span>
      </div>
      <form method="post" className="settings__form" encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="settings__form__picWrapper">
          {user.user.avatar ? (
            <img
              src={`data:image/*;base64,${user.user.avatar.toString('base64')}`}
              alt="avatar"
              className="settings__form__picWrapper__pic"
              id="pic"
            />
          ) : (
            <img
              src={defaultUserPic}
              className="settings__form__picWrapper__pic"
              id="pic"
              alt="avatar"
            />
          )}
          <label htmlFor="pic-input">
            <i className="fas fa-image settings__form__picWrapper__icon" />
          </label>
          <input
            type="file"
            className="settings__form__picWrapper__fileInput"
            id="pic-input"
            accept="image/*"
            onChange={handlePicPreview}
          />
        </div>
        <label htmlFor="username-input">New username</label>
        <input
          type="text"
          id="username-input"
          className="settings__form__input"
          placeholder={user.user.name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email-input">New email</label>
        <input
          type="text"
          id="email-input"
          className="settings__form__input"
          placeholder={user.user.email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password-input">New password</label>
        <input
          type="password"
          id="password-input"
          className="settings__form__input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="confirm-pass-input">Confirm password</label>
        <input
          type="password"
          id="confirm-pass-input"
          className="settings__form__input"
          onChange={(e) => setPassConfirm(e.target.value)}
        />
        <button type="submit" className="settings__form__btn">Update</button>
        {error && <small>{error}</small>}
        {success && <small>{success}</small>}
      </form>
    </div>
  );
}
