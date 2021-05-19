import request from '@/utils/request'

export function reset(data) {
  return request.post('/vue-admin-template/reset', data)
}

export function sendCode(data) {
  return request.post('/vue-admin-template/reset/sendCode', data)
}
