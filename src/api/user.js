import request from '@/utils/request'

export function getList(params) {
  return request.get('/users', { params })
}

export function create(data) {
  return request.post('/user', data)
}

export function modify(data) {
  return request.patch('/user', data)
}

export function destory(params) {
  return request.delete('/user', { params })
}

export function getRoles(params) {
  return request.get('/user/roles', { params })
}
