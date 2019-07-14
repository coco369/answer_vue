<template>
  <div>
    <remote-js src="/static/back/js/jquery-1.11.1.min.js"></remote-js>
    <remote-js src="/static/back/js/html5shiv.min.js"></remote-js>
    <remote-js src="/static/back/js/respond.min.js"></remote-js>
    <remote-js src="/static/back/js/selectivizr-min.js"></remote-js>
    <remote-js src="/static/back/js/bootstrap.min.js"></remote-js>
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
              <li class="dropdown"> <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{ username }} <span class="caret"></span></a>
                <ul class="dropdown-menu dropdown-menu-left">
                  <li><a title="查看或修改个人信息" data-toggle="modal" data-target="#seeUserInfo">个人信息</a></li>
                  <li><a title="查看您的登录记录" data-toggle="modal" data-target="#seeUserLoginlog">登录记录</a></li>
                </ul>
              </li>
              <li><a @click="logout()" onClick="if(!confirm('是否确认退出？'))return false;">退出登录</a></li>
            </ul>
          </div>
        </div>
        <!--个人信息模态框-->
        <div class="modal fade" id="seeUserInfo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  <h4 class="modal-title" >个人信息</h4>
                </div>
                <div class="modal-body">
                  <table class="table" style="margin-bottom:0px;">
                    <thead>
                    <tr> </tr>
                    </thead>
                    <tbody>
                    <!--<tr>-->
                      <!--<td wdith="20%">姓名:</td>-->
                      <!--<td width="80%"><input type="text" value="" class="form-control" name="truename" maxlength="10" autocomplete="off" /></td>-->
                    <!--</tr>-->
                    <tr>
                      <td wdith="20%">账号:</td>
                      <td width="80%"><input type="text" v-model="username" disabled class="form-control" name="username" maxlength="10" autocomplete="off" /></td>
                    </tr>
                    <!--<tr>-->
                      <!--<td wdith="20%">电话:</td>-->
                      <!--<td width="80%"><input type="text" value="" class="form-control" name="usertel" maxlength="13" autocomplete="off" /></td>-->
                    <!--</tr>-->
                    <tr>
                      <td wdith="20%">旧密码:</td>
                      <td width="80%"><input type="password" class="form-control" v-model="old_password" name="old_password" maxlength="18" autocomplete="off" /></td>
                    </tr>
                    <tr>
                      <td wdith="20%">新密码:</td>
                      <td width="80%"><input type="password" class="form-control" v-model="password" name="password" maxlength="18" autocomplete="off" /></td>
                    </tr>
                    <tr>
                      <td wdith="20%">确认密码:</td>
                      <td width="80%"><input type="password" class="form-control" v-model="new_password" name="new_password" maxlength="18" autocomplete="off" /></td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr></tr>
                    </tfoot>
                  </table>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                  <button type="button" @click="reset_password" class="btn btn-primary">提交</button>
                </div>
              </div>
          </div>
        </div>
        <!--个人登录记录模态框-->
        <div class="modal fade" id="seeUserLoginlog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" >登录记录</h4>
              </div>
              <div class="modal-body">
                <table class="table" style="margin-bottom:0px;">
                  <thead>
                  <tr>
                    <th>登录IP</th>
                    <th>登录时间</th>
                    <th>状态</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in user_login">
                      <td>{{ item.l_ip }}</td>
                      <td>{{ item.create_time }}</td>
                      <td>{{ item.status }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">朕已阅</button>
              </div>
            </div>
          </div>
        </div>

      </nav>
      </header>
  </div>
</template>

<script>
export default {
  name: 'Common',
  data () {
    return {
      username_error: '',
      old_password_error: '',
      password_error: '',
      username: '',
      old_password: '',
      password: '',
      new_password: '',
      token: '',
      user_login: ''
    }
  },
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
    },
    // 修改密码
    reset_password: function () {
      const params = {
        username: this.username,
        password: this.old_password,
        password2: this.password
      }
      // 老密码不存在
      if (!this.old_password) {
        this.$message({
          message: '旧密码必填',
          type: 'warning'
        })
        return
      }
      // 新密码不存在
      if (!this.password) {
        this.$message({
          message: '新密码必填',
          type: 'warning'
        })
        return
      }
      // 新确认密码不存在
      if (!this.new_password) {
        this.$message({
          message: '新确认密码必填',
          type: 'warning'
        })
        return
      }
      // 判断新密码和确认密码是否一致
      if (this.password && this.new_password) {
        if (this.password !== this.new_password) {
          this.$message({
            message: '新密码错误，请重新确认',
            type: 'error'
          })
          return
        }
      }
      // 如果账号密码以及新密码都存在，则提交ajax请求，实现修改账号密码
      if (this.username && this.old_password && this.password && this.new_password) {
        this.axios.post('/api/user/user/reset_password/', params
        ).then(
          response => {
            const resp = response.data
            console.log(resp.data)
            if (resp.code === 200) {
              // 重设密码成功
              this.$router.push({path: '/back/login/'})
            } else {
              this.$message({
                message: resp.msg,
                type: 'error'
              })
            }
          }
        ).catch(error => {
          alert(error)
        })
      }
    }
  },
  mounted () {
    // 获取用户登陆标示token值
    this.token = localStorage.getItem('token')
    if (!this.token) {
      this.$router.push({path: '/back/login/'})
    }
    // 获取用户的登陆信息
    this.username = localStorage.getItem('username')
    // 获取用户的登陆记录
    this.axios.get('/api/user/user/record/?token=' + this.token).then(
      res => {
        const resp = res.data
        if (resp.code === 200) {
          console.log(resp)
          this.user_login = resp.data.user_login
          localStorage.setItem('login_count', resp.data.count)
          localStorage.setItem('last_ip', resp.data.last_ip)
          localStorage.setItem('last_login_time', resp.data.last_time)
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
</style>
