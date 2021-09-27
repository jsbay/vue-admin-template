<!--
 * @FilePath src/views/settings/menu/components/CreateModifyDialog/index.vue
 * @Created Bay丶<baizhanying@autobio.com.cn> 2021-09-23 15:05:48
 * @Modified Bay丶<baizhanying@autobio.com.cn> 2021-09-26 15:28:06
 * @Description 系统设置 - 菜单管理 - 新增 && 修改
-->

<template>
  <form-dialog :visible.sync="show" :title="isModifyMode ? '修改' : '新增'" @closed="resetForm" @confirm="confirm" @open="onopen" @cancel="close">
    <el-form ref="form" :rules="formRules" :model="form" label-width="80px">
      <el-form-item v-if="!isModifyMode && parentNode" label="上级菜单">
        <el-input v-model="parentNode.menuName" placeholder="请输入菜单名" disabled />
      </el-form-item>

      <el-form-item label="菜单名" prop="menuName">
        <el-input v-model.trim="form.menuName" placeholder="请输入菜单名" clearable />
      </el-form-item>

      <el-form-item label="权限 ID" prop="menuId">
        <el-input v-model.trim="form.menuId" placeholder="请输入权限 ID" clearable />
      </el-form-item>
    </el-form>
  </form-dialog>
</template>

<script>
import dialog from '@/mixin/dialog'
import { create, modify } from '@/api/menu'

export default {
  name: 'MenuCreateModifyDialog',
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
    parentNode: {
      type: [Object, undefined],
      default() {
        return undefined
      }
    }
  },
  data() {
    return {
      form: {},
      formRules: {
        menuName: [
          { required: true, trigger: ['change', 'blur'], message: '菜单名不能为空' }
        ],
        menuId: [
          { required: true, trigger: ['change', 'blur'], message: '权限 ID 不能为空' }
        ]
      }
    }
  },
  computed: {
    isModifyMode() {
      return this.mode === 'modify'
    }
  },
  methods: {
    onopen() {
      this.initForm()
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
          this.resetForm()
          this.close()
        }
      })
    },
    initForm() {
      if (this.isModifyMode) {
        this.$set(this.form, 'id', this.parentNode?.id)
        this.$set(this.form, 'menuId', this.parentNode?.menuId)
        this.$set(this.form, 'menuName', this.parentNode?.menuName)
      } else {
        this.$set(this.form, 'pid', this.parentNode?.menuId)
      }
    },
    clearForm() {
      this.form = {}
    },
    resetForm() {
      this.clearForm()
      this.$refs.form.resetFields()
    }
  }
}
</script>

