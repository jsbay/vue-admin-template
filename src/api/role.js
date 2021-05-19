import request from '@/utils/request'

export function getList(params) {
  return request.get('/vue-admin-template/roles', { params })
}

export function create(data) {
  return request.post('/vue-admin-template/role', data)
}

export function modify(data) {
  return request.patch('/vue-admin-template/role', data)
}

export function destory(params) {
  return request.delete('/vue-admin-template/role', { params })
}

export function getPermissions(params) {
  return request.get('/vue-admin-template/role/permissions', { params })
}
