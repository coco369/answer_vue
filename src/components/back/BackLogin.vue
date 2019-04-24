<template>
  <div :class="login_div">
    <div class="container">
      <div class="siteIcon"><img src="/static/back/images/icon/icon.png" alt="" data-toggle="tooltip" data-placement="top" title="欢迎使用异清轩博客管理系统" draggable="false" /></div>
      <div class="form-signin">
        <h2 class="form-signin-heading">管理员登录</h2>
        <label for="userName" class="sr-only">用户名</label>
        <p :class="error_cls">{{ username_error }}</p>
        <input type="text" id="userName" name="username" v-model="userName" @focus="focususername" class="form-control" placeholder="请输入用户名" required autofocus autocomplete="off" maxlength="10">
        <label for="userPwd" class="sr-only">密码</label>
        <p :class="error_cls">{{ password_error }}</p>
        <input type="password" id="userPwd" name="userpwd" v-model="passWord" @focus="focuspassword" class="form-control" placeholder="请输入密码" required autocomplete="off" maxlength="18">
        <button class="btn btn-lg btn-primary btn-block" @click="login">登录</button>
        <div class="footer">
          <p>
            <router-link to="/back/index/">
              回到后台 →
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BackLogin',
  data () {
    return {
      login_div: 's_login',
      username_error: '',
      password_error: '',
      userName: '',
      passWord: '',
      error_cls: 'error_color'
    }
  },
  methods: {
    // 聚焦密码事件时，清空错误信息
    focuspassword: function () {
      this.password_error = ''
    },
    focususername: function () {
      this.username_error = ''
    },
    login: function () {
      const params = {
        username: this.userName,
        password: this.passWord
      }
      if (this.userName && this.passWord) {
        this.axios.post('/api/user/user/login/', params
        ).then(
          response => {
            const resp = response.data
            console.log(resp.data)
            if (resp.code === 200) {
              // 将后端返回的token值进行前端存储
              const token = resp.data['token']
              localStorage.setItem('token', token)
              // 将后端返回的用户名信息进行前端存储
              const username = resp.data['username']
              localStorage.setItem('username', username)
              this.$router.push({path: '/back/index/'})
            }
            if (resp.code === 1001) {
              this.username_error = resp.msg
            }
            if (resp.code === 1002) {
              if (resp.data.error) {
                // 判断是否有错误信息
                if (resp.data.error.username) {
                  this.username_error = resp.data.error.username[0]
                }
                if (resp.data.error.password) {
                  this.password_error = resp.data.error.password[0]
                }
              } else {
                this.username_error = resp.msg
              }
            }
          }
        ).catch(error => {
          alert(error)
        })
      }
    }
  }
}
</script>

<style scoped>
  @import "../../../static/back/css/login.css";
  @import "../../../static/back/css/style.css";
  @import "../../../static/back/css/bootstrap.min.css";

  .s_login {background-color: #EEE; width: 100%; height: 100%; position: fixed; padding-left: 0px;}
  .error_color {
    color: red;
  }
</style>
