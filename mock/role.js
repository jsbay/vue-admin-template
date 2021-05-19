const Mock = require('mockjs')

const permissions = [{ name: '活动管理-审核', id: '1' }, { name: '活动管理-排号', id: '2' }, { name: '活动管理-充值', id: '3' }, { name: '活动管理-放单', id: '4' }]

const data = Mock.mock({
  'roles|200': [{
    'id|+1': 100000000,
    'role': '@cname',
    'status|1': [-1, 0, 1, 2],
    createtime: '@datetime',
    // 'permissions': '@shuffle([{ name: "活动管理-审核", id: "1" }, { name: "活动管理-排号", id: "2" }, { name: "活动管理-充值", id: "3" }, { name: "活动管理-放单", id: "4" }], 0, 4)'
    'permissions': `@shuffle(${JSON.stringify(permissions)}, 0, 4)`
  }]
})

module.exports = [
  // 列表
  {
    url: '/vue-admin-template/roles',
    type: 'get',
    response: config => {
      const { query } = config
      const total = data.roles.length

      const start = (query.page - 1) * query.limit
      const end = start + (query.limit - 0)

      const roles = data.roles.slice(start, end)
      return {
        code: 20000,
        data: {
          total,
          roles
        }
      }
    }
  },
  // 新增
  {
    url: '/vue-admin-template/role',
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
    url: '/vue-admin-template/role',
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
    url: '/vue-admin-template/role',
    type: 'delete',
    response: config => {
      return {
        code: 20000,
        data: {}
      }
    }
  },
  // 所有权限
  {
    url: '/vue-admin-template/role/permissions',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          permissions
        }
      }
    }
  }
]
