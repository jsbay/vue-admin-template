/*
 * @FilePath src/mixin/dialog.js
 * @Created Bay丶<baizhanying@autobio.com.cn> 2021-05-08 10:55:54
 * @Modified Bay丶<baizhanying@autobio.com.cn> 2021-09-26 15:02:39
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
