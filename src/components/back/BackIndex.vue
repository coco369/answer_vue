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
              <h4>文章</h4>
              <span class="text-muted">0 条</span> </div>
            <!--<div class="col-xs-6 col-sm-3 placeholder">-->
              <!--<h4>评论</h4>-->
              <!--<span class="text-muted">0 条</span> </div>-->
            <div class="col-xs-6 col-sm-3 placeholder">
              <h4>访问量</h4>
              <span class="text-muted">0</span> </div>
          </div>
          <h1 class="page-header">状态</h1>
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <tbody>
              <tr>
                <td>登录者: <span>admin</span>，这是您第 <span>13</span> 次登录</td>
              </tr>
              <tr>
                <td>上次登录时间: 2016-01-08 15:50:28 , 上次登录IP: ::1:55570</td>
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
      is_back_header: true
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
  }
}
</script>

<style scoped>
.my_content {padding-top: 70px;}
</style>
