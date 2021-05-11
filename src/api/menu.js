import request from '@/utils/request'

export function getList(params) {
  return request.get('/vue-admin-template/menus', { params })
}

export function create(data) {
  return request.post('/vue-admin-template/menu', data)
}

export function modify(data) {
  return request.patch('/vue-admin-template/menu', data)
}

export function destory(params) {
  return request.delete('/vue-admin-template/menu', { params })
}

