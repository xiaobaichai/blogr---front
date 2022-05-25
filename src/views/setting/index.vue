<template>
  <div class="outer">
    <div class="carousel">
      <div class="title">#轮播图上传</div>
      <div class="carousel-outer">
        <div v-for="(item,index) in 3" :key="item" class="carousel-item">
          <div class="img-outer">
            <img ref="img" :src="carouselImg[index]" alt="">
            <div class="cover">点击上传轮播图</div>
            <input ref="file" type="file" name="img" @change="loadImg(index)">
          </div>
          <div class="link">
            <span>link:</span>
            <el-input v-model="link[index]" class="input" placeholder="请输入内容" />
          </div>
          <div class="description">
            <span>描述:</span>
            <el-input
              v-model="description[index]"
              class="input"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
            /></div>
          <el-button size="small" @click="upload(index)">提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadCarousel, downloadCarousel } from '@/api/uploadCarousel.js'

export default {
  data() {
    return {
      link: [],
      description: [],
      carouselImg: []
    }
  },
  mounted() {
    this.reqData()
  },
  methods: {
    // 加载图片
    loadImg: function(index) {
      var that = this
      var fileArr = this.$refs.file
      var file = fileArr[index].files[0]
      // 验证文件是否为图片类型，是则进行下一步操作
      var imageType = /^image\//
      if (!imageType.test(file.type)) {
        that.$message('请上传图片类型文件')
        return
      }
      const reader = new FileReader()
      reader.onload = function(e) {
        that.$set(that.carouselImg, index, e.target.result)
      }
      reader.readAsDataURL(file)
    },
    // axios上传
    upload: function(index) {
      const formdata = new FormData()
      var fileArr = this.$refs.file
      formdata.append('file', fileArr[index].files[0])
      formdata.append('link', this.link[index])
      formdata.append('description', this.description[index])
      formdata.append('index', index)
      uploadCarousel(formdata)
        .then(response => {
          if (response.data.code !== 0) {
            this.$message(response.data.message)
          }
          if (response.data.code === 0) {
            this.$message(response.data.message)
          }
        })
        .catch(err => {
          throw err
        })
    },
    // 加载页面前请求数据
    reqData: function() {
      downloadCarousel()
        .then(response => {
          for (let i = 0; i < response.data.data.length; i++) {
            this.link.push(response.data.data[i].link)
            this.description.push(response.data.data[i].description)
            this.carouselImg.push(response.data.data[i].src)
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.outer {
  margin: 20px;
  padding-bottom: 30px;
  border-bottom: 1px solid rgb(158, 154, 154);
  .carousel {
    .title {
      margin-bottom: 15px;
      font-size: 22px;
      font-weight: 400;
    }
    .carousel-outer {
      width: 92%;
      margin: 0 auto;
      // background-color: rgb(218, 76, 76);
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .carousel-item {
        margin-bottom: 15px;
        .img-outer {
          width: 380px;
          height: 214px;
          border: 1px solid rgb(189, 186, 186);
          text-align: center;
          line-height: 252px;
          position: relative;
          :hover {
            cursor: pointer;
          }
          &:hover .cover {
            opacity: 0.5;
          }
          &:hover img {
            opacity: 0.4;
          }
          .cover {
            width: 100%;
            height: 100%;
            line-height: 214px;
            position: absolute;
            left: 0;
            top: 0;
            background-color: rgb(240, 238, 238);
            color: rgb(20, 20, 20);
            opacity: 0;
          }
          img {
            width: auto;
            height: auto;
            max-width: 100%;
            max-height: 100%;
          }
          input {
            width: 100%;
            height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          display: block;
        }
        }
        .link {
          display: flex;
          justify-content: space-between;
          text-align: center;
          margin-top: 10px;
          span {
            margin: auto 0;
            font-size: 18px;
            color: gray;
          }
          .input {
            display: inline-block;
            width: 88%;
          }
        }
        .description {
          display: flex;
          justify-content: space-between;
          text-align: center;
          margin: 10px 0;
          span {
            margin: auto 0;
            font-size: 18px;
            color: gray;
          }
          .input {
            display: inline-block;
            width: 88%;
          }
        }
      }
    }
  }
}
</style>
