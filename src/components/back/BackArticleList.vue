<template>
  <div>
    <BackHeader></BackHeader>
    <BackMenu></BackMenu>
    <div style="width: 70%;" class="col-lg-10 my_content" id="main">
      <form action="/Article/checkAll" method="post" >
        <h1 class="page-header">操作</h1>
        <ol class="breadcrumb">
          <li><router-link to="/back/article/add/">增加文章</router-link></li>
        </ol>
        <h1 class="page-header">管理 <span class="badge">7</span></h1>
        <div class="table-responsive">
          <table class="table table-striped table-hover">
            <thead>
            <tr>
              <th><span class="glyphicon glyphicon-th-large"></span> <span class="visible-lg">ID</span></th>
              <th><span class="glyphicon glyphicon-file"></span> <span class="visible-lg">问题</span></th>
              <th><span class="glyphicon glyphicon-list"></span> <span class="visible-lg">关键技术</span></th>
              <th class="hidden-sm"><span class="glyphicon glyphicon-tag"></span> <span class="visible-lg">来源</span></th>
              <th class="hidden-sm"><span class="glyphicon glyphicon-comment"></span> <span class="visible-lg">展示</span></th>
              <th><span class="glyphicon glyphicon-time"></span> <span class="visible-lg">创建时间</span></th>
              <th><span class="glyphicon glyphicon-pencil"></span> <span class="visible-lg">操作</span></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in questions">
              <td>{{ item.id }}</td>
              <td class="article-title">{{ item.title }}</td>
              <td>{{ item.pri_key }}</td>
              <td class="hidden-sm">{{ item.from_company }}</td>
              <td class="hidden-sm" v-if="item.is_show">展示</td>
              <td class="hidden-sm" v-else>不展示</td>
              <td>{{ item.create_time | formatDate }}</td>
              <td>
                <a href="update-article.html">修改</a>
                <a rel="6" @click="delete_article(item.id)" onClick="if(!confirm('是否确认删除？'))return false;">删除</a>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <footer class="message_footer">
          <nav>
            <ul class="pagination pagenav">
              <li class="disabled"><a aria-label="Previous"> <span aria-hidden="true">&laquo;</span> </a> </li>
              <!--<li class="active"><a href="#">1</a></li>-->
              <li><a v-for="i in page_number" @click="page_search(i)">{{ i }}</a></li>
              <li><a href="#" aria-label="Next"> <span aria-hidden="true">&raquo;</span> </a> </li>
            </ul>
          </nav>
        </footer>
      </form>
    </div>
  </div>
</template>

<script>
import BackHeader from './BackHeader.vue'
import BackMenu from './BackMenu.vue'

export default {
  name: 'BackArticleList',
  data () {
    return {
      is_back_header: true,
      questions: '',
      page_number: '',
      page: ''
    }
  },
  filters: {
    formatDate (time) {
      const d = new Date(time)
      const year = d.getFullYear()
      const month = d.getMonth() + 1
      const day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
      const hour = d.getHours()
      const minutes = d.getMinutes()
      const seconds = d.getSeconds()
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
    }
  },
  components: {
    BackHeader,
    BackMenu
  },
  mounted () {
    const token = localStorage.getItem('token')
    if (!token) {
      this.$router.push({path: '/back/login/'})
    }
    // 获取分页页码
    this.page = this.$route.query.page
    // 如果this.page为空，则设置默认值，且默认值为1
    if (!this.page) {
      this.page = 1
    }
    this.axios.get('/api/back/questions/?token=' + token + '&page=' + this.page).then(
      res => {
        const resp = res.data
        console.log(resp)
        if (resp.code === 200) {
          // 获取返回的面试题信息
          this.questions = resp.data.results
          // 获取返回的总页码
          // ceil 取大于表达式的最小整数
          this.page_number = Math.ceil(resp.data.count / 10)
        }
      }
    ).catch(
      err => {
        alert(err)
      }
    )
  },
  methods: {
    delete_article: function (id) {
      // 获取缓存的token参数
      const token = localStorage.getItem('token')
      this.axios.delete('/api/back/questions/' + id + '/?token=' + token).then(
        res => {
          const resp = res.data
          if (resp.code === 200) {
            // 刷新当前页面，同步刷新
            this.$router.go(0)
          }
        }
      ).catch(
        err => {
          alert(err)
        }
      )
    },
    page_search: function (page) {
      // 分页功能，由于vue无法刷新当前页面，因此分页需要做跳转到空白页面，再跳转回来
      this.$router.replace({'path': '/back_blank/', query: {'page': page}})
    }
  }
}
</script>

<style scoped>
@import "../../../static/back/css/style.css";
@import "../../../static/back/css/font-awesome.min.css";
@import "../../../static/back/css/bootstrap.min.css";
.my_content {padding-top: 30px;}
body {
  color: #444;
  background-color: #EEE;
  overflow-x: hidden;
}
</style>
