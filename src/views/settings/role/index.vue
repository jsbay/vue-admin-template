<!--
 * @FilePath src/views/settings/role/index.vue
 * @Created Bay丶<baizhanying@autobio.com.cn> 2021-05-18 15:48:36
 * @Modified Bay丶<baizhanying@autobio.com.cn> 2021-09-26 15:37:44
 * @Description 系统设置 - 权限管理
-->

<template>
  <div v-loading="loading" class="app-container">
    <pagination-table ref="paginationTable" :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange" @create="handleCreate">

      <el-table :data="roles" border stripe>
        <search-table-column prop="role" label="权限名" align="center" width="100px" @search="handleSearch" @reset="handleReset" />
        <el-table-column prop="state" label="状态" align="center" width="80px">
          <template slot-scope="{ row }">
            <el-tag v-if="row.state === 0" type="warning" effect="dark">禁用</el-tag>
            <el-tag v-else type="success" effect="dark">正常</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="menus" label="权限">
          <template slot-scope="{ row }">
            {{ parseMenus(row) }}
          </template>
        </el-table-column>

        <el-table-column prop="action" label="操作" align="center" width="100px">
          <template slot-scope="{ row }">
            <el-link type="warning" :underline="false" @click="handleModify(row)">修改</el-link>
            <el-link type="danger" :underline="false" @click="confirmDestory(row)"> 删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </pagination-table>

    <create-modify-dialog ref="createModifyDialog" :role="role" :mode="dialogMode" :menus="menus" @success="getRoles" />
  </div>
</template>

<script>

import CreateModifyDialog from './components/CreateModifyDialog'

import { getList, getMenus, destory } from '@/api/role'

export default {
  name: 'Role',
  components: { CreateModifyDialog },
  data() {
    return {
      loading: false,
      form: {
        page: 1,
        limit: 20
      },
      dialogMode: 'create',
      roles: [],
      total: 0,
      role: {},
      menus: []
    }
  },
  mounted() {
    this.getRoles()
    this.getMenus()
  },
  methods: {
    async getRoles() {
      this.loading = true

      const { data: { roles, total }} = await getList(this.form)
      this.roles = roles
      this.total = total

      this.loading = false
    },
    async getMenus() {
      const { data: { menus }} = await getMenus()
      this.menus = menus
    },
    parseMenus(row) {
      const menus = row.menus.map(menu => menu.name)
      return menus.join(', ')
    },
    handleSearch(prop, value) {
      this.$set(this.form, prop, value)
      this.handleFilter()
    },
    handleReset(prop) {
      this.$set(this.form, prop, undefined)
      this.handleFilter()
    },
    // 查询
    handleFilter() {
      this.$refs.paginationTable.resetCurrentPage()
    },
    // 新增
    handleCreate() {
      this.role = undefined
      this.dialogMode = 'create'
      this.$refs.createModifyDialog.open()
    },
    // 修改
    handleModify(row) {
      this.role = row
      this.dialogMode = 'modify'
      this.$refs.createModifyDialog.open()
    },
    // 确认删除
    async confirmDestory(row) {
      try {
        await this.$confirm('确定删除本行，删除后将无法恢复，是否继续？', '警告', {
          type: 'warning',
          cancelButtonText: '取消',
          confirmButtonText: '是'
        })
        this.handleDestory(row)
      } catch (error) {
        if (error === 'cancel') this.$message.info('已取消')
      }
    },
    async handleDestory(row) {
      const { id } = row
      await destory({ id })
      await this.getRoles()
    },
    handleCurrentChange(page) {
      this.$set(this.form, 'page', page)
      this.getRoles()
    },
    handleSizeChange(limit) {
      this.$set(this.form, 'limit', limit)
      this.getRoles()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
