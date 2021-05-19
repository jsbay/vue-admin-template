<!--
 * @FilePath src/layout/components/PasswordChangeDialog/index.vue
 * @Created Bay丶<baizhanying@autobio.com.cn> 2021-05-08 10:54:12
 * @Modified Bay丶<baizhanying@autobio.com.cn> 2021-05-19 16:30:15
 * @Description 全局修改密码 dialog
-->

<template>
  <form-dialog title="修改密码" @closed="closed" @confirm="confirm">
    <el-form ref="form" :rules="formRules" :model="form" label-width="80px">
      <el-form-item label="原密码" prop="oldPwd">
        <password-input ref="passwordInput1" v-model="form.oldPwd" placeholder="请输入原密码..." />
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <password-input ref="passwordInput2" v-model="form.newPwd" placeholder="请输入新密码..." />

        <password-strong-progress :pwd="form.newPwd" />
      </el-form-item>

      <el-form-item label="重复密码" prop="rePwd">
        <password-input ref="passwordInput3" v-model="form.rePwd" placeholder="请再次输入新密码..." />
      </el-form-item>
    </el-form>
  </form-dialog>

</template>

<script>
import FormDialog from '@/components/FormDialog'
import PasswordInput from '@/components/PasswordInput'
import PasswordStrongProgress from '@/components/PasswordStrongProgress'
import FormDialogCommon from '@/mixin/FormDialogCommon'

import { validPassword } from '@/utils/validate'

export default {
  name: 'PasswordChangeDialog',
  components: { FormDialog, PasswordInput, PasswordStrongProgress },
  mixins: [FormDialogCommon],
  data() {
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
      passwordType: 'password',
      form: {},
      formRules: {
        oldPwd: [{ required: true, trigger: ['change', 'blur'], validator: validatePassword }],
        newPwd: [{ required: true, trigger: ['change', 'blur'], validator: validatePassword }],
        rePwd: [{ required: true, trigger: ['change', 'blur'], validator: validateRePassword }]
      }
    }
  },
  methods: {
    closed() {
      this.$refs.passwordInput1.clear()
      this.$refs.passwordInput2.clear()
      this.$refs.passwordInput3.clear()
      this.$refs.form.resetFields()
      this.form = {}
    },
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
    confirm() {
      // todo 发送请求, 与后端完成交互
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 40px;
}
.show-pwd {
  position: absolute;
  right: 10px;
  font-size: 16px;
  cursor: pointer;
  user-select: none;
}
</style>
