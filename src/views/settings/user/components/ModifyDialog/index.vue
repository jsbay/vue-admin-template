<!--
 * @FilePath src/views/user/components/ModifyDialog/index.vue
 * @Created Bay丶<baizhanying@autobio.com.cn> 2021-05-18 10:46:13
 * @Modified Bay丶<baizhanying@autobio.com.cn> 2021-05-19 14:35:44
 * @Description 用户管理 - 修改
-->

<template>
  <form-dialog title="修改" :closed="handleClosed" @confirm="confirm">
    <el-form ref="form" :rules="formRules" :model="form" label-width="80px">
      <el-form-item label="账户" prop="username">
        <el-input v-model.trim="form.username" placeholder="请输入账户(用以登录)" disabled />
      </el-form-item>

      <el-form-item label="用户名" prop="nickname">
        <el-input v-model.trim="form.nickname" placeholder="请输入用户名" clearable />
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model.trim="form.email" placeholder="请输入邮箱" clearable />
      </el-form-item>

      <el-form-item label="权限" prop="role">
        <el-select v-model="form.role" style="width: 100%;">
          <el-option v-for="role in roles" :key="role.id" :label="role.name" :value="role.id" />
        </el-select>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <password-input ref="passwordInput" v-model.trim="form.password" placeholder="请输入密码(留空为不修改)" />
      </el-form-item>

      <el-form-item label="账户状态" prop="status">
        <el-switch v-model="form.locked" active-color="#E6A23C" inactive-color="#13ce66" active-text="禁用" inactive-text="正常" />
      </el-form-item>
    </el-form>
  </form-dialog>
</template>

<script>
import FormDialog from '@/components/FormDialog'
import FormDialogCommon from '@/mixin/FormDialogCommon'

import PasswordInput from '@/components/PasswordInput'

import { modify } from '@/api/user'

import { validUsername, validPassword } from '@/utils/validate'

export default {
  name: 'UserModifyDialog',
  components: { FormDialog, PasswordInput },
  mixins: [FormDialogCommon],
  props: {
    roles: {
      type: Array,
      default() {
        return []
      }
    },
    user: {
      type: Object,
      default() {
        return undefined
      }
    }
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的工号'))
      } else {
        callback()
      }
    }

    const validatePassword = (rule, value, callback) => {
      if (value && !validPassword(value)) {
        callback(new Error('密码长度必须6-16之间，且密码必须至少包含一个数字，一个大写字母，一个小写字母和一个特殊字符。'))
      } else {
        callback()
      }
    }
    return {
      form: {},
      formRules: {
        username: [{ required: true, trigger: ['change', 'blur'], validator: validateUsername }],
        nickname: [{ required: true, trigger: ['change', 'blur'], message: '用户名不能为空' }],
        email: [{ required: true, trigger: ['change', 'blur'], message: '邮箱不能为空' }],
        password: [{ required: false, trigger: ['change', 'blur'], validator: validatePassword }]
      }
    }
  },
  watch: {
    user: {
      handler(nv) {
        if (nv) {
          this.$set(this, 'form', { ...nv })
          this.$set(this.form, 'role', nv.role.id)
          return nv.status <= 0 && this.$set(this.form, 'locked', true)
        }
      },
      immediate: true
    }
  },
  methods: {
    confirm() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          await modify(this.form)
          this.$emit('success', this.form)
          this.close()
        }
      })
    },
    handleClosed() {
      this.$refs.passwordInput.clear()
      this.resetForm()
    },
    resetForm() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
