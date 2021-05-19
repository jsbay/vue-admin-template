<!--
 * @FilePath src/views/settings/role/index.vue
 * @Created Bay丶<baizhanying@autobio.com.cn> 2021-05-18 15:48:36
 * @Modified Bay丶<baizhanying@autobio.com.cn> 2021-05-18 17:59:47
 * @Description 系统设置 - 权限管理
-->

<template>
  <div class="app-container">
    <pagination-table ref="paginationTable" :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange" @create="handleCreate">

      <template #top>
        <el-row>
          <el-col>
            <el-form ref="form" inline :model="form" label-width="0" class="table-filter-form">
              <el-form-item>
                <el-input v-model="form.keyword" placeholder="权限名" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleFilter">查询</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </template>

      <el-table :data="roles" border stripe>
        <el-table-column prop="role" label="权限名" align="center" width="100px" />

        <el-table-column prop="status" label="状态" align="center" width="80px">
          <template slot-scope="{ row }">
            <el-tag v-if="row.status === 0" type="warning" effect="dark">禁用</el-tag>
            <el-tag v-else type="success" effect="dark">正常</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="permissions" label="权限">
          <template slot-scope="{ row }">
            {{ parsePermissions(row) }}
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

    <create-dialog ref="createDialog" :permissions="permissions" @success="getRoles" />
    <modify-dialog ref="modifyDialog" :permissions="permissions" :role="role" @success="getRoles" />
  </div>
</template>

<script>
import PaginationTable from '@/components/PaginationTable'

import CreateDialog from '@/views/settings/role/components/CreateDialog'
import ModifyDialog from '@/views/settings/role/components/ModifyDialog'

import { getList, getPermissions, destory } from '@/api/role'

export default {
  name: 'Role',
  components: {
    PaginationTable,
    CreateDialog,
    ModifyDialog
  },
  data() {
    return {
      form: {
        page: 1,
        limit: 20
      },
      roles: [],
      total: 0,
      role: {},
      permissions: []
    }
  },
  mounted() {
    this.getRoles()
    this.getPermissions()
  },
  methods: {
    async getRoles() {
      const loading = this.$loading()

      const { data: { roles, total }} = await getList(this.form)
      this.roles = roles
      this.total = total

      loading.close()
    },
    async getPermissions() {
      const { data: { permissions }} = await getPermissions()
      this.permissions = permissions
    },
    parsePermissions(row) {
      const permissions = row.permissions.map(permission => permission.name)
      return permissions.join(', ')
    },
    // 查询
    handleFilter() {
      this.$refs.paginationTable.resetCurrentPage()
    },
    // 新增
    handleCreate() {
      this.$refs.createDialog.open()
    },
    // 修改
    handleModify(row) {
      this.role = row
      this.$refs.modifyDialog.open()
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
