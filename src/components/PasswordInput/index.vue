<template>
  <div class="password-input-with--eye">
    <el-input :key="passwordType" ref="password" v-model="value" :type="passwordType" :placeholder="placeholder" name="密码" auto-complete="on" @input="$emit('input', value)" />
    <span class="show-pwd" @click="showPwd">
      <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
    </span>
  </div>
</template>

<script>
export default {
  name: 'PasswordInput',
  model: {
    prop: 'defaultValue',
    event: 'input'
  },
  props: {
    defaultValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入密码...'
    }
  },
  data() {
    return {
      passwordType: 'password',
      value: this.defaultValue
    }
  },
  methods: {
    clear() {
      this.value = ''
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
    }
  }
}
</script>

<style lang="scss" scoped>
.password-input-with--eye {
  position: relative;

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    cursor: pointer;
    user-select: none;
  }
}
</style>
