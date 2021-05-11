<!--
 * @FilePath src/views/menu/index.vue
 * @Created Bay丶<baizhanying@autobio.com.cn> 2021-05-10 11:45:26
 * @Modified Bay丶<baizhanying@autobio.com.cn> 2021-05-11 17:58:36
 * @Description 菜单管理
-->

<template>
  <div class="app-container">
    <el-row class="table-top-bar">
      <el-col class="text-right">
        <el-button type="primary" @click="handleCreate(undefined)">新增</el-button>
      </el-col>
    </el-row>
    <el-table v-loading="listLoading" :data="list" element-loading-text="加载中..." border fit stripe highlight-current-row row-key="id">
      <el-table-column label="菜单名" prop="menu" />
      <el-table-column label="权限 ID" prop="permission" />

      <el-table-column label="操作" align="center" width="120px">
        <template slot-scope="{ row }">
          <el-link type="primary" :underline="false" @click="handleCreate(row)">新增</el-link>
          <el-link type="danger" :underline="false" @click="confirmDestory(row)"> 删除</el-link>
          <el-link type="warning" :underline="false" @click="handleModify(row)">修改</el-link>
        </template>
      </el-table-column>
    </el-table>
    <create-dialog ref="createDialog" :parent-node="parentNode" @success="getTableData" />
    <modify-dialog ref="modifyDialog" :parent-node="parentNode" @success="getTableData" />
  </div>
</template>

<script>
import { getList } from '@/api/menu'

import CreateDialog from '@/views/menu/components/CreateDialog'
import ModifyDialog from '@/views/menu/components/ModifyDialog'
export default {
  name: 'Menu',
  components: {
    CreateDialog,
    ModifyDialog
  },
  data() {
    return {
      listLoading: false,
      list: [],
      parentNode: undefined
    }
  },
  mounted() {
    this.getTableData()
  },
  methods: {
    // 新增
    handleCreate(parentNode) {
      this.parentNode = parentNode
      this.$refs.createDialog.open()
    },
    // 确认删除
    confirmDestory(node) {
      this.$confirm('确定删除本行，删除后将无法恢复，是否继续？', '警告', {
        type: 'warning',
        cancelButtonText: '取消',
        confirmButtonText: '是',
        callback(action) {
          if (action === 'confirm') this.handleDestory(node)
        }
      })
    },
    // todo 发送删除请求
    handleDestory(node) {

    },
    // 修改
    handleModify(node) {
      this.parentNode = node
      this.$refs.modifyDialog.open()
    },
    // 获取 菜单数据
    async getTableData() {
      this.listLoading = true
      const { data: { items }} = await getList()
      this.list = items
      this.listLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.table-top-bar {
  margin-bottom: 20px;
}
.el-link + .el-link {
  margin-left: 5px;
}
</style>
