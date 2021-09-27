/*
 * @FilePath src/utils/validate.js
 * @Created Bay丶<baizhanying@autobio.com.cn> 2021-09-22 17:56:42
 * @Modified Bay丶<baizhanying@autobio.com.cn> 2021-09-23 16:37:37
 * @Description
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const reg = /^A\d{4}$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validEmail(str) {
  const reg = /[^\s]+@autobio.com.cn$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 * @description 最短6位，最长16位 {6,16}
 * @description 必须包含1个数字
 * @description 必须包含1个小写字母
 * @description 必须包含1个大写字母
 * @description 必须包含1个特殊字符 !@#$%^&*?().
 */
export function validPassword(str) {
  const reg = /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Z]{1,})(?=.*[a-z]{1,})(?=.*[!@#$%^&*?\(\)\.]).*$/
  return reg.test(str)
}
