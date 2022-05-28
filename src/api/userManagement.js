import request from '@/utils/request'

export const getUserCount = () => {
  return request({
    url: '/api/getUserCount',
    method: 'get'
  })
}

export const getUserData = (page, mount) => {
  return request({
    url: '/api/getUserData',
    method: 'get',
    params: {
      page: page,
      mount: mount
    }
  })
}

export const deleteUser = (id) => {
  return request({
    url: '/api/deleteUser',
    method: 'get',
    params: {
      id: id
    }
  })
}
