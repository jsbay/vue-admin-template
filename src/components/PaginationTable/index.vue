<!--
 * @FilePath src/components/PaginationTable/index.vue
 * @Created Bay丶<baizhanying@autobio.com.cn> 2021-05-14 14:18:54
 * @Modified Bay丶<baizhanying@autobio.com.cn> 2021-09-01 17:42:01
 * @Description 带有分页的 table
-->

<template>
  <div class="pagination-table">
    <slot name="top" />
    <el-row class="pagination-row">
      <el-col :span="20">
        <el-pagination :total="total" :current-page.sync="page" :page-size.sync="limit" :page-sizes="pageSizes" background layout="total, sizes, prev, pager, next" @current-change="handleCurrentChange" @size-change="handleSizeChange" />
      </el-col>
      <el-col :span="4" class="text-right">
        <el-button v-if="showCreate" type="primary" @click="$emit('create')">新增</el-button>
      </el-col>
    </el-row>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'PaginationTable',
  props: {
    total: {
      type: Number,
      default: 0
    },
    showCreate: {
      type: Boolean,
      default() { return true }
    }
  },
  data() {
    return {
      page: 1,
      limit: 20,
      pageSizes: [20, 50, 100, 200]
    }
  },
  methods: {
    resetCurrentPage() {
      this.page = 1
      this.$emit('current-change', 1)
    },
    handleCurrentChange(page) {
      console.log(page)
      this.$emit('current-change', page)
    },
    handleSizeChange(limit) {
      this.$emit('size-change', limit)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-row {
  padding-bottom: 10px;
}
</style>
