module.exports = [
  // user login
  {
    url: '/vue-admin-template/reset',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  {
    url: '/vue-admin-template/reset/sendCode',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  }
]
