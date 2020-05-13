import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import api from 'services/api';
import jwtDecode from 'jwt-decode';

const PrivateRoute = ({ children, ...rest }) => {
  const token = api.getToken();
  let expired = true;
  if (token) {
    const decodedToken = jwtDecode(token);
    const expTime = new Date(decodedToken.exp * 1000);
    expired = new Date() > expTime;
  };
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !expired ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  )
};

export default React.memo(PrivateRoute);