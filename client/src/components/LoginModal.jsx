import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/user/userContext';
import {
  LoginStart,
  LoginSuccess,
  LoginFailure,
} from '../contexts/user/userActions';
import { axiosInstance } from '../config';

export default function LoginModal({ isOpen, setIsOpen }) {
  const { user, dispatchUser } = useContext(UserContext);
  const email = useRef('');
  const password = useRef('');

  async function handleSubmit(e) {
    e.preventDefault();
    dispatchUser(LoginStart());
    try {
      const res = await axiosInstance.post(`/users/login`, {
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
        <span className="loginModal__close" onClick={() => setIsOpen(false)}>
          &times;
        </span>
        <form className="loginModal__form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="loginModal__input"
            ref={email}
            placeholder="Email"
          />
          <input
            type="password"
            className="loginModal__input"
            ref={password}
            placeholder="Password"
          />
          <button type="submit" className="loginModal__btn">
            Log In
          </button>
        </form>
        {user.error && (
          <small className="loginModal__error">
            Something went wrong. Please try again.
          </small>
        )}

        <Link to="/register" >
          <button type="button" className="loginModal__register">
            Create New Account
          </button>
        </Link>
      </div>
    </div>
  );
}
