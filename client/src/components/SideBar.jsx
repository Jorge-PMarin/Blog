import React, { useContext } from 'react';
import Categories from './Categories';
import { CatContext } from '../contexts/categories/catContext';

export default function SideBar() {
  const { categories, dispatchCategories } = useContext(CatContext);

  return (
    <aside className="sidebar">
      <Categories categories={categories} />
    </aside>
  );
}
