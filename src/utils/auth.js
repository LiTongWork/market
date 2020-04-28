import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const UserName = 'UserName'
const Role = 'Role'
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserName() {
  return Cookies.get(UserName)
}

export function setUserName(userName) {
  return Cookies.set(UserName, userName)
}

export function removeUserName() {
  return Cookies.remove(UserName)
}

export function getRole() {
  return Cookies.get(Role)
}

export function setRole(role) {
  return Cookies.set(Role, role)
}

export function removeRole() {
  return Cookies.remove(Role)
}
