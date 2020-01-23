import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component, path, exact }) => (window.isAuth
  ? (
    <Route
      path={path}
      component={component}
      {...exact}
    />
  )
  : <Redirect to="/signin" />);
export default PrivateRoute;
