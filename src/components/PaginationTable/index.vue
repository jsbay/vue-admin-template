<!--
 * @FilePath src/components/PaginationTable/index.vue
 * @Created Bay丶<baizhanying@autobio.com.cn> 2021-05-14 14:18:54
 * @Modified Bay丶<baizhanying@autobio.com.cn> 2021-05-18 16:49:44
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
      pageSizes: [20, 30, 50, 100]
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
  padding: 10px 0;
}
</style>
