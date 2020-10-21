import * as config from '../config'

let defaultHeaders = {
  'accept': 'application/json'
}

export const setTokenHeader = (token) => {
  defaultHeaders['Authorization'] = `Bearer ${token}`
}

export const clearTokenHeader = () => {
  delete defaultHeaders['Authorization']
}

const request = (path, args = {}) => {
  const url = `${config.API_URL}${path}`

  const options = {
    headers: defaultHeaders,
    method: args.method || 'GET'
  }

  if (args.data) {
    options.body = JSON.stringify((args.data))
    options.headers['content-type'] = 'application/json'
  }

  return fetch(url, options)
    .then(res => {
      if (res.status === 204) {
        return res
      }
      if (res.status >= 200 && res.status < 300) {
        return res.json().then(body => [body, res])
      }

      const error = new Error(res.statusText)
      error.res = res
      throw error
    })
}

export default request
