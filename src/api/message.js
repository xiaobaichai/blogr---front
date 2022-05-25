import request from '@/utils/request'

export function getMessage() {
  return request({
    url: '/api/getMessage',
    method: 'get'
  })
}
