<!--
 * @FilePath src/views/settings/user/components/CreateModifyDialog/index.vue
 * @Created Bay丶<baizhanying@autobio.com.cn> 2021-09-23 16:08:10
 * @Modified Bay丶<baizhanying@autobio.com.cn> 2021-09-26 17:26:13
 * @Description 系统设置 - 用户管理 - 新增 & 修改
-->

<template>
  <form-dialog :visible.sync="show" :title="isModifyMode ? '修改' : '新增'" @closed="closed" @confirm="confirm" @open="onopen" @cancel="close">
    <el-form ref="form" :rules="formRules" :model="form" label-width="80px" :validate-on-rule-change="false">
      <el-form-item label="账户" prop="username">
        <el-input v-model.trim="form.username" placeholder="请输入账户(用以登录, 不可修改)" :disabled="isModifyMode" />
      </el-form-item>

      <el-form-item label="用户名" prop="nickname">
        <el-input v-model.trim="form.nickname" placeholder="请输入用户名" clearable />
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model.trim="form.email" placeholder="请输入邮箱" clearable>
          <!-- <template slot="append">@autobio.com.cn</template> -->
        </el-input>
      </el-form-item>

      <el-form-item label="权限" prop="role">
        <el-select v-model="form.roleIds" style="width: 100%;" multiple>
          <el-option v-for="role in roles" :key="role.id" :label="role.name" :value="role.id" />
        </el-select>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <password-input ref="passwordInput" v-model.trim="form.password" placeholder="请输入密码(留空为不修改)" />
      </el-form-item>

      <el-form-item label="账户状态" prop="state">
        <el-switch v-model="form.locked" active-color="#E6A23C" inactive-color="#13ce66" active-text="禁用" inactive-text="正常" />
      </el-form-item>
    </el-form>
  </form-dialog>
</template>

<script>
import PasswordInput from '@/components/PasswordInput'
import dialog from '@/mixin/dialog'

import { validUsername, validEmail, validPassword } from '@/utils/validate'

import { create, modify } from '@/api/user'

export default {
  name: 'UserCreateModifyDialog',
  components: { PasswordInput },
  mixins: [dialog],
  props: {
    mode: {
      type: String,
      default: 'create',
      validator(value) {
        // 这个值必须匹配下列字符串中的一个
        return ['create', 'modify'].indexOf(value) !== -1
      }
    },
    roles: {
      type: Array,
      default() {
        return []
      }
    },
    user: {
      type: Object,
      default() {
        return {}
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

    const validateEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error('请输入正确的企业邮箱'))
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
      formRules: {},
      createFormRules: {
        username: [{ required: true, trigger: ['change', 'blur'], validator: validateUsername }],
        nickname: [{ required: true, trigger: ['change', 'blur'], message: '用户名不能为空' }],
        email: [{ required: true, trigger: ['change', 'blur'], validator: validateEmail }],
        password: [{ required: true, trigger: ['change', 'blur'], message: '密码不能为空' }, { trigger: ['change', 'blur'], validator: validatePassword }]
      },
      modifyFormRules: {
        username: [{ required: true, trigger: ['change', 'blur'], validator: validateUsername }],
        nickname: [{ required: true, trigger: ['change', 'blur'], message: '用户名不能为空' }],
        email: [{ required: true, trigger: ['change', 'blur'], validator: validateEmail }],
        password: [{ required: false, trigger: ['change', 'blur'], validator: validatePassword }]
      }
    }
  },
  computed: {
    isModifyMode() {
      return this.mode === 'modify'
    }
  },
  watch: {
    'form.locked': {
      handler(nv) {
        this.$set(this.form, 'state', nv ? 0 : 1)
      }
    }
  },
  methods: {
    onopen() {
      // modify mode
      if (this.isModifyMode) {
        this.$set(this, 'formRules', this.modifyFormRules)
        return this.initForm()
      }
      // create mode
      this.$set(this, 'formRules', this.createFormRules)
      this.$nextTick(this.resetForm)
    },
    confirm() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          if (this.isModifyMode) {
            await modify(this.form)
          } else {
            await create(this.form)
          }
          this.$emit('success', this.form)
          this.close()
        }
      })
    },
    initForm() {
      this.$set(this.form, 'id', this.user?.id)
      this.$set(this.form, 'username', this.user?.username)
      this.$set(this.form, 'nickname', this.user?.nickname)
      this.$set(this.form, 'email', this.user?.email)
      this.$set(this.form, 'state', this.user?.state)
      this.$set(this.form, 'roleIds', this.user?.roles?.map(r => r.id))
      this.$set(this.form, 'locked', this.user?.state <= 0)
    },
    clearForm() {
      this.form = {}
    },
    closed() {
      this.$refs.passwordInput.clear()
      this.resetForm()
    },
    resetForm() {
      this.clearForm()
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
