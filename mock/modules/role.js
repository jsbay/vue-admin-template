const Mock = require('mockjs')

const menus = [{ name: '菜单 1', id: '1' }, { name: '菜单 2', id: '2' }, { name: '菜单 3', id: '3' }, { name: '菜单 4', id: '4' }]

const data = Mock.mock({
  'roles|200': [{
    'id|+1': 100000000,
    'role': '@cname',
    'state|1': [-1, 0, 1],
    createtime: '@datetime',
    'menus': `@shuffle(${JSON.stringify(menus)}, 0, 4)`
  }]
})

module.exports = [
  // 列表
  {
    url: '/roles',
    type: 'get',
    response: config => {
      const { query } = config
      const total = data.roles.length

      const start = (query.page - 1) * query.limit
      const end = start + (query.limit - 0)

      const roles = data.roles.slice(start, end)
      return {
        code: 0,
        data: {
          total,
          roles
        }
      }
    }
  },
  // 新增
  {
    url: '/role',
    type: 'post',
    response: config => {
      return {
        code: 0,
        data: {}
      }
    }
  },
  // 修改
  {
    url: '/role',
    type: 'patch',
    response: config => {
      return {
        code: 0,
        data: {}
      }
    }
  },
  // 删除
  {
    url: '/role',
    type: 'delete',
    response: config => {
      return {
        code: 0,
        data: {}
      }
    }
  },
  // 所有权限
  {
    url: '/role/menus',
    type: 'get',
    response: config => {
      return {
        code: 0,
        data: {
          menus
        }
      }
    }
  }
]
