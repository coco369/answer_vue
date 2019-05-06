<template>
  <div>
    <aside class="col-sm-3 col-md-2 col-lg-2 sidebar">
      <ul class="nav nav-sidebar" v-for="(item, index) in menu">
        <li v-bind:class="{'active': item.isActive}" @click="changeMenu(index)">
          <router-link :to="item.purl">{{ item.name }}</router-link>
        </li>
      </ul>
      <!--<ul class="nav nav-sidebar">-->
        <!--<li><router-link to="/back/article/">文章</router-link></li>-->
        <!--后期制作公告功能，用于推送最新面试信息给关注了公众号的用户-->
        <!--<li><a href="notice.html">公告</a></li>-->
      <!--</ul>-->
      <!--<ul class="nav nav-sidebar">-->
        <!--<li><a class="dropdown-toggle" id="userMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">用户</a>-->
        <!--</li>-->
      <!--</ul>-->
      <!--<ul class="nav nav-sidebar">-->
        <!--<li>-->
          <!--<a class="dropdown-toggle" id="settingMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">设置</a>-->
        <!--</li>-->
      <!--</ul>-->
    </aside>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'BackMenu',
  data () {
    return {
      menu: [
        {name: '报告', isActive: false, purl: '/back/index/'},
        {name: '文章', isActive: false, purl: '/back/article/'}
      ]
    }
  },
  methods: {
    changeMenu: function (index) {
      // 先将所有的isActive都值为false
      for (var a in this.menu) {
        Vue.set(this.menu[a], 'isActive', false)
      }
      // 根据路由地址进行判断是否修改isActive
      const path = this.$route.path
      if (path === '/back/index/') {
        Vue.set(this.menu[0], 'isActive', true)
      }
      if (path === '/back/article/' | path === '/back/article/add/') {
        Vue.set(this.menu[1], 'isActive', true)
      }

      // Vue.set(this.menu[index], 'isActive', true)
    }
  },
  mounted () {
    // 先将所有的isActive都值为false
    for (var a in this.menu) {
      Vue.set(this.menu[a], 'isActive', false)
    }
    // 根据路由地址进行判断是否修改isActive
    const path = this.$route.path
    if (path === '/back/index/') {
      Vue.set(this.menu[0], 'isActive', true)
    }
    if (path === '/back/article/' | path === '/back/article/add/') {
      Vue.set(this.menu[1], 'isActive', true)
    }
  }
}
</script>

<style scoped>
@import "../../../static/back/css/style.css";
@import "../../../static/back/css/font-awesome.min.css";
@import "../../../static/back/css/bootstrap.min.css";
body {
  color: #444;
  background-color: #EEE;
  overflow-x: hidden;
}
</style>
