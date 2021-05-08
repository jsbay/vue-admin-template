<template>
  <div class="password-strong-container">
    <el-progress v-if="textInside && pwd.length >= minPwdLen" class="" :format="format" :stroke-width="16" :percentage="percentage" :text-inside="true" :color="customColor" stroke-linecap="square" />
    <el-progress v-else-if="!textInside && pwd.length >= minPwdLen" class="el-progress--text-outside" :format="format" :stroke-width="8" :percentage="percentage" :color="customColor" stroke-linecap="square" />
  </div>
</template>

<script>
export default {
  name: 'PasswordStrongProgress',
  props: {
    pwd: {
      type: [String, Number],
      default: ''
    },
    textInside: {
      type: Boolean,
      default() { return false }
    }
  },
  data() {
    return {
      minPwdLen: 4,
      customColor: [
        { color: '#F56C6C', percentage: 20 },
        { color: '#E6A23C', percentage: 40 },
        { color: '#409EFF', percentage: 60 },
        { color: '#67C23A', percentage: 80 },
        { color: '#67C23A', percentage: 100 }
      ]
    }
  },
  computed: {
    pwdStrong() {
      let strong = 0
      if (this.pwd.length < this.minPwdLen) return strong
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
.password-strong-container {
  margin: 10px 0;
  .el-progress--text-outside {
    font-size: 0;
    ::v-deep .el-progress-bar {
      padding-right: 0;
      width: calc(100% - 100px);
      margin-right: 0;
    }
    ::v-deep .el-progress__text {
      margin-left: 0;
      display: inline-block;
      width: 100px;
      text-align: right;
      font-size: 12px !important;
    }
  }
}
</style>
