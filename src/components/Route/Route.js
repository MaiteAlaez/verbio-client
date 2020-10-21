import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import * as Routes from 'constants/Routes'
import auth from 'utils/auth';

const RouteComponent = ({
  component: Component,
  isProtected = false,
  ...rest
}) => {
  if (isProtected && !auth.isAuthenticated()) {
    return (
      <Redirect to={Routes.LOGIN} />
    )
  }

  return (
    <Route
      {...rest}
      render={(props) => (
        <Component {...props} />
      )}
    />
  )
}

export default RouteComponent
