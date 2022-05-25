import request from '@/utils/request'

export const login = (data) => {
  console.log('login')
  return request({
    url: '/api/login',
    method: 'post',
    data: data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
