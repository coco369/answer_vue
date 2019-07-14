<template>
  <div>
    <BackHeader></BackHeader>
    <section class="container-fluid">
      <div class="row">
        <BackMenu></BackMenu>
        <div class="col-md-offset-2 main my_content">
        <!--<div class="col-sm-9 col-sm-offset-3 col-md-10 col-lg-10 col-md-offset-2 main" id="main">-->
          <h1 class="page-header">信息总览</h1>
          <div class="row placeholders" style="height:90px;">
            <div class="col-xs-6 col-sm-3 placeholder">
              <h4>面试题</h4>
              <span class="text-muted">{{ count }} 条</span> </div>
            <!--<div class="col-xs-6 col-sm-3 placeholder">-->
              <!--<h4>评论</h4>-->
              <!--<span class="text-muted">0 条</span> </div>-->
            <div class="col-xs-6 col-sm-3 placeholder">
              <h4>今日访问量</h4>
              <span class="text-muted">{{ visit_count }}</span> </div>
          </div>
          <h1 class="page-header">状态</h1>
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <tbody>
              <tr>
                <td>登录者: <span>{{ username }}</span>，这是您第 <span>{{ login_count }}</span> 次登录</td>
              </tr>
              <tr>
                <td>上次登录时间: {{ last_time }} , 上次登录IP: {{ last_ip }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import BackHeader from './BackHeader.vue'
import BackMenu from './BackMenu.vue'
export default {
  name: 'Index',
  data () {
    return {
      is_back_header: true,
      count: 0,
      token: '',
      username: '',
      login_count: '',
      last_ip: '',
      last_time: '',
      visit_count: ''
    }
  },
  components: {
    BackHeader,
    BackMenu
  },
  mounted () {
    // 判断前端是否存储了token值
    this.token = localStorage.getItem('token')
    if (!this.token) {
      this.$router.push({path: '/back/login/'})
    }
    // 获取当前登陆系统用户信息
    this.username = localStorage.getItem('username')
    // 获取登陆次数和最后一次登陆IP地址信息
    this.login_count = localStorage.getItem('login_count')
    this.last_ip = localStorage.getItem('last_ip')
    this.last_time = localStorage.getItem('last_login_time')
    // 获取面试题的数量
    this.axios.get('/api/back/questions/count/?token=' + this.token).then(
      res => {
        const resp = res.data
        if (resp.code === 200) {
          // 获取后端返回的面试题数量
          this.count = resp.data.count
        }
      }
    )
    // 获取今日访问量
    this.axios.get('/api/back/visit/?token=' + this.token).then(
      res => {
        const resp = res.data
        if (resp.code === 200) {
          this.visit_count = resp.data.today_visit
        }
      }
    )
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
.my_content {padding-top: 70px;}
</style>
