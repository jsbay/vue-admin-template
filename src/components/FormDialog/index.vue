<!--
 * @FilePath src/components/FormDialog/index.vue
 * @Created Bay丶<baizhanying@autobio.com.cn> 2021-05-10 15:48:12
 * @Modified Bay丶<baizhanying@autobio.com.cn> 2021-05-10 16:04:00
 * @Description dialog form
-->

<template>
  <el-dialog :width="width" :visible.sync="show" :title="title" :lock-scroll="false" destroy-on-close @closed="closed">
    <slot />
    <slot name="footer">
      <template slot="footer">
        <el-button v-if="showCancelBtn" plain @click="close(), $emit('cancel')">{{ cancelText }}</el-button>
        <el-button type="primary" @click="$emit('confirm')">{{ confirmText }}</el-button>
      </template>
    </slot>
  </el-dialog>
</template>

<script>
import DialogCommon from '@/mixin/DialogCommon'
export default {
  name: 'FormDialog',
  mixins: [DialogCommon],
  props: {
    title: {
      type: String,
      default: 'Dialog Form'
    },
    width: {
      type: [String, Number],
      default: '600px'
    },
    showCancelBtn: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    closed: {
      type: Function,
      default() {
        return function() {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
