<template>
  <div class="outer">
    <!-- <div class="search">
      <el-input v-model="keyword" class="input" placeholder="请输入搜索内容" />
      <el-button class="button" type="primary">查询</el-button>
    </div> -->
    <el-table
      class="table"
      :data="messageData"
      border
    >
      <el-table-column
        prop="userId"
        label="ID"
        width="80"
      />
      <el-table-column
        prop="name"
        label="用户名"
        width="120"
      />
      <el-table-column
        prop="content"
        label="评论内容"
        width="300"
      />
      <el-table-column
        prop="reply"
        label="回复"
        width="300"
      />
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="deleteItem(scope.row)">删除</el-button>
          <el-button type="text" size="small" @click="editItem(scope.row)">回复</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :total="messageCount"
      :page-size="8"
      :hide-on-single-page="true"
    />
    <!-- 弹窗 -->
    <el-dialog
      title="提示"
      :visible="dialogVisible"
      width="30%"
    >
      <span>{{ rowDialog.date }}</span>
      <el-input v-model="rowDialog.date" class="input" placeholder="请输入搜索内容" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getMessage } from '@/api/message.js'

export default {
  data() {
    return {
      messageData: [],
      messageCount: 0,
      keyword: '',
      dialogVisible: false,
      rowDialog: {}
    }
  },
  mounted() {
    this.reqData()
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
    reqData: function() {
      getMessage()
        .then(response => {
          this.messageData = response.data.data
          this.messageCount = response.data.data.length
        })
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
