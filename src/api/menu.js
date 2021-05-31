import request from '@/utils/request'

export function getList(params) {
  return request.get('/menus', { params })
}

export function create(data) {
  return request.post('/menu', data)
}

export function modify(data) {
  return request.patch('/menu', data)
}

export function destory(params) {
  return request.delete('/menu', { params })
}

