<template>
  <el-progress v-if="pwd" :format="format" :stroke-width="20" :percentage="percentage" :text-inside="true" :color="customColor" />
</template>

<script>
export default {
  name: 'PasswordStrongProgress',
  props: {
    pwd: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      customColor: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ]
    }
  },
  computed: {
    pwdStrong() {
      let strong = 0
      if (this.pwd.length < 4) return strong
      if (/\d/.test(this.pwd)) strong++ // 数字
      if (/[a-z]/.test(this.pwd)) strong++ // 小写
      if (/[A-Z]/.test(this.pwd)) strong++ // 大写
      if (/\W/.test(this.pwd)) strong++ // 特殊字符
      return strong
    },
    pwdStrongStr() {
      // 逻辑处理
      switch (this.pwdStrong) {
        case 1:
          return '弱鸡 👎'
        case 2:
          return '一般般啦 😒'
        case 3:
          return '还可以 😊'
        case 4:
          return '很不挫 👍'
      }
      return this.pwdStrong
    },
    percentage() {
      return ((this.pwdStrong / 4) * 100)
    }
  },
  methods: {
    format(percentage) {
      return this.pwdStrongStr
    }
  }
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.password-container {
  display: inline-block;
  width: 85%;

  .el-input {
    width: 100%;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $light_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
