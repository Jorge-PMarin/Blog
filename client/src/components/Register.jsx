import React, { useRef, useState, useContext } from 'react';
import { UserContext } from '../context/userContext';
import { LoginSuccess } from '../context/userActions';

const axios = require('axios');

const API = process.env.BASE_URL;

export default function Register() {
  const [error, setError] = useState(null);
  const { dispatchUser } = useContext(UserContext);

  const name = useRef();
  const email = useRef();
  const pass = useRef();
  const confirmPass = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    // Form validation upon submit
    const nameValue = name.current.value.trim();
    const emailValue = email.current.value.trim();
    const passValue = pass.current.value.trim();
    const confirmPassValue = confirmPass.current.value.trim();

    // Set error
    function setNewError(input, message) {
      const formDiv = input.parentElement;
      const small = formDiv.querySelector('small');

      formDiv.className = 'register__form__input error';
      small.innerText = message;
    }

    // Set success
    function setSuccess(input) {
      const formDiv = input.parentElement;
      formDiv.className = 'register__form__input success';
    }

    function isEmail(value) {
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    }

    // check name
    if (nameValue === '') {
      return setNewError(name.current, 'Name cannot be blank');
    } if (nameValue.length < 3) {
      return setNewError(name.current, 'Name must be at least 3 characters long');
    }
    name.current.parentElement.className = 'register__form__input success';

    // check email
    if (!isEmail(emailValue)) {
      return setNewError(email.current, 'Email is not valid');
    }
    setSuccess(email.current);

    // check password
    if (passValue.length < 8) {
      return setNewError(pass.current, 'Password must be at least 8 characters long.');
    } if (passValue !== confirmPassValue) {
      setSuccess(pass.current);
      return setNewError(confirmPass.current, 'Passwords do not match');
    }
    setSuccess(pass.current);
    setSuccess(confirmPass.current);

    try {
      const res = await axios.post(`${API}/users`, {
        name: nameValue,
        email: emailValue,
        password: passValue,
      });

      console.log(res.data.name);
      dispatchUser(LoginSuccess(res.data));
    } catch (err) {
      setError('Something went wrong, try again');
      console.log(err);
    }
  }

  return (
    <div className="register">
      <h1 className="register__header">Sign up</h1>
      <form className="register__form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name-input">Name:</label>
          <input
            type="text"
            id="name-input"
            className="register__form__input error"
            placeholder="Your name"
            ref={name}
          />
          <i className="fas fa-exclamation-circle" />
          <i className="fas fa-check-circle" />
          <small>Error message</small>
        </div>
        <div>
          <label htmlFor="email-input">Email:</label>
          <input
            type="text"
            id="email-input"
            className="register__form__input"
            placeholder="Your email"
            ref={email}
          />
          <i className="fas fa-exclamation-circle" />
          <i className="fas fa-check-circle" />
          <small>Error message</small>
        </div>
        <div>
          <label htmlFor="pass-input">Password:</label>
          <input
            type="password"
            id="pass-input"
            className="register__form__input"
            placeholder="Your password"
            ref={pass}
          />
          <i className="fas fa-exclamation-circle" />
          <i className="fas fa-check-circle" />
          <small>Error message</small>
        </div>
        <div>
          <label htmlFor="confirm-input">Confirm your password:</label>
          <input
            type="password"
            id="confirm-input"
            className="register__form__input"
            placeholder="Your password"
            ref={confirmPass}
          />
          <i className="fas fa-exclamation-circle" />
          <i className="fas fa-check-circle" />
          <small>Error message</small>
        </div>
        <button type="submit" className="register__form__btn">Sign up</button>
      </form>
      {error && <small className="register__error">{error}</small>}
    </div>
  );
}
