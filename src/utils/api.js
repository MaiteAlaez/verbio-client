import request from './request'

export const login = (data) => {
  return request('login', {
    method: 'POST',
    data
  })
    .then(([body]) => body)
}

export const getWelcomeMessage = () => {
  return request('getWelcomeMessage')
    .then(([body]) => body)
}

export const sendMessage = (data) => {
  return request('sendMessage', {
    method: 'POST',
    data
  })
    .then(([body]) => body)
}
