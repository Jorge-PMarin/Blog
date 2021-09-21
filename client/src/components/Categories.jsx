import React from 'react';
import Category from './Category';

export default function Categories({ categories }) {
  return (
    <div className="container">
      <p className="container__heading">Discover more of what matters to you</p>
      <div className="container__categories">
        {categories.map((category) => (
          <Category key={category._id} categoryName={category.name} />
        ))}
      </div>
      <span className="container__others">See all topics</span>
    </div>
  );
}
