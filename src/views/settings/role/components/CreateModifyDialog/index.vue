<!--
 * @FilePath src/views/settings/role/components/CreateModifyDialog/index.vue
 * @Created Bay丶<baizhanying@autobio.com.cn> 2021-09-23 09:22:13
 * @Modified Bay丶<baizhanying@autobio.com.cn> 2021-09-26 15:29:30
 * @Description 系统设置 - 权限管理 - 新增 && 修改
-->

<template>
  <form-dialog :visible.sync="show" :title="isModifyMode ? '修改' : '新增'" :closed="resetForm" @confirm="confirm" @open="onopen" @cancel="close">
    <el-form ref="form" :rules="formRules" :model="form" label-width="80px">
      <el-form-item label="权限名" prop="role">
        <el-input v-model.trim="form.role" placeholder="请输入权限名(不可修改)" :disabled="isModifyMode" />
      </el-form-item>

      <el-form-item v-show="isModifyMode" label="状态" prop="state">
        <el-switch v-model="form.locked" active-color="#E6A23C" inactive-color="#13ce66" active-text="禁用" inactive-text="正常" />
      </el-form-item>

      <el-form-item label="权限" prop="menu">
        <el-select v-model="selectedMenus" multiple placeholder="选择权限" style="width: 100%" @change="handleChange">
          <el-option
            v-for="menu in menus"
            :key="menu.id"
            :label="menu.name"
            :value="menu.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </form-dialog>
</template>

<script>
import dialog from '@/mixin/dialog'
import { create, modify } from '@/api/role'

export default {
  name: 'RoleCreateModifyDialog',
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
    menus: {
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
      selectedMenus: []
    }
  },
  computed: {
    isModifyMode() {
      return this.mode === 'modify'
    }
  },
  watch: {
    selectedMenus: {
      handler(nv) {
        if (nv) {
          this.$set(this.form, 'menus', nv)
        }
      },
      immediate: true
    },
    'form.locked': {
      handler(nv) {
        this.$set(this.form, 'state', nv ? 0 : 1)
      }
    }
  },
  methods: {
    onopen() {
      // modify mode
      if (this.isModifyMode) return this.initForm()
      // create mode
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
    handleChange() {
      this.$set(this.form, 'menus', this.selectedMenus)
    },
    initForm() {
      this.$set(this.form, 'id', this.role?.id)
      this.$set(this.form, 'role', this.role?.role)
      this.$set(this.form, 'state', this.role?.state)
      this.$set(this.form, 'locked', this.role?.state <= 0)
      this.$set(this, 'selectedMenus', this.role?.menus?.map(menu => menu.id))
    },
    clearForm() {
      this.form = {}
      this.$set(this, 'selectedMenus', [])
    },
    resetForm() {
      this.clearForm()
      this.$refs.form.resetFields()
    }
  }
}
</script>
