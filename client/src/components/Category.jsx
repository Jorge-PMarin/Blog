import React from 'react';
import { Link } from 'react-router-dom';

export default function Category({ categoryName }) {
  return (
    <Link to={`/?category=${categoryName}`} className="link">
      <span className="category">{categoryName}</span>
    </Link>
  );
}
