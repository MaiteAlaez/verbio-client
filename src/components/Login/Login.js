import React, { useState } from 'react'
import styles from './Login.module.scss'

import * as Routes from 'constants/Routes'
import auth from 'utils/auth'

const Login = (props) => {
  const { history } = props
  const [loginDetails, setLoginDetails] = useState({user: '', password: ''})

  const handleInputValueChange = (event) => {
    setLoginDetails({
      ...loginDetails,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (loginDetails.user === '' || loginDetails.password === '') return
    // TODO: validation

    try {
      await auth.login(loginDetails)
      history.push(`${Routes.CHAT}`)
    } catch (error) {
      // TODO: handle error
    }
  }

  // TODO: create reusable input and button components
  return (
    <div className={styles.component}>
      <div>
        <h1>Login</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>Username</label>
          <input className={styles.input} type="text" name="user" onChange={handleInputValueChange} />
          <label className={styles.label}>Password</label>
          <input className={styles.input} type="password" name="password" onChange={handleInputValueChange} />
          <button className={styles.button} type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
