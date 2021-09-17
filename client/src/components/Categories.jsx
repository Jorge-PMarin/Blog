import React from 'react';
import Category from './Category';

export default function Categories() {
  return (
    <div className="container">
      <p className="container__heading">Discover more of what matters to you</p>
      <div className="container__categories">
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
        <Category />
      </div>
      <span className="container__others">See all topics</span>
    </div>
  );
}
