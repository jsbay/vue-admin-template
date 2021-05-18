<!--
 * @FilePath src/views/user/index.vue
 * @Created Bay丶<baizhanying@autobio.com.cn> 2021-05-12 10:19:14
 * @Modified Bay丶<baizhanying@autobio.com.cn> 2021-05-18 14:54:06
 * @Description
-->

<template>
  <div class="app-container">
    <pagination-table ref="paginationTable" :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange" @create="handleCreate">

      <template #top>
        <el-row>
          <el-col>
            <el-form ref="form" inline :model="form" label-width="0">
              <el-form-item>
                <el-input v-model="form.keyword" placeholder="用户 ID/用户名/账户" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleFilter">查询</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </template>

      <el-table :data="users" border stripe>

        <el-table-column prop="id" label="用户 ID" align="center" width="100px" />
        <el-table-column prop="createtime" label="创建时间" align="center" width="150px" />
        <el-table-column prop="username" label="账户" align="center" width="80px" />
        <el-table-column prop="nickname" label="用户名" align="center" width="80px" />

        <el-table-column prop="status" label="账户状态" align="center" width="100px">
          <template slot-scope="{ row }">
            <el-tag v-if="row.status === -1" type="warning">禁用</el-tag>
            <el-tag v-else-if="row.status === 0" type="info">注册中</el-tag>
            <el-tag v-else type="success">正常</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱" />

        <el-table-column prop="action" label="操作" align="center" width="100px">
          <template slot-scope="{ row }">
            <el-link type="warning" :underline="false" @click="handleModify(row)">修改</el-link>
            <el-link type="danger" :underline="false" @click="confirmDestory(row)"> 删除</el-link>
          </template>
        </el-table-column>

      </el-table>
    </pagination-table>

    <create-dialog ref="createDialog" @success="getUsers" />
    <modify-dialog ref="modifyDialog" :user="user" @success="getUsers" />
  </div>
</template>

<script>
import { getList, destory } from '@/api/user'
import PaginationTable from '@/components/PaginationTable'

import CreateDialog from '@/views/settings/user/components/CreateDialog'
import ModifyDialog from '@/views/settings/user/components/ModifyDialog'
export default {
  name: 'User',
  components: {
    PaginationTable,
    CreateDialog,
    ModifyDialog
  },
  data() {
    return {
      total: 1000,
      users: [],
      form: {
        page: 1,
        limit: 20
      },
      user: {}
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    async getUsers() {
      const loading = this.$loading()

      const { data: { users, total }} = await getList(this.form)
      this.users = users
      this.total = total

      loading.close()
    },
    handleFilter() {
      this.$refs.paginationTable.resetCurrentPage()
    },
    handleCreate() {
      this.$refs.createDialog.open()
    },
    handleModify(row) {
      this.user = row
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
.el-link + .el-link {
  margin-left: 5px;
}
</style>
