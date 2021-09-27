<!--
 * @FilePath src/views/user/index.vue
 * @Created Bay丶<baizhanying@autobio.com.cn> 2021-05-12 10:19:14
 * @Modified Bay丶<baizhanying@autobio.com.cn> 2021-09-26 17:19:23
 * @Description
-->

<template>
  <div v-loading="loading" class="app-container">
    <pagination-table ref="paginationTable" :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange" @create="handleCreate">
      <el-table :data="users" border stripe :max-height="tableMaxHeight" size="mini">

        <search-table-column prop="id" label="用户 ID" align="center" width="100px" @search="handleSearch" @reset="handleReset" />
        <el-table-column prop="createtime" label="创建时间" align="center" width="150px" />

        <search-table-column prop="username" label="账户" align="center" width="80px" @search="handleSearch" @reset="handleReset" />

        <search-table-column prop="nickname" label="用户名" align="center" width="100px" @search="handleSearch" @reset="handleReset" />

        <el-table-column prop="role" label="权限" align="center" width="100px">
          <template slot-scope="{ row }">{{ row.roles.map(r=>r.name).join(', ') }}</template>
        </el-table-column>

        <filter-table-column prop="state" label="账户状态" align="center" width="100px" :i-filters="[{ text: '禁用', value: -1 }, { text: '注册中', value: 0 }, { text: '正常', value: 1 }]" multiple @filter="handleSearch" @reset="handleReset">
          <template slot-scope="{ row }">
            <el-tag v-if="row.state === -1" type="warning" effect="dark" size="mini">禁用</el-tag>
            <el-tag v-else-if="row.state === 0" type="info" effect="dark" size="mini">注册中</el-tag>
            <el-tag v-else type="success" effect="dark" size="mini">正常</el-tag>
          </template>
        </filter-table-column>

        <search-table-column prop="email" label="邮箱" @search="handleSearch" @reset="handleReset" />

        <el-table-column prop="action" label="操作" align="center" width="100px">
          <template slot-scope="{ row }">
            <el-link type="warning" :underline="false" @click="handleModify(row)">修改</el-link>
            <el-link type="danger" :underline="false" @click="confirmDestory(row)"> 删除</el-link>
          </template>
        </el-table-column>

      </el-table>
    </pagination-table>

    <create-modify-dialog ref="createModifyDialog" :roles="roles" :mode="dialogMode" :user="user" @success="getUsers" />
  </div>
</template>

<script>
import { getList, destory, getRoles } from '@/api/user'

import CreateModifyDialog from './components/CreateModifyDialog'
export default {
  name: 'User',
  components: { CreateModifyDialog },
  data() {
    return {
      loading: false,
      total: 0,
      users: [],
      dialogMode: 'create',
      form: {
        page: 1,
        limit: 20
      },
      user: {},
      roles: []
    }
  },
  computed: {
    tableMaxHeight() {
      const windowHeight = window.innerHeight || document.documentElement.clientHeight
      return windowHeight - 164
    }
  },
  mounted() {
    this.getUsers()
    this.getRoles()
  },
  methods: {
    async getUsers() {
      this.loading = true

      const { data: { users, total }} = await getList(this.form)
      this.users = users
      this.total = total

      this.loading = false
    },
    async getRoles() {
      const { data: { roles }} = await getRoles()
      this.roles = roles
    },
    handleSearch(prop, value) {
      this.$set(this.form, prop, value)
      this.handleFilter()
    },
    handleReset(prop) {
      this.$set(this.form, prop, undefined)
      this.handleFilter()
    },
    handleFilter() {
      this.$refs.paginationTable.resetCurrentPage()
    },
    // 新增
    handleCreate() {
      this.user = undefined
      this.dialogMode = 'create'
      this.$refs.createModifyDialog.open()
    },
    // 修改
    handleModify(row) {
      this.user = row
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
      await this.getUsers()
    },
    handleCurrentChange(page) {
      this.$set(this.form, 'page', page)
      this.getUsers()
    },
    handleSizeChange(limit) {
      this.$set(this.form, 'limit', limit)
      this.getUsers()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
