<!--
 * @FilePath src/views/demo/index.vue
 * @Created Bay丶<baizhanying@autobio.com.cn> 2021-05-19 09:18:00
 * @Modified Bay丶<baizhanying@autobio.com.cn> 2021-05-19 09:35:12
 * @Description demo
-->
<template>
  <div class="app-container">
    <el-table border stripe :data="demos">
      <el-table-column label="id" prop="id" />
      <el-table-column label="username" prop="username" />
      <el-table-column label="nickname" prop="nickname" />
      <el-table-column label="email" prop="email" />
      <el-table-column label="phone" prop="phone" />
      <el-table-column label="permissions" prop="permissions" />
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/demo'
export default {
  name: 'Demo',
  data() {
    return {
      demos: []
    }
  },
  mounted() {
    this.getDemos()
  },
  methods: {
    async getDemos() {
      const { data: { demos }} = await getList()
      this.demos = demos
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
