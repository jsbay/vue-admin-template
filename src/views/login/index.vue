<!--
 * @FilePath src/views/login/index.vue
 * @Created Bay丶<baizhanying@autobio.com.cn> 2021-05-07 15:01:04
 * @Modified Bay丶<baizhanying@autobio.com.cn> 2021-05-19 16:44:53
 * @Description 登录
-->

<template>
  <div class="login-container">
    <el-form ref="form" :model="form" :rules="formRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">登 录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input ref="username" v-model="form.username" placeholder="请输入工号..." name="工号" type="text" tabindex="1" auto-complete="on" />
      </el-form-item>

      <el-form-item prop="password" class="password-input">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>

        <password-input v-model="form.password" tabindex="2" @keyup.enter.native="handleLogin" />
      </el-form-item>

      <el-button :loading="loading" type="primary" size="default" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>

      <div style="position:relative">
        <div class="tips">
          <el-link :href="resetHref" :underline="false">忘记密码</el-link>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import PasswordInput from '@/components/PasswordInput'

import { validUsername, validPassword } from '@/utils/validate'

export default {
  name: 'Login',
  components: { PasswordInput },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的工号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      // 仅限制密码长度大于 6 位
      // if (value.length < 6) {
      //   callback(new Error('密码不能少于 6 个字符'))
      // } else {
      //   callback()
      // }

      if (!validPassword(value)) {
        callback(new Error('密码长度必须6-16之间，且密码必须至少包含一个数字，一个大写字母，一个小写字母和一个特殊字符。'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: process.env.NODE_ENV === 'development' ? 'A3245' : '',
        password: process.env.NODE_ENV === 'development' ? 'Bai930706..' : ''
      },
      formRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: ['change', 'blur'], validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  computed: {
    resetHref() {
      if (this.redirect) return `/reset?redirect=${this.redirect}`
      return '/reset'
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.form).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/login.scss";
</style>

<style lang="scss" scoped>
@import "@/styles/login-scoped.scss";
</style>
