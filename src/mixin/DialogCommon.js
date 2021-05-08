/*
 * @FilePath src/mixin/DialogCommon.js
 * @Created Bay丶<baizhanying@autobio.com.cn> 2021-05-08 10:55:54
 * @Modified Bay丶<baizhanying@autobio.com.cn> 2021-05-08 11:24:29
 * @Description dailog 组件 common
 */

export default {
  data() {
    return {
      show: false
    }
  },
  methods: {
    open() {
      this.show = true
    },
    close() {
      this.show = false
    }
  }
}
