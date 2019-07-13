<template>
  <div>
    <common></common>
    <div class="page-container">
      <div class="container">
        <div class="row">

          <!-- start of page content -->
          <div class="span8 main-listing">

            <article v-for="item in questions" class="format-standard type-post hentry clearfix">

              <header class="clearfix">

                <h3 class="post-title">
                  <router-link :to="{ name: 'article_detail', params: {id: item.id}}">{{ item.title }}</router-link>
                </h3>

                <div class="post-meta clearfix">
                  <span class="date">{{ item.create_time | formatDate }}</span>
                  <span class="category"><a href="#">{{ questions.pri_key }}</a></span>
                  <span class="like-count" @click="agree(item)">{{ item.is_like }}</span>
                </div><!-- end of post meta -->

              </header>

              <div v-html="item.answer.slice(0,50)"></div>
              <div>................</div>
              <router-link class="readmore-link" :to="{ name: 'article_detail', params: {id: item.id}}">Read more</router-link>
            </article>
            <div id="pagination">
              <a class="btn" v-for="i in page"  @click="searchPage(i)" >{{ i }}</a>
              <!--<a href="#" class="btn">Last »</a>-->
              <!--<a href="#" class="btn">Next »</a>-->
            </div>

          </div>
          <!-- end of page content -->

          <!-- start of sidebar -->
          <aside class="span4 page-sidebar">

            <section class="widget">
              <div class="support-widget">
                <h3 class="title">技术支持</h3>
                <p class="intro">需要更多面试题? 如果不能搜索到相关面试题，可以联系项目负责人.</p>
              </div>
            </section>

            <!--<section class="widget">-->
              <!--<div class="quick-links-widget">-->
                <!--<h3 class="title">Quick Links</h3>-->
                <!--<ul id="menu-quick-links" class="menu clearfix">-->
                  <!--<li><a href="index-2.html">Home</a></li>-->
                  <!--<li><a href="articles-list.html">Articles List</a></li>-->
                  <!--<li><a href="faq.html">FAQs</a></li>-->
                  <!--<li><a href="contact.html">Contact</a></li>-->
                <!--</ul>-->
              <!--</div>-->
            <!--</section>-->

            <!--<section class="widget"><h3 class="title">Categories</h3>-->
              <!--<ul>-->
                <!--<li><a href="#" title="Lorem ipsum dolor sit amet,">Advanced Techniques</a> </li>-->
              <!--</ul>-->
            <!--</section>-->

            <!--<section class="widget">-->
              <!--<h3 class="title">Recent Comments</h3>-->
              <!--<ul id="recentcomments">-->
                <!--<li class="recentcomments"><a href="#" rel="external nofollow" class="url">John Doe</a> on <a href="#">Integrating WordPress with Your Website</a></li>-->
              <!--</ul>-->
            <!--</section>-->

          </aside>
          <!-- end of sidebar -->
        </div>
      </div>
    </div>
    <footers></footers>
  </div>
</template>

<script>
import common from './Common.vue'
import footers from './Footer.vue'
import Vue from 'vue'
export default {
  name: 'ArticleList',
  components: {
    common,
    footers
  },
  data () {
    return {
      questions: '',
      page: '',
      current_page: ''
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
  mounted () {
    // 获取搜索框中到搜索内容和页码
    const wd = this.$route.query.wd
    this.current_page = this.$route.query.page
    // 判断wd参数，如果wd参数为空则表示获取全部的面试题信息
    // 如果wd参数有值，则表示获取搜索后的面试题信息
    if (wd) {
      // 点击搜索时执行的方法
      // 使用异步async await操作进行数据的获取
      this.common.search(this, wd, this.current_page).then(
        result => {
          this.questions = result
        }
      )
    } else {
      // 面试题列表页面的数据初始化请求
      this.axios.get('/api/web/questions/?page=' + this.current_page).then(
        res => {
          const resp = res.data
          if (resp.code === 200) {
            this.questions = resp.data.results
            this.page = Math.ceil(resp.data.count / 10)
          }
        }
      )
    }
  },
  methods: {
    agree: function (item) {
      this.axios.post('/api/web/questions/' + item.id + '/agree/').then(
        res => {
          const resp = res.data
          if (resp.code === 200) {
            // 局部刷新数据，修改当前item中is_like的属性值
            Vue.set(item, 'is_like', resp.data.is_like)
          } else {
            this.$message({
              message: resp.msg,
              type: 'warning'
            })
          }
        }
      ).catch(
        err => {
          alert(err)
        }
      )
    },
    searchPage: function (page) {
      // 点击搜索时，跳转到空白页面，空白页面再跳转到文章列表页面
      this.$router.replace({'path': '/blank/', query: {'wd': this.wd, 'page': page}})
    }
  }
}
</script>

<style scoped>

</style>
