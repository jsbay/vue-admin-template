<template>
  <el-table-column v-bind="$attrs">
    <template #header>
      <div class="search-header">
        {{ $attrs.label }}
        <el-popover v-model="showPopover" placement="bottom-end" width="200" :visible-arrow="false">
          <el-button slot="reference" class="search-btn text-button--default" :class="{ 'text-button--primary': work }" type="text">
            <svg-icon icon-class="search" />
          </el-button>
          <el-input v-model="query" class="search-input" size="mini" :placeholder="'输入' + $attrs.label + '进行查找...'" />
          <div class="search-footer">
            <el-button type="primary" size="mini" @click="search">搜索</el-button>
            <el-button type="info" size="mini" @click="reset">重置</el-button>
          </div>
        </el-popover>
      </div>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'SearchTableColumn',
  data() {
    return {
      showPopover: false,
      query: '',
      work: false
    }
  },
  methods: {
    search() {
      this.$emit('search', this.$attrs['custom-key'] || this.$attrs.prop, this.query)
      this.work = true
      this.showPopover = false
    },
    reset() {
      this.$emit('reset', this.$attrs['custom-key'] || this.$attrs.prop)
      this.query = ''
      this.work = false
      this.showPopover = false
    }
  }
}
</script>

<style lang="scss" scoped>
.search-header {
  position: relative;
}
.search-btn {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.search-footer {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}

.search-input ::v-deep .el-input__inner {
  padding: 0 5px;
}

.text-button--default {
  color: #909399;
}

.text-button--primary {
  color: teal;
}
</style>
