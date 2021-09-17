import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import WritePage from './pages/WritePage';
import SettingsPage from './pages/SettingsPage';
import RegisterPage from './pages/RegisterPage';
import { UserContext } from './context/userContext';

function App() {
  const { user } = useContext(UserContext);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/write">
          {user.user ? <WritePage /> : <RegisterPage />}
        </Route>
        <Route path="/settings">
          {user.user ? <SettingsPage /> : <RegisterPage />}
        </Route>
        <Route path="/register">
          {user.user ? <HomePage /> : <RegisterPage />}
        </Route>
        <Route path="/post/:id">
          <PostPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
