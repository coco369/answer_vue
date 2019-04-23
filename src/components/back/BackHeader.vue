<template>
  <div>
    <remote-js src="/static/back/js/jquery-1.11.1.min.js"></remote-js>
    <remote-js src="/static/back/js/html5shiv.min.js"></remote-js>
    <remote-js src="/static/back/js/respond.min.js"></remote-js>
    <remote-js src="/static/back/js/selectivizr-min.js"></remote-js>
    <remote-js src="/static/back/js/bootstrap.min.j"></remote-js>
    <remote-js src="/static/back/js/admin-scripts.js"></remote-js>
    <header>
      <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false"> <span class="sr-only">切换导航</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button>
            <a class="navbar-brand" href="/">YlsatCMS</a> </div>
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right">
              <!--<li><a href="">消息 <span class="badge">1</span></a></li>-->
              <li class="dropdown"> <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">admin <span class="caret"></span></a>
                <ul class="dropdown-menu dropdown-menu-left">
                  <li><a title="查看或修改个人信息" data-toggle="modal" data-target="#seeUserInfo">个人信息</a></li>
                  <li><a title="查看您的登录记录" data-toggle="modal" data-target="#seeUserLoginlog">登录记录</a></li>
                </ul>
              </li>
              <li><a @click="logout()" onClick="if(!confirm('是否确认退出？'))return false;">退出登录</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Common',
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
  methods: {
    // 注销功能，删除前端存储的token参数
    logout: function () {
      localStorage.removeItem('token')
      this.$router.push({path: '/back/login/'})
    }
  }
}
</script>

<style>
@import "../../../static/back/css/style.css";
@import "../../../static/back/css/font-awesome.min.css";
@import "../../../static/back/css/bootstrap.min.css";
body {
  color: #444;
  background-color: #EEE;
  overflow-x: hidden;
}
</style>
