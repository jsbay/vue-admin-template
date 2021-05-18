<!--
 * @FilePath src/views/menu/components/CreateDialog/index.vue
 * @Created Bay丶<baizhanying@autobio.com.cn> 2021-05-10 15:46:10
 * @Modified Bay丶<baizhanying@autobio.com.cn> 2021-05-11 18:04:05
 * @Description 菜单 新增
-->

<template>
  <form-dialog title="新增" :closed="resetForm" @confirm="confirm">
    <el-form ref="form" :rules="formRules" :model="form" label-width="80px">
      <el-form-item v-if="parentNode" label="上级菜单" prop="lastLevel">
        <el-input v-model="parentNode.menu" placeholder="请输入菜单名" disabled />
      </el-form-item>

      <el-form-item label="菜单名" prop="menu">
        <el-input v-model.trim="form.menu" placeholder="请输入菜单名" clearable />
      </el-form-item>
    </el-form>
  </form-dialog>
</template>

<script>
import FormDialog from '@/components/FormDialog'
import FormDialogCommon from '@/mixin/FormDialogCommon'

import { create } from '@/api/menu'

export default {
  name: 'MenuCreateDialog',
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
        ]
      }
    }
  },
  watch: {
    parentNode: {
      handler(nv) {
        if (nv) {
          return this.$set(this.form, 'parentId', nv.id)
        }
        this.$set(this.form, 'parentId', undefined)
      },
      immediate: true
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
    resetForm() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
