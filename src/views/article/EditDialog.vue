<template>
  <div class="outer">
    <div class="title">
      <p>标题</p>
      <el-input v-model="input" placeholder="请输入内容" />
    </div>
    <div class="category">
      <p>分类</p>
      <div>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <div class="article">
      <p>内容</p>
      <div class="content">
        <w-editor />
      </div>
    </div>
    <el-button type="primary">提交</el-button>
  </div>
</template>

<script>
import WEditor from '@/components/WEditor.vue'

export default {
  components: {
    WEditor
  },
  data() {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      input: '',
      value: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.outer {
  margin: 0 20px;
  p {
    margin-bottom: 5px;
    color: rgb(116, 113, 113);
  }
  .title {
    margin-bottom: 20px;
  }
  .category {
  margin-bottom: 20px;
  }
  .article {
  margin-bottom: 20px;
  }
}
</style>
