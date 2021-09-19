import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo-green-1x.png';
import defaultUserPic from '../images/user.png';
import LoginModal from './LoginModal';
import { UserContext } from '../context/userContext';
import { Logout } from '../context/userActions';
import { axiosInstance } from '../config';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, dispatchUser } = useContext(UserContext);

  async function logout() {
    try {
      await axiosInstance({
        method: 'post',
        url: `/users/logout`,
        headers: {
          Authorization: user.user.token,
        },
      });
      dispatchUser(Logout());
      window.location.replace('/');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <header className="navbar">
        <div className="navbar__left">
          <img src={logo} alt="logo" className="navbar__left__logo" />
        </div>
        <ul className="navbar__middle">
          <li>
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/" className="link">
              About
            </Link>
          </li>
          <li>
            <Link to="/write" className="link">
              Write
            </Link>
          </li>
          {user.user ? (
            <li onClick={logout}>Logout</li>
          ) : (
            <li onClick={() => setIsOpen(true)}>Sign In</li>
          )}
        </ul>
        <div className="navbar__right">
          {user.user ? (
            <Link to="/settings">
              {user.user.avatar ? (
                <img
                  src={`data:image/*;base64,${user.user.avatar.toString(
                    'base64'
                  )}`}
                  alt="Profile pic"
                  className="navbar__right__pic"
                />
              ) : (
                <img
                  src={defaultUserPic}
                  alt="Profile pic"
                  className="navbar__right__pic"
                />
              )}
            </Link>
          ) : (
            <Link to="/register">
              <button type="button" className="navbar__right__btn">
                Get started
              </button>
            </Link>
          )}
        </div>
      </header>
    </>
  );
}
