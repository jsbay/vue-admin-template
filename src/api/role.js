import request from '@/utils/request'

export function getList(params) {
  return request.get('/roles', { params })
}

export function create(data) {
  return request.post('/role', data)
}

export function modify(data) {
  return request.patch('/role', data)
}

export function destory(params) {
  return request.delete('/role', { params })
}

export function getMenus(params) {
  return request.get('/role/menus', { params })
}
