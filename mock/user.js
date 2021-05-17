const Mock = require('mockjs')

const data = Mock.mock({
  'users|200': [{
    'id|+1': 100000000,
    'username': /^A\d{4}/,
    'nickname': '@cname',
    'email': '@email',
    'status|1': [-1, 0, 1, 2],
    createtime: '@datetime'
  }]
})

module.exports = [
  // 列表
  {
    url: '/vue-admin-template/users',
    type: 'get',
    response: config => {
      const { query } = config
      const total = data.users.length

      const start = (query.page - 1) * query.limit
      const end = start + (query.limit - 0)

      const users = data.users.slice(start, end)
      return {
        code: 20000,
        data: {
          total,
          users
        }
      }
    }
  },
  // 新增
  {
    url: '/vue-admin-template/user',
    type: 'post',
    response: config => {
      return {
        code: 20000,
        data: {}
      }
    }
  },
  // 修改
  {
    url: '/vue-admin-template/user',
    type: 'patch',
    response: config => {
      return {
        code: 20000,
        data: {}
      }
    }
  },
  // 删除
  {
    url: '/vue-admin-template/user',
    type: 'delete',
    response: config => {
      return {
        code: 20000,
        data: {}
      }
    }
  }
]
