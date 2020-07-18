import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import Jobs from './Jobs';
import Companies from './Companies';
import Company from './Company';

const Routes = ({ setToken }) => {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/login">
          <Login setToken={ setToken } />
        </Route>

        <AuthRoute exact path="/profile">
          <Profile />
        </AuthRoute>

        <AuthRoute exact path="/jobs">
          <Jobs />
        </AuthRoute>

        <AuthRoute exact path="/companies">
          <Companies />
        </AuthRoute>

        <AuthRoute exact path="/companies/:handle">
          <Company />
        </AuthRoute>

      </Switch>
    </div>
  )
}

export default Routes;