import React, { useContext }from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from './UserContext';

const AuthRoutes = ({ exact, path, children }) => {
  const { user } = useContext(UserContext);

  if(!user){ 
    return <Redirect to="/login" /> 
  }
  
  return (
    <Route exact={exact} path={path}>
      { children }
    </Route>
  )
}

export default AuthRoutes;