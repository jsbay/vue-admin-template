import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const SecretKey = 'secret'

export function getSecret() {
  return Cookies.get(SecretKey)
}

export function setSecret(secret) {
  return Cookies.set(SecretKey, secret)
}

export function removeSecret() {
  return Cookies.remove(SecretKey)
}

const SignatureKey = 'signature'

export function getSignature() {
  return Cookies.get(SignatureKey)
}

export function setSignature(signature) {
  return Cookies.set(SignatureKey, signature)
}

export function removeSignature() {
  return Cookies.remove(SignatureKey)
}
