import request from '@/utils/request'

export function getArticle(page, mount) {
  return request({
    url: '/api/getArticle',
    method: 'get',
    params: {
      page: page,
      mount: mount
    }
  })
}

export function getArticleCount() {
  return request({
    url: '/api/getArticleCount',
    method: 'get'
  })
}

export function searchArticle(keyword) {
  return request({
    url: '/api/searchArticle',
    method: 'get',
    params: {
      keyword: keyword
    }
  })
}

export function deleteArticle(id) {
  return request({
    url: '/api/deleteArticle',
    method: 'get',
    params: {
      id: id
    }
  })
}

export function editArticle(goodsForm) {
  return request({
    url: '/api/editArticle',
    method: 'post',
    params: {
      title: goodsForm.title,
      id: goodsForm.id,
      content: goodsForm.content,
      type: goodsForm.tag
    }
  })
}

export function upLoadArticle(goodsForm) {
  return request({
    url: '/api/upLoadArticle',
    method: 'post',
    params: {
      title: goodsForm.title,
      id: goodsForm.id,
      content: goodsForm.content,
      type: goodsForm.tag
    }
  })
}
