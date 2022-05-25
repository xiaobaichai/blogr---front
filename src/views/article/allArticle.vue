<template>
  <div class="outer">
    <div class="search">
      <el-input v-model="keyword" class="input" placeholder="请输入搜索内容" />
      <el-button class="button" type="primary">查询</el-button>
    </div>
    <el-table
      class="table"
      :data="tableData"
      border
    >
      <el-table-column
        prop="date"
        label="日期"
        width="150"
      />
      <el-table-column
        prop="name"
        label="姓名"
        width="120"
      />
      <el-table-column
        prop="province"
        label="省份"
        width="120"
      />
      <el-table-column
        prop="city"
        label="市区"
        width="120"
      />
      <el-table-column
        prop="address"
        label="地址"
        width="300"
      />
      <el-table-column
        prop="zip"
        label="邮编"
        width="120"
      />
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="deleteItem(scope.row)">删除</el-button>
          <el-button type="text" size="small" @click="editItem(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :total="1000"
      :hide-on-single-page="true"
    />
    <!-- 弹窗 -->
    <el-dialog
      title="编辑"
      :visible="dialogVisible"
      width="70%"
      :before-close="handleClose"
    >
      <edit-dialog />
    </el-dialog>
  </div>
</template>

<script>
import EditDialog from './EditDialog.vue'

export default {
  components: {
    EditDialog
  },
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      keyword: '',
      dialogVisible: false,
      rowDialog: {}
    }
  },
  methods: {
    deleteItem: function(row) {
      console.log('xixi')
      console.log(row)
    },
    editItem: function(row) {
      console.log(row)
      this.dialogVisible = true
      this.rowDialog = row
    },
    handleClose: function() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .outer {
    margin-top: 20px;
    .search {
      width: 90%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      .input {
        display: inline-block;
        width: 92%;
      }
    }
    .table {
      width: 90%;
      margin: 20px auto;
    }
    .pagination {
      text-align: center;
    }
  }
</style>
