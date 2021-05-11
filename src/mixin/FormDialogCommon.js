/*
 * @FilePath src/mixin/FormDialogCommon.js
 * @Created Bay丶<baizhanying@autobio.com.cn> 2021-05-08 10:55:54
 * @Modified Bay丶<baizhanying@autobio.com.cn> 2021-05-10 16:44:54
 * @Description form dailog 组件 common
 */

export default {
  methods: {
    open() {
      this.$children[0].open()
      // this.$refs.formDialog.open()
    },
    close() {
      this.$children[0].close()
      // this.$refs.formDialog.close()
    }
  }
}
