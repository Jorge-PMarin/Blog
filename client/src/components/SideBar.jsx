import React, { useState, useEffect } from 'react';
import Categories from './Categories';
import { axiosInstace, axiosInstance } from '../config';

export default function SideBar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const categories = await axiosInstance('/categories');
      setCategories(categories.data)
    }
    fetchCategories();
  }, []);

  return (
    <aside className="sidebar">
      <Categories categories={categories}/>
    </aside>
  );
}
