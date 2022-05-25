import request from '@/utils/request'

// 上传轮播图
export const uploadCarousel = (fromdata) => {
  return request({
    url: '/api/uploadCarousel',
    method: 'post',
    data: fromdata,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 下载轮播图
export const downloadCarousel = () => {
  return request({
    url: '/api/downloadCarousel',
    method: 'get'
  })
}
