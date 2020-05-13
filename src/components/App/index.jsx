import React from 'react';
import './index.scss';

import { Switch, Route } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';

import Login from 'components/LoginPage';

const App = () => (
  <Switch>
    <Route exact path='/login'>
      <Login />
    </Route>
    <PrivateRoute exact path='/'>
      home
    </PrivateRoute>
  </Switch>
);

export default React.memo(App);