<template>
  <div>
    <remote-js src="/static/js/jquery-1.8.3.min.js"></remote-js>
    <remote-js src="/static/js/jquery.easing.1.3.js"></remote-js>
    <remote-js src="/static/js/prettyphoto/jquery.prettyPhoto.js"></remote-js>
    <remote-js src="/static/js/jflickrfeed.js"></remote-js>
    <remote-js src="/static/js/jquery.liveSearch.js"></remote-js>
    <remote-js src="/static/js/jquery.form.js"></remote-js>
    <remote-js src="/static/js/jquery.validate.min.js"></remote-js>
    <remote-js src="/static/js/custom.js"></remote-js>
    <div class="header-wrapper">
      <header>
        <div class="container">
          <div class="logo-container">
            <!-- Website Logo -->
            <router-link to="/"  title="面试搜索引擎">
              <img src="/static/images/logo.png" alt="面试搜索引擎">
            </router-link>
            <span class="tag-line">面试搜索引擎</span>
          </div>
          <!-- Start of Main Navigation -->
          <nav class="main-nav">
            <div class="menu-top-menu-container">
              <ul id="menu-top-menu" class="clearfix">
                <!--<li><router-link to="/article_list/">面试列表</router-link></li>-->
                <li><a @click="search">面试列表</a></li>
                <!--<li><a href="#">面试宝典</a>-->
                  <!--<ul class="sub-menu">-->
                    <!--<li><a href="full-width.html">Python宝典</a></li>-->
                    <!--<li><a href="elements.html">Redis宝典</a></li>-->
                    <!--<li><a href="page.html">MongoDB宝典</a></li>-->
                    <!--<li><a href="page.html">Linux宝典</a></li>-->
                  <!--</ul>-->
                <!--</li>-->
                <li><router-link to='/contact/'>关于我</router-link></li>
                <!--<li><router-link to='/back/index/'>后台</router-link></li>-->
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </div>
    <div class="search-area-wrapper">
      <div class="search-area container">
        <h3 class="search-header">有面试问题?</h3>
        <p class="search-tag-line">如果你有面试问题，可以试试搜索功能!</p>

        <div class="search-form clearfix">
          <input class="search-term required" type="text" v-model="wd" placeholder="猪儿～输入关键字啦" />
          <input class="search-btn" type="text" @click="search" value="搜索" :class="search_btn"/>
          <div id="search-error-container"></div>
        </div>
      </div>
    </div>
    <remote-js></remote-js>
  </div>
</template>

<script>
export default {
  name: 'common',
  components: {
    'remote-js': {
      render (createElement) {
        return createElement(
          'script',
          {
            attrs: {
              type: 'text/javascript',
              src: this.src
            }
          }
        )
      }
    }
  },
  data () {
    return {
      wd: '',
      search_btn: 'search_btn'
    }
  },
  methods: {
    search: function () {
      // 以下的操作是点击搜索按钮时，解决页面不刷新的问题。解题思路为跳转到一个空白页面，而空白页面再立马跳转回来，即可解决页面不刷新的问题
      // 点击搜索时，跳转到空白页面，空白页面再跳转到文章列表页面
      this.$router.replace({'path': '/blank/', query: {'wd': this.wd, 'page': '1'}})
      // 点击搜索时，跳转到列表页面，并传递查询参数
      // this.$router.push({'path': '/article_list/', query: {'wd': this.wd}})
    }
  }
}
</script>
<!--scoped表示局部样式渲染-->
<style>
@import '../../static/css/bootstrap5152.css';
@import '../../static/css/responsive5152.css';
@import '../../static/css/main5152.css';

.search_btn {width:50px; margin-top:10px;}
</style>
