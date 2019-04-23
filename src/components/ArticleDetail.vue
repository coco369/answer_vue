<template>
  <div>
    <common></common>
    <div class="page-container">
      <div class="container">
        <div class="row">
          <div class="span8 main-listing">
            <article class="format-standard type-post hentry clearfix">
              <header class="clearfix">
                <h3 class="post-title">
                  <router-link :to="{ name: 'article_detail', params: {id: questions.id}}">{{ questions.title }}</router-link>
                </h3>
                <div class="post-meta clearfix">
                  <span class="date">{{ questions.create_time | formatDate }}</span>
                  <span class="category"><a href="#">{{ questions.pri_key }}</a></span>
                  <span class="like-count" @click="agree(questions)">{{ questions.is_like }}</span>
                </div><!-- end of post meta -->
              </header>
              <p>
                {{ questions.answer }}
                <!--<a class="readmore-link" href="">Read more</a>-->
              </p>
            </article>
            <!--先不做上一页下一页的按钮功能-->
            <!--<div id="pagination">-->
              <!--<a href="#" class="btn">Next »</a>-->
              <!--<a href="#" class="btn">Last »</a>-->
            <!--</div>-->

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
      questions: ''
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
    // 获取路由中动态的id值
    const id = this.$route.params.id
    this.axios.get('/api/web/questions/' + id + '/').then(
      res => {
        const resp = res.data
        this.questions = resp.data
      }
    ).catch(
      err => {
        alert(err)
      }
    )
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
    }
  }
}
</script>

<style scoped>

</style>
