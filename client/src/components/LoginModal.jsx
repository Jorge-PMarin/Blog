import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { LoginStart, LoginSuccess, LoginFailure } from '../context/userActions';

const axios = require('axios');

const API = process.env.BASE_URL;

export default function LoginModal({ isOpen, setIsOpen }) {
  const { user, dispatchUser } = useContext(UserContext);
  const email = useRef('');
  const password = useRef('');

  async function handleSubmit(e) {
    e.preventDefault();
    dispatchUser(LoginStart());
    try {
      const res = await axios.post(`${API}/users/login`, {
        email: email.current.value,
        password: password.current.value,
      });
      dispatchUser(LoginSuccess(res.data));
      window.location.replace('/');
    } catch (err) {
      console.log(err);
      dispatchUser(LoginFailure());
    }
  }

  if (!isOpen) return null;
  return (
    <div className="loginModal">
      <div className="loginModal__content">
        <span className="loginModal__content__close" onClick={() => setIsOpen(false)}>&times;</span>
        <form className="loginModal__content__form" onSubmit={handleSubmit}>
          <input type="text" className="loginModal__content__form__input" ref={email} placeholder="Email" />
          <input type="password" className="loginModal__content__form__input" ref={password} placeholder="Password" />
          <button type="submit" className="loginModal__content__form__btn">Log In</button>
        </form>
        {user.error && <span>Something went wrong.</span>}
        <div className="loginModel__content__btnWrapper" />
        <Link to="/register">
          <button type="button" className="loginModal__content__registerBtn">Create New Account</button>
        </Link>
      </div>
    </div>
  );
}