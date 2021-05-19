const Mock = require('mockjs')

const data = Mock.mock({
  'demos|200': [
    {
      // id: '@id',
      'id|+1': 100000001,
      username: /A\d{4}/,
      nickname: /^用户 [A-Z]/,
      email: /^[a-z0-9]{2,4}\.?[a-z0-9]{2,4}@autobio\.com\.cn/,
      phone: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
      permissions: '@shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9], 0, 9)'
    }
  ]
})

module.exports = [
  // 列表
  {
    url: '/vue-admin-template/demo',
    type: 'get',
    response: config => {
      const { demos } = data
      return {
        code: 20000,
        data: {
          total: demos.length,
          demos: demos.slice(0, 20)
        }
      }
    }
  }
]
