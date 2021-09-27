const Mock = require('mockjs')

const data = Mock.mock({
  'menus|10': [{
    'id|+1': 100000000,
    'menuName|1': ['一级菜单 1', '一级菜单 2', '一级菜单 3', '一级菜单 4', '一级菜单 5', '一级菜单 6', '一级菜单 7', '一级菜单 8', '一级菜单 9', '一级菜单 10', '一级菜单11', '一级菜单 12'],
    'status|1': [-1, 0, 1],
    'menuId|+1': 10000,
    'children|0-10': [{
      'id|+1': 200000000,
      'menuName|1': ['二级菜单 1', '二级菜单 2', '二级菜单 3', '二级菜单 4', '二级菜单 5', '二级菜单 6', '二级菜单 7', '二级菜单 8', '二级菜单 9', '二级菜单 10', '二级菜单11', '二级菜单 12'],
      'status|1': [-1, 0, 1],
      'menuId|+1': 20000,
      'children|0-10': [{
        'id|+1': 300000000,
        'menuName|1': ['三级菜单 1', '三级菜单 2', '三级菜单 3', '三级菜单 4', '三级菜单 5', '三级菜单 6', '三级菜单 7', '三级菜单 8', '三级菜单 9', '三级菜单 10', '三级菜单11', '三级菜单 12'],
        'status|1': [-1, 0, 1],
        'menuId|+1': 30000
      }]
    }]
  }]
})

module.exports = [
  // 列表
  {
    url: '/menus',
    type: 'get',
    response: config => {
      const { menus } = data
      return {
        code: 0,
        data: {
          total: menus.length,
          menus: menus
        }
      }
    }
  },
  // 新增
  {
    url: '/menu',
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
    url: '/menu',
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
    url: '/menu',
    type: 'delete',
    response: config => {
      return {
        code: 0,
        data: {}
      }
    }
  }
]
