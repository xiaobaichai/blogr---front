<template>
  <div class="home">
    <div class="main">
      <div class="title">站点内容统计:</div>
      <div class="article">共有{{ articleCount }}篇文章</div>
      <div class="message">共有{{ messageCount }}条评论</div>
    </div>
  </div>
</template>

<script>
import { getArticleCount, getMessageCount } from '@/api/home.js'

export default {
  data() {
    return {
      articleCount: 0,
      messageCount: 0
    }
  },
  mounted() {
    this.reqData()
  },
  methods: {
    reqData: function() {
      getArticleCount()
        .then(response => {
          this.articleCount = response.data.data[0].articleCount
        })
      getMessageCount()
        .then(response => {
          this.messageCount = response.data.data[0].count
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
    .main {
        width:  30%;
        margin-top: 15px;
        margin-left: 15px;
        font-size: 14px;
        border: 1px solid rgb(216, 211, 211);
        border-radius: 5px;
        div {
            padding-left: 18px;
            display: block;
            border-bottom: 1px solid rgb(221, 215, 215);
            height: 40px;
            line-height: 40px;
        }
        .title {
            background-color: rgb(233, 233, 233);
        }
        .message {
            border-bottom: none;
        }
    }
}
</style>
