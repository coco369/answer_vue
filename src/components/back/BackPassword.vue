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
        <label for="userPwd" class="sr-only">确认密码</label>
        <p :class="error_cls">{{ password2_error }}</p>
        <input type="password" id="userPwd2" name="userpwd2" v-model="passWord2" @focus="focuspassword2" class="form-control" placeholder="请输入确认密码" required autocomplete="off" maxlength="18">
        <br>
        <button class="btn btn-lg btn-primary btn-block" @click="reset_password">重设密码</button>
        <div class="footer">
          <p>
            <router-link to="/back/login/">
              回到登陆→
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
      password2_error: '',
      userName: '',
      passWord: '',
      passWord2: '',
      error_cls: 'error_color'
    }
  },
  methods: {
    // 聚焦密码事件时，清空错误信息
    focuspassword: function () {
      this.password_error = ''
    },
    focuspassword2: function () {
      this.password2_error = ''
    },
    focususername: function () {
      this.username_error = ''
    },
    reset_password: function () {
      const params = {
        username: this.userName,
        password: this.passWord,
        password2: this.passWord2
      }
      if (this.userName && this.passWord && this.passWord2) {
        this.axios.post('/api/user/user/reset_password/', params
        ).then(
          response => {
            const resp = response.data
            console.log(resp.data)
            if (resp.code === 200) {
              // 重设密码成功
              this.$router.push({path: '/back/login/'})
            }
            // 账号不存在
            if (resp.code === 1005) {
              this.username_error = resp.msg
            }
            // 密码错误
            if (resp.code === 1006) {
              this.password_error = resp.msg
            }
            // 字段校验错误
            if (resp.code === 1007) {
              if (resp.data.error) {
                // 判断是否有错误信息
                if (resp.data.error.username) {
                  this.username_error = resp.data.error.username[0]
                }
                if (resp.data.error.password) {
                  this.password_error = resp.data.error.password[0]
                }
                if (resp.data.error.password2) {
                  this.password2_error = resp.data.error.password2[0]
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
