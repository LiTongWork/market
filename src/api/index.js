import request from '@/utils/request'

export default {
  login(data) {
    return request({
      url: '/vue-admin-template/user/login',
      method: 'post',
      data
    })
  }
}
