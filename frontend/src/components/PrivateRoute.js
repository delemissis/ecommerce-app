import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, userInfo, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      userInfo ? <Component {...props} /> : <Redirect to="/signin" />
    }
  />
);

export default PrivateRoute;
