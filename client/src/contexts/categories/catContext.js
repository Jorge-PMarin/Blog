import React, { useReducer, useEffect, useState } from 'react';
import catReducer from './catReducer';
import { axiosInstance } from '../../config';

export const CatContext = React.createContext();

const INITIAL_STATE = {
  categories: [],
  isFetching: false,
  isPosting: false,
  error: false,
};

export function CatContextProvider({ children }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const res = await axiosInstance('/categories');
      setCategories(res.data);
    }
    fetchCategories();
  }, []);

  return (
    <CatContext.Provider value={{ categories, setCategories }}>
      {children}
    </CatContext.Provider>
  );
}
