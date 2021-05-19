import request from '@/utils/request'

export function getList(params) {
  return request.get('/vue-admin-template/users', { params })
}

export function create(data) {
  return request.post('/vue-admin-template/user', data)
}

export function modify(data) {
  return request.patch('/vue-admin-template/user', data)
}

export function destory(params) {
  return request.delete('/vue-admin-template/user', { params })
}

export function getRoles(params) {
  return request.get('/vue-admin-template/user/roles', { params })
}
