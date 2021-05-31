import request from '@/utils/request'

export function getList(params) {
  return request.get('/demos', { params })
}

export function create(data) {
  return request.post('/demo', data)
}

export function modify(data) {
  return request.patch('/demo', data)
}

export function destory(params) {
  return request.delete('/demo', { params })
}

