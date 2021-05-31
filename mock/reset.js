module.exports = [
  // user login
  {
    url: '/reset',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  {
    url: '/reset/sendCode',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  }
]
