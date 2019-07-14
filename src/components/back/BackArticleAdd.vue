<template>
  <div>
    <BackHeader></BackHeader>
    <BackMenu></BackMenu>
    <div class="my_content col-lg-10" id="main">
      <div class="row">
          <div class="col-md-9">
            <h1 class="page-header">撰写新面试题</h1>
            <div class="form-group">
              <p :class="error_cls">{{ title_error }}</p>
              <label for="article-title" class="sr-only">标题</label>
              <input type="text" id="article-title" v-model="title" name="title" class="form-control" placeholder="在此处输入标题" required autofocus autocomplete="off">
            </div>
            <div class="form-group">
              <label for="article-content" class="sr-only">内容</label>
              <script id="article-content" name="content" type="text/plain"></script>
            </div>
            <div class="add-article-box">
              <p :class="error_cls">{{ pri_key_error }}</p>
              <h2 class="add-article-box-title"><span>涉及技术栈</span></h2>
              <div class="add-article-box-content">
                <input type="text" class="form-control" v-model="pri_key" placeholder="请输入技术" name="keywords" autocomplete="off">
                <span class="prompt-text">多个技术栈请用英文逗号,隔开。</span>
              </div>
            </div>
            <div class="add-article-box">
              <p :class="error_cls">{{ answer_error }}</p>
              <h2 class="add-article-box-title"><span>描述</span></h2>
              <div class="add-article-box-content">
                <editor id="editor_id" name="describe" height="500px" width="100%" :content.sync="editorText"
                        :afterChange="afterChange()"
                        pluginsPath="../../../static/kindeditor/plugins/"
                        :loadStyleMode="false"
                        @on-content-change="onContentChange"></editor>
                <!--<div> editorTextCopy: {{ editorTextCopy }} </div>-->

                <span class="prompt-text">面试题的解答流程</span>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <h1 class="page-header">操作</h1>
            <div class="add-article-box">
              <h2 class="add-article-box-title"><span>来源公司</span></h2>
              <div class="add-article-box-content">
                <input type="text" class="form-control" v-model="from_company" placeholder="输入公司名称" name="tags" autocomplete="off">
                <span class="prompt-text">多个来源公司请用英文逗号,隔开</span> </div>
            </div>
            <div class="add-article-box">
              <h2 class="add-article-box-title"><span>发布</span></h2>
              <div class="add-article-box-content">
                <p><label>状态：</label><span class="article-status-display">未发布</span></p>
                <p><label>公开度：</label>
                  <input type="radio" name="visibility" value="1" v-model="is_show" checked/>发布
                  <input type="radio" name="visibility" value="0" v-model="is_show" />不发布</p>
              </div>
              <div class="add-article-box-footer">
                <button class="btn btn-primary" name="submit" @click="push_answer">发布</button>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackHeader from './BackHeader.vue'
import BackMenu from './BackMenu.vue'
export default {
  name: 'BackArticleAdd',
  components: {
    BackHeader,
    BackMenu
  },
  data () {
    return {
      editorText: '', // 双向同步的变量
      editorTextCopy: '', // content-change 事件回掉改变的对象
      title: '',
      answer: '',
      pri_key: '',
      from_company: '',
      is_show: '',
      title_error: '',
      pri_key_error: '',
      answer_error: '',
      error_cls: 'error_cls',
      answer_id: ''
    }
  },
  methods: {
    onContentChange (val) {
      this.editorTextCopy = val;
      console.log(this.editorTextCopy)
    },
    afterChange () {
    },
    push_answer () {
      const token = localStorage.getItem('token')
      const params = {
        title: this.title,
        answer: this.editorTextCopy,
        pri_key: this.pri_key,
        token: token
      }
      // 判断是否填写了公司名称和发布状态，如果填写则重新组装params变量
      if (this.from_company) {
        params['from_company'] = this.from_company
      }
      if (this.is_show) {
        params['is_show'] = this.is_show
      }

      if (this.answer_id) {
      //  执行修改面试题的axios功能
        this.axios({
          method: 'patch',
          url: '/api/back/questions/' + this.answer_id + '/?token=' + token,
          data: params
        }).then(
          res => {
            const resp = res.data
            if (resp.code === 200) {
              this.$router.push({'path': '/back/article/'})
            }
          }
        ).catch(
          err => {
            alert('修改面试题失败')
            console.log(err)
          }
        )
      } else {
      // 执行创建面试题的axios功能
      console.log(params)
        this.axios.post('/api/back/questions/', params).then(
          res => {
            const resp = res.data
            if (resp.code === 200) {
              this.$router.push({'path': '/back/article/'})
            }
            if (resp.code === 2002 | resp.code === 1006 | resp.code === 1001) {
              alert(resp.msg)
            } else {
              // 将错误信息渲染到页面中
              console.log(resp.data.error)
              if (resp.data.error.title) {
                this.title_error = resp.data.error.title[0]
              }
              if (resp.data.error.answer) {
                this.answer_error = resp.data.error.answer[0]
              }
              if (resp.data.error.pri_key) {
                this.pri_key_error = resp.data.error.pri_key[0]
              }
            }
          }
        )
      }
    }
  },
  mounted () {
    // 获取路由中动态的id值
    const id = this.$route.params.id
    this.answer_id = id
    const token = localStorage.getItem('token')
    if (id) {
      this.axios.get('/api/back/questions/' + id + '/?token=' + token).then(
        res => {
          const resp = res.data
          this.title = resp.data.title
          this.editorText = resp.data.answer
          this.pri_key = resp.data.pri_key
          this.from_company = resp.data.from_company
          this.is_show = resp.data.is_show
        }
      ).catch(
        err => {
          alert(err)
        }
      )
    }
  }
}
</script>

<style scoped>
@import "../../../static/back/css/style.css";
@import "../../../static/back/css/font-awesome.min.css";
@import "../../../static/back/css/bootstrap.min.css";
.my_content {padding-top: 30px;}
.error_cls {color:red; font-weight: bold; font-family: '微软雅黑';}
body {
  color: #444;
  background-color: #EEE;
  overflow-x: hidden;
}
</style>
