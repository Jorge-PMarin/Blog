import React from 'react';

export default function Header() {
  return (
    <header className="header">
      <div className="header__content">
        <h1 className="header__content__title">Natours is a good place to write, read and connect.</h1>
        <h2 className="header__content__para">It is easy and free to post your thinking on any topic and connect with millions of readers.</h2>
        <button type="submit" className="header__content__btn">Start Writing</button>
      </div>
    </header>
  );
}
