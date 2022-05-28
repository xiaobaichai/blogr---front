<template>
  <div class="outer">
    <div class="title">
      <p>标题</p>
      <el-input v-model="goodsForm.title" placeholder="请输入内容" />
    </div>
    <div class="category">
      <p>分类</p>
      <div>
        <el-select v-model="goodsForm.tag" placeholder="请选择">
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
        <div style="border: 1px solid #ccc;">
          <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editor"
            :default-config="toolbarConfig"
            :mode="mode"
          />
          <Editor
            v-model="goodsForm.content"
            style="height: 500px; overflow-y: hidden;"
            :default-config="editorConfig"
            :mode="mode"
            @onCreated="onCreated"
          />
        </div>
      </div>
    </div>
    <el-button type="primary" @click="upload">提交</el-button>
  </div>
</template>

<script>
import Vue from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

import { upLoadArticle } from '@/api/article'

export default Vue.extend({
  components: { Editor, Toolbar },
  data() {
    return {
      options: [{
        value: 'css/html',
        label: 'css/html'
      }, {
        value: 'js',
        label: 'js'
      }, {
        value: 'vue',
        label: 'vue'
      }, {
        value: '其他',
        label: '其他'
      }],
      goodsForm: {
        id: '',
        title: '',
        tag: '',
        content: ''
      },
      editor: null,
      toolbarConfig: { },
      editorConfig: { MENU_CONF: {
        placeholder: '请输入内容。。。',
        uploadImage: {
          fieldName: 'file',
          server: 'http://localhost:3001/api/updateEditorImg'
        }
      }},
      mode: 'default' // or 'simple'
    }
  },
  mounted() {

  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    upload() {
      upLoadArticle(this.goodsForm)
        .then(response => {
          if (response.data.code !== 0) {
            this.$message('服务端错误')
            return
          }
          this.$message('上传成功')
          window.location.reload()
        })
    }
  }
})

</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>

<style lang="scss" scoped>
.outer {
  // width: 80%;
  margin: 20px 50px;
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
