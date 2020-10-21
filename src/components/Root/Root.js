import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Switch } from 'react-router'
import styles from './Root.module.scss'

import * as Routes from 'constants/Routes'

import Login from 'components/Login/Login'
import Chat from 'components/Chat/Chat'
import Route from 'components/Route/Route'

// TODO: handle index route
// TODO: handle not found for any other route
const Root = () => {
  return (
    <div className={styles.component}>
      <BrowserRouter>
        <Switch>
          <Route exact path={Routes.LOGIN} component={Login} />
          <Route exact path={Routes.CHAT} isProtected component={Chat} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default Root
