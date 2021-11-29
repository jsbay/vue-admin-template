
const tokens = {
  'A3245': {
    token: 'admin-token'
  },
  'A3246': {
    token: 'editor-token'
  }
}

module.exports = [
  // user login
  {
    url: '/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 0,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/userinfo\.*',
    type: 'get',
    response: _ => {
      return {
        code: 0,
        data: {
          roles: ['admin', 'editor'],
          introduction: 'I am a super administrator',
          avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
          nickname: '系统管理员',
          username: 'A3245',
          menuIds: ['1', '2', '3', '4']
        }
      }
    }
  },

  // user logout
  {
    url: '/logout',
    type: 'post',
    response: _ => {
      return {
        code: 0,
        data: 'success'
      }
    }
  },

  // user change password
  {
    url: '/cpassword',
    type: 'post',
    response: _ => {
      return {
        code: 0,
        data: 'success'
      }
    }
  }
]
