import React, { useState, useRef, useContext } from 'react';
import LoginModal from './LoginModal';
import { UserContext } from '../contexts/user/userContext';
import { Logout } from '../contexts/user/userActions';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../config';

export default function MobileMenu() {
  const { user, dispatchUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const MobileMenuLinksRef = useRef();

  function handleClick() {
    MobileMenuLinksRef.current.classList.toggle('mobileMenu__links--active');
  }

  async function handleLogout() {
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

      <div className="mobileMenu">
        <button className=" mobileMenu__btn" onClick={handleClick}>
          <i className="fa fa-bars"></i>
        </button>
        <div className="mobileMenu__links" ref={MobileMenuLinksRef}>
          <Link to="/" className="mobileMenu__link">
            Home
          </Link>
          <Link to="/about" className="mobileMenu__link">
            About
          </Link>
          <Link to="/write" className="mobileMenu__link">
            Write
          </Link>

          {!user.user ? (
            <>
              <Link
                to="/"
                className="mobileMenu__link"
                onClick={() => setIsOpen(true)}
              >
                Sign In
              </Link>
              <Link to="/register" className="mobileMenu__link">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link to="/settings" className="mobileMenu__link">
                Account
              </Link>
              <button className="MobileMenu__logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
