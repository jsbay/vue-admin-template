<!--
 * @FilePath src/views/menu/components/ModifyDialog/index.vue
 * @Created Bay丶<baizhanying@autobio.com.cn> 2021-05-11 16:35:17
 * @Modified Bay丶<baizhanying@autobio.com.cn> 2021-05-26 11:23:17
 * @Description 菜单 - 修改
-->

<template>
  <form-dialog title="修改" :closed="resetForm" @confirm="confirm">
    <el-form ref="form" :rules="formRules" :model="form" label-width="80px">
      <el-form-item label="菜单名" prop="menu">
        <el-input v-model.trim="parentNode.menu" placeholder="请输入菜单名" clearable />
      </el-form-item>

      <el-form-item label="权限 ID" prop="permission">
        <el-input v-model.trim="form.permission" placeholder="请输入权限 ID" clearable />
      </el-form-item>
    </el-form>
  </form-dialog>
</template>

<script>
import FormDialog from '@/components/FormDialog'
import FormDialogCommon from '@/mixin/FormDialogCommon'
import { modify } from '@/api/menu'

export default {
  name: 'MenuModifyDialog',
  components: { FormDialog },
  mixins: [FormDialogCommon],
  props: {
    parentNode: {
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
        menu: [
          { required: true, trigger: ['change', 'blur'], message: '菜单名不能为空' }
        ],
        permission: [
          { required: true, trigger: ['change', 'blur'], message: '权限 ID 不能为空' }
        ]
      }
    }
  },
  watch: {
    parentNode: {
      handler(nv) {
        if (nv) {
          return this.$set(this, 'form', nv)
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
    resetForm() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
