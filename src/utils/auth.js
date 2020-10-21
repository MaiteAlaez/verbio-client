import * as api from 'utils/api'
import { clearTokenHeader, setTokenHeader } from 'utils/request'
import { AUTH_TOKEN_NAMESPACE } from 'config'

class Auth {
  getToken = () => {
    return localStorage.getItem(AUTH_TOKEN_NAMESPACE)
  }

  setToken = (id) => {
    localStorage.setItem(AUTH_TOKEN_NAMESPACE, id)
  }

  init = () => {
    if (!this.isAuthenticated()) {
      return
    }

    const sessionId = this.getToken()
    if (sessionId) {
      setTokenHeader(sessionId)
    }
  }

  isAuthenticated = () => {
    return !!this.getToken()
  }

  login = async (data) => {
    const { session_id } = await api.login(data)
    setTokenHeader(session_id)
    this.setToken(session_id)
  }

  logout = () => {
    clearTokenHeader()
    localStorage.removeItem(AUTH_TOKEN_NAMESPACE)
  }
}

export default new Auth()
