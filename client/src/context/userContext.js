import React, { useReducer, useEffect } from 'react';
import userReducer from './userReducer';

export const UserContext = React.createContext();

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isFetching: false,
  error: false,
};

export function UserContextProvider({ children }) {
  const [user, dispatchUser] = useReducer(userReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user.user));
  }, [user.user]);

  return (
    <UserContext.Provider value={{ user, dispatchUser }}>
      {children}
    </UserContext.Provider>
  );
}
