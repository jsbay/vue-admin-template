<!--
 * @FilePath src/views/menu/index.vue
 * @Created Bay丶<baizhanying@autobio.com.cn> 2021-05-10 11:45:26
 * @Modified Bay丶<baizhanying@autobio.com.cn> 2021-09-26 15:38:12
 * @Description 菜单管理
-->

<template>
  <div v-loading="loading" class="app-container">
    <el-row class="table-top-bar">
      <el-col class="text-right">
        <el-button type="primary" @click="handleCreate(undefined)">新增</el-button>
      </el-col>
    </el-row>
    <el-table :data="menus" element-loading-text="加载中..." border fit stripe highlight-current-row row-key="id" default-expand-all>
      <el-table-column label="菜单名" prop="menuName" />
      <el-table-column label="权限 ID" prop="menuId" />

      <el-table-column label="操作" align="center" width="120px">
        <template slot-scope="{ row }">
          <el-link type="primary" :underline="false" @click="handleCreate(row)">新增</el-link>
          <el-link type="danger" :underline="false" @click="confirmDestory(row)">删除</el-link>
          <el-link type="warning" :underline="false" @click="handleModify(row)">修改</el-link>
        </template>
      </el-table-column>
    </el-table>
    <create-modify-dialog ref="createModifyDialog" :parent-node="parentNode" :mode="dialogMode" @success="getMenus" />
  </div>
</template>

<script>
import CreateModifyDialog from './components/CreateModifyDialog'
import { getList, destory } from '@/api/menu'

export default {
  name: 'Menu',
  components: { CreateModifyDialog },
  data() {
    return {
      loading: false,
      menus: [],
      dialogMode: 'create',
      parentNode: undefined
    }
  },
  mounted() {
    this.getMenus()
  },
  methods: {
    // 确认删除
    async confirmDestory(node) {
      try {
        await this.$confirm('确定删除本行，删除后将无法恢复，是否继续？', '警告', {
          type: 'warning',
          cancelButtonText: '取消',
          confirmButtonText: '是'
        })
        this.handleDestory(node)
      } catch (error) {
        if (error === 'cancel') this.$message.info('已取消')
      }
    },
    async handleDestory(node) {
      const { id } = node
      await destory({ id })
      await this.getMenus()
    },
    // 新增
    handleCreate(node) {
      this.parentNode = node
      this.dialogMode = 'create'
      this.$refs.createModifyDialog.open()
    },
    // 修改
    handleModify(node) {
      this.parentNode = node
      this.dialogMode = 'modify'
      this.$refs.createModifyDialog.open()
    },
    // 获取 菜单数据
    async getMenus() {
      this.loading = true

      const { data: { menus }} = await getList()
      this.menus = menus

      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.table-top-bar {
  margin-bottom: 10px;
}
</style>
