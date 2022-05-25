import request from '@/utils/request'

export const getUserData = () => {
  return request({
    url: '/api/getUserData',
    method: 'get'
  })
}
