<template>
  <div>
    <common></common>
    <!-- Start of Page Container -->
    <div class="page-container">
      <div class="container">
        <div class="row">

          <!-- start of page content -->
          <div class="span8 page-content">

            <!-- Basic Home Page Template -->
            <div class="row separator">
              <section class="span4 articles-list">
                <h3><router-link to="/article_list">排名前十</router-link></h3>
                <ul class="articles">
                  <li class="article-entry standard" v-for="item in ranking_data">
                    <h4><router-link  :to="{ name: 'article_detail', params: {id: item.id}}">{{ item.title }}</router-link></h4>
                    <span class="article-meta">{{ item.create_time | formatDate }}
                      <a href="#">{{ item.pri_key }}</a>
                    </span>
                    <span class="like-count" @click="agree(item)">{{ item.is_like }}</span>
                  </li>
                </ul>
              </section>

              <section class="span4 articles-list">
                <h3>最新面试题</h3>
                <ul class="articles">
                  <li class="article-entry standard" v-for="new_item in new_data">
                    <h4><router-link :to="{ name: 'article_detail', params: {id: new_item.id}}">{{ new_item.title }}</router-link></h4>
                    <span class="article-meta">{{ new_item.create_time | formatDate }}
                      <a href="#">{{ new_item.pri_key }}</a>
                    </span>
                    <span class="like-count" @click="agree(new_item)">{{ new_item.is_like }}</span>
                  </li>
                </ul>
              </section>
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

            <!--<section class="widget">-->
              <!--<h3 class="title">Tags</h3>-->
              <!--<div class="tagcloud">-->
                <!--<a href="#" class="btn btn-mini">basic</a>-->
                <!--<a href="#" class="btn btn-mini">beginner</a>-->
              <!--</div>-->
            <!--</section>-->

          </aside>
          <!-- end of sidebar -->
        </div>
      </div>
    </div>
    <!-- Start of Footer -->
    <footers></footers>
  </div>
</template>

<script>
import common from './Common.vue'
import footers from './Footer.vue'
import Vue from 'vue'
export default {
  name: 'index',
  data () {
    return {
      msg: 'test',
      ranking_data: '',
      new_data: ''
    }
  },
  components: {
    common,
    footers
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
    // 获取排名前十的数据
    this.axios.get('/api/web/questions/ranking/').then(
      res => {
        const resp = res.data
        if (resp.code === 200) {
          this.ranking_data = resp.data
        }
      }
    ).catch(
      err => {
        alert(err)
      }
    )
    // 获取最新面试题数据
    this.axios.get('/api/web/questions/new/').then(
      res => {
        const resp = res.data
        if (resp.code === 200) {
          this.new_data = resp.data
        }
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

<style lang="css">
</style>
