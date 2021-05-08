/**
 * Created by PanJiaChen on 16/11/18.
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
