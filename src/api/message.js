import request from '@/utils/request'

export function getMessage(page, mount) {
  return request({
    url: '/api/getMessage',
    method: 'get',
    params: {
      page: page,
      mount: mount
    }
  })
}

export function getMessageCount() {
  return request({
    url: '/api/getMessageCount',
    method: 'get'
  })
}

export function deleteMessage(id) {
  return request({
    url: '/api/deleteMessage',
    method: 'get',
    params: {
      id: id
    }
  })
}

export function reply(id, content) {
  return request({
    url: '/api/reply',
    method: 'post',
    params: {
      id: id,
      content: content
    }
  })
}
