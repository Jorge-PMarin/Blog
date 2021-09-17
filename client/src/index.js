import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/styles.scss';
import { UserContextProvider } from './context/userContext';

ReactDOM.render(
  <UserContextProvider>
    <App />
  </UserContextProvider>,
  document.getElementById('root'),
);
