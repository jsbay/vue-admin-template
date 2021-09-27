<template>
  <el-table-column v-bind="$attrs">
    <template #header>
      <div class="filter-header">
        {{ $attrs.label }}
        <el-popover v-model="showPopover" placement="bottom-end" width="200" :visible-arrow="false">
          <el-button slot="reference" class="filter-btn text-button--default" :class="{ 'text-button--primary': work }" type="text">
            <svg-icon icon-class="filter " />
          </el-button>

          <el-checkbox-group v-if="multiple" v-model="query">
            <el-checkbox v-for="iFilter in iFilters" :key="iFilter.value" :label="iFilter.value">{{ iFilter.text }}<br></el-checkbox>
          </el-checkbox-group>

          <el-radio-group v-else v-model="query">
            <el-radio v-for="iFilter in iFilters" :key="iFilter.value" :label="iFilter.value">{{ iFilter.text }}</el-radio>
          </el-radio-group>

          <div class="filter-footer">
            <el-button type="primary" size="mini" @click="filter">筛选</el-button>
            <el-button type="info" size="mini" @click="reset">重置</el-button>
          </div>
        </el-popover>
      </div>
    </template>
    <template slot-scope="{ row }">
      <slot :row="row" />
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'FilterTableColumn',
  props: {
    multiple: {
      type: Boolean,
      default() {
        return false
      }
    },
    iFilters: {
      type: Array,
      require: true,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      showPopover: false,
      query: '',
      work: false
    }
  },
  methods: {
    filter() {
      this.$emit('filter', this.$attrs['custom-key'] || this.$attrs.prop, this.query)
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
.filter-header {
  position: relative;
}
.filter-btn {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.filter-footer {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}

.el-checkbox,
.el-radio {
  display: block;
  & ~ & {
    margin-top: 5px;
  }
}

.el-radio ::v-deep .el-radio__label {
  margin-left: 10px;
}

.text-button--default {
  color: #909399;
}

.text-button--primary {
  color: teal;
}
</style>
