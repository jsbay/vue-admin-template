const Mock = require('mockjs')

const roles = [
  {
    id: 1,
    name: '超级管理员'
  },
  {
    id: 2,
    name: '编辑'
  },
  {
    id: 3,
    name: '设备员'
  }
]

const data = Mock.mock({
  'users|200': [{
    'id|+1': 100000000,
    'username': /^A\d{4}/,
    'nickname': '@cname',
    'email': /^[a-z0-9]{2,4}\.?[a-z0-9]{2,4}@autobio\.com\.cn/,
    'status|1': [-1, 0, 1, 2],
    'role|1': roles,
    createtime: '@datetime'
  }]
})

module.exports = [
  // 列表
  {
    url: '/users',
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
    url: '/user',
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
    url: '/user',
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
    url: '/user',
    type: 'delete',
    response: config => {
      return {
        code: 20000,
        data: {}
      }
    }
  },
  // 列表
  {
    url: '/user/roles',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          roles
        }
      }
    }
  }
]
