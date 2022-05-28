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
        prop="id"
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
          <el-button type="text" size="small" @click="replyReady(scope.row)">回复</el-button>
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
      @current-change="handleCurrentChange"
    />
    <!-- 弹窗 -->
    <el-dialog
      title="回复:"
      :visible.sync="dialogVisible"
      width="60%"
      :before-close="handleClose"
    >
      <el-input v-model="replyContent" type="textarea" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="replyMessage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getMessageCount, getMessage, deleteMessage, reply } from '@/api/message.js'

export default {
  data() {
    return {
      messageData: [],
      messageCount: 0,
      keyword: '',
      dialogVisible: false,
      rowDialog: {},
      replyContent: '',
      replyId: 0
    }
  },
  mounted() {
    this.reqData()
  },
  methods: {
    // 删除留言
    deleteItem: function(row) {
      this.$confirm('是否确认删除该留言?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMessage(row.id)
          .then(response => {
            if (response.data.code !== 0) return
            window.location.reload()
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 弹窗留言回复框
    replyReady: function(row) {
      this.dialogVisible = true
      this.replyId = row.id
    },
    // 回复留言
    replyMessage: function() {
      reply(this.replyId, this.replyContent)
        .then(response => {
          if (response.data.code !== 0) {
            this.dialogVisible = false
            this.$message(response.data.message)
          }
          this.dialogVisible = false
          this.$message('回复成功')
          window.location.reload()
        })
    },
    handleCurrentChange: function(page) {
      getMessage(page, 8)
        .then(response => {
          if (response.data.code !== 0) return
          this.messageData = response.data.data
        })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    reqData: function() {
      getMessageCount()
        .then(response => {
          this.messageCount = response.data.data[0].count
        })
      getMessage(1, 8)
        .then(response => {
          this.messageData = response.data.data
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
