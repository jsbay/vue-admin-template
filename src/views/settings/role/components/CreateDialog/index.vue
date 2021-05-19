<!--
 * @FilePath src/views/settings/role/components/CreateDialog/index.vue
 * @Created Bay丶<baizhanying@autobio.com.cn> 2021-05-18 16:56:42
 * @Modified Bay丶<baizhanying@autobio.com.cn> 2021-05-19 14:46:22
 * @Description  系统设置 - 权限管理 - 新增
-->
<template>
  <form-dialog title="新增" :closed="resetForm" @confirm="confirm">
    <el-form ref="form" :rules="formRules" :model="form" label-width="80px">
      <el-form-item label="权限名" prop="role">
        <el-input v-model.trim="form.role" placeholder="请输入权限名(不可修改)" clearable />
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

import { create } from '@/api/role'

export default {
  name: 'RoleCreateDialog',
  components: { FormDialog },
  mixins: [FormDialogCommon],
  props: {
    permissions: {
      type: Array,
      default() {
        return []
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
  methods: {
    confirm() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          await create(this.form)
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

