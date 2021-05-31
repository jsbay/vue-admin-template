import request from '@/utils/request'

export function reset(data) {
  return request.post('/reset', data)
}

export function sendCode(data) {
  return request.post('/reset/sendCode', data)
}
