import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const UserName = 'UserName'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setUserName(userName) {
  return Cookies.set(UserName, userName)
}

export function removeUserName() {
  return Cookies.remove(UserName)
}
