<template>
  <div class="outer">
    <!-- <div class="search">
      <el-input v-model="keyword" class="input" placeholder="请输入搜索内容" />
      <el-button class="button" type="primary">查询</el-button>
    </div> -->
    <el-table
      class="table"
      :data="userData"
      border
    >
      <el-table-column
        prop="id"
        label="ID"
        width="150"
      />
      <el-table-column
        prop="name"
        label="用户名"
        width="120"
      />
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="deleteItem(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :page-size="8"
      :total="userCount"
      :hide-on-single-page="true"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { getUserCount, getUserData, deleteUser } from '@/api/userManagement.js'

export default {
  data() {
    return {
      userData: [],
      userCount: 0,
      keyword: '',
      dialogVisible: false,
      rowDialog: {}
    }
  },
  mounted() {
    this.reqData()
  },
  methods: {
    // 删除用户
    deleteItem: function(row) {
      this.$confirm('是否确认删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser(row.id)
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
    handleCurrentChange: function(page) {
      getUserData(page, 8)
        .then(response => {
          if (response.data.code !== 0) return
          this.userData = response.data.data
        })
    },
    reqData: function() {
      getUserCount()
        .then(response => {
          if (response.data.code !== 0) return
          this.userCount = response.data.data[0].count
        })
      getUserData(1, 8)
        .then(response => {
          this.userData = response.data.data
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
