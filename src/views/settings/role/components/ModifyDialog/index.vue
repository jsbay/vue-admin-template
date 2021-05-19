<!--
 * @FilePath src/views/settings/role/components/ModifyDialog/index.vue
 * @Created Bay丶<baizhanying@autobio.com.cn> 2021-05-18 16:56:45
 * @Modified Bay丶<baizhanying@autobio.com.cn> 2021-05-19 14:45:54
 * @Description 系统设置 - 权限管理 - 修改
-->

<template>
  <form-dialog title="修改" :closed="resetForm" @confirm="confirm">
    <el-form ref="form" :rules="formRules" :model="form" label-width="80px">
      <el-form-item label="权限名" prop="role">
        <el-input v-model.trim="form.role" placeholder="请输入权限名(不可修改)" disabled />
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-switch v-model="form.locked" active-color="#E6A23C" inactive-color="#13ce66" active-text="禁用" inactive-text="正常" />
      </el-form-item>

      <el-form-item label="权限" prop="permission">
        <el-select v-model="selectedPermissions" multiple placeholder="选择权限" style="width: 100%" @change="handleChange">
          <el-option
            v-for="permission in permissions"
            :key="permission.id"
            :label="permission.name"
            :value="permission.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </form-dialog>
</template>

<script>
import FormDialog from '@/components/FormDialog'
import FormDialogCommon from '@/mixin/FormDialogCommon'

import { modify } from '@/api/role'
export default {
  name: 'RoleModifyDialog',
  components: { FormDialog },
  mixins: [FormDialogCommon],
  props: {
    permissions: {
      type: Array,
      default() {
        return []
      }
    },
    role: {
      type: Object,
      default() {
        return undefined
      }
    }
  },
  data() {
    return {
      form: {},
      formRules: {
        role: [{ required: true, trigger: ['change', 'blur'], message: '权限名不能为空' }]
      },
      selectedPermissions: []
    }
  },
  watch: {
    role: {
      handler(nv) {
        if (nv) {
          this.$set(this, 'form', { ...nv })
          this.$set(this, 'selectedPermissions', nv.permissions?.map(permission => permission.id))
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
    handleChange() {
      this.$set(this.form, 'permissions', this.selectedPermissions)
    },
    resetForm() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

 <style lang="scss" scoped>
</style>
