import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sms/order_management/login',
    method: 'post',
    data
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function logout() {
  return request({
    url: '/sms/order_management/loginOut',
    method: 'post'
  })
}
