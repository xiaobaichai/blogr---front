import request from '@/utils/request'

export function getArticleCount() {
  return request({
    url: '/api/getArticleCount',
    method: 'get'
  })
}

export function getMessageCount() {
  return request({
    url: '/api/getMessageCount',
    method: 'get'
  })
}
