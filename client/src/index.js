import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/styles.scss';
import { UserContextProvider } from './contexts/user/userContext';
import { CatContextProvider } from './contexts/categories/catContext';

ReactDOM.render(
  <UserContextProvider>
    <CatContextProvider>
      <App />
    </CatContextProvider>
  </UserContextProvider>,
  document.getElementById('root')
);
