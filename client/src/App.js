import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header.component';
import HomePage from './pages/Home/Home.component';
import CreateUserPage from './pages/CreateUser/CreateUser.component';
import EditUserPage from './pages/EditUser/EditUser.component';

import './App.scss';

const App = () => (
  <div className="app">
    <Header />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/create-user" component={CreateUserPage} />
      <Route exact path="/edit-user/:userId" component={EditUserPage} />
      <Route path="*" render={() => <div>404</div>} />
    </Switch>
  </div>
);

export default App;