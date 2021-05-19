<!--
 * @FilePath src/views/reset/index.vue
 * @Created Bay丶<baizhanying@autobio.com.cn> 2021-05-19 15:35:05
 * @Modified Bay丶<baizhanying@autobio.com.cn> 2021-05-19 16:43:59
 * @Description 密码重置
-->
<template>
  <div class="login-container">
    <el-form ref="form" :model="form" :rules="formRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">重置密码</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input ref="username" v-model="form.username" placeholder="请输入工号..." name="工号" type="text" tabindex="1" auto-complete="on" />
      </el-form-item>

      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="email" />
        </span>
        <el-input ref="email" v-model="form.email" placeholder="请输入邮箱..." name="邮箱" type="text" tabindex="2" auto-complete="on" />
      </el-form-item>

      <el-form-item prop="code" class="form-item__code">
        <span class="svg-container">
          <svg-icon icon-class="validateCode" />
        </span>
        <el-input ref="code" v-model="form.code" placeholder="请输入验证码..." name="验证码" type="text" tabindex="2" auto-complete="on" />
        <el-button class="send-button" type="primary" :disabled="sending" @click="handleSendCode">{{ sendBtnText }}</el-button>
      </el-form-item>

      <el-form-item prop="newPwd" class="password-input">
        <span class="svg-container">
          <svg-icon icon-class="validateCode" />
        </span>
        <password-input ref="passwordInput1" v-model="form.newPwd" placeholder="请输入新密码..." />
      </el-form-item>

      <password-strong-progress :pwd="form.newPwd" />

      <el-form-item prop="rePwd" class="password-input">
        <span class="svg-container">
          <svg-icon icon-class="validateCode" />
        </span>
        <password-input ref="passwordInput2" v-model="form.rePwd" placeholder="请再次输入新密码..." />
      </el-form-item>

      <el-button :loading="loading" type="primary" size="default" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleReset">重置</el-button>

      <div style="position:relative">
        <div class="tips">
          <el-link :href="loginHref" :underline="false">返回登录</el-link>
        </div>
      </div>

    </el-form>
  </div>
</template>

<script>
import PasswordInput from '@/components/PasswordInput'
import PasswordStrongProgress from '@/components/PasswordStrongProgress'

import { validUsername, validPassword } from '@/utils/validate'

import { reset, sendCode } from '@/api/reset'

export default {
  name: 'Reset',
  components: { PasswordInput, PasswordStrongProgress },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的工号'))
      } else {
        callback()
      }
    }

    const validatePassword = (rule, value, callback) => {
      if (!validPassword(value)) {
        callback(new Error('密码长度必须6-16之间，且密码必须至少包含一个数字，一个大写字母，一个小写字母和一个特殊字符。'))
      } else {
        callback()
      }
    }

    var validateRePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      sending: false,
      sendBtnText: '发送验证码',
      sendInterval: 120,
      form: {},
      formRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        newPwd: [{ required: true, trigger: ['change', 'blur'], validator: validatePassword }],
        rePwd: [{ required: true, trigger: ['change', 'blur'], validator: validateRePassword }]
      },
      loading: false,
      redirect: undefined
    }
  },
  computed: {
    loginHref() {
      if (this.redirect) return `/login?redirect=${this.redirect}`
      return '/login'
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
    handleReset() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          this.loading = true
          try {
            await reset(this.form)
          } finally {
            this.loading = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async handleSendCode() {
      if (this.sending) return

      await sendCode()

      let sendInterval = this.sendInterval
      this.sendBtnText = `${this.sendInterval} S 后再次发送`
      this.sending = true

      const timer = setInterval(() => {
        sendInterval--
        this.sendBtnText = `${sendInterval} S 后再次发送`
        if (sendInterval === 0) {
          clearInterval(timer)
          this.sendBtnText = '再次发送'
          this.sending = false
        }
      }, 1000)
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
