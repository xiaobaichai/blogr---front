<template>
  <div class="outer">
    <div class="search">
      <el-input v-model="keyword" class="input" placeholder="请输入搜索内容" />
      <el-button class="button" type="primary" @click="search">查询</el-button>
    </div>
    <el-table
      class="tableBox"
      :data="articleData"
      max-height="700px"
      border
    >
      <el-table-column
        prop="id"
        label="文章ID"
        width="100"
      />
      <el-table-column
        prop="title"
        label="文章标题"
        width="180"
      />
      <el-table-column
        label="文章内容"
        width="500"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <!-- 因为elmentui表格超高现在无法处理，只能暂时先用pre_content来防止表格超高 -->
          <div v-html="scope.row.pre_content" />
        </template>
      </el-table-column>
      <el-table-column
        prop="tag"
        label="文章分类"
        width="120"
      />
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="deleteItem(scope.row)">删除</el-button>
          <el-button type="text" size="small" @click="readyEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :page-size="8"
      :total="articleCount"
      :hide-on-single-page="true"
      @current-change="handleCurrentChange"
    />
    <!-- 弹窗 -->
    <el-dialog
      v-if="dialogVisible"
      title="编辑"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
    >
      <edit-dialog :row-data="rowData" @closeDialog="closeDialog" />
    </el-dialog>
  </div>
</template>

<script>
import EditDialog from './EditDialog.vue'

import { getArticle, getArticleCount, deleteArticle, searchArticle } from '@/api/article.js'

export default {
  components: {
    EditDialog
  },
  data() {
    return {
      articleData: [],
      articleCount: 0,
      keyword: '',
      dialogVisible: false,
      rowData: {},
      editId: 0
    }
  },
  mounted() {
    this.reqData()
  },
  methods: {
    // 删除文章
    deleteItem: function(row) {
      this.$confirm('是否确认删除该留言?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(row.id)
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
    search() {
      searchArticle(this.keyword)
        .then(response => {
          if (response.data.code !== 0) {
            this.$message('服务端错误')
            return
          }
          this.articleData = response.data.data
          this.articleCount = response.data.data.length
        })
    },
    closeDialog() {
      this.dialogVisible = false
      window.location.reload()
    },
    readyEdit: function(row) {
      this.dialogVisible = true
      this.rowData = row
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    handleCurrentChange: function(page) {
      getArticle(page, 8)
        .then(response => {
          if (response.data.code !== 0) return
          this.articleData = response.data.data
        })
    },
    reqData: function() {
      getArticle(1, 8)
        .then(response => {
          if (response.data.code !== 0) return
          this.articleData = response.data.data
        })
      getArticleCount()
        .then(response => {
          this.articleCount = response.data.data[0].articleCount
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
    .tableBox {
      width: 90%;
      margin: 20px auto;
    }
    .pagination {
      text-align: center;
    }
  }
</style>
