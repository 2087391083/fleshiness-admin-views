<template>
  <div id="login">
    <canvas id="c"></canvas>
    <backView></backView>
    <div class="boardLogin">
      <a href="#" class="logo">
        <img src="../../assets/img/logo.png" alt />
      </a>
      <form id="loginfrom">
        <div class="inpGroup">
          <span class="icon loginIco1"></span>
          <el-input class="myinput" v-model="loginuser.id" placeholder="请输入您的用户名" clearable></el-input>
        </div>
        <div class="prompt"></div>

        <div class="inpGroup">
          <span class="icon loginIco2"></span>
          <el-input class="myinput" placeholder="请输入您的密码" v-model="loginuser.password" show-password></el-input>
        </div>
        <div class="prompt"></div>
        <button class="login" type="button" @click="login()">登录</button>
      </form>
    </div>
  </div>
</template>

<script>
import HTTP from "../fetch/api";
import store from "../../store/stroeindex";
export default {
  name: "HelloWorld",
  components: {
    backView: resolve => {
      require([".././common/background"], resolve);
    }
  },
  data() {
    return {
      loginuser:{
        id: "",
        password: ""
      }
    };
  },
  methods: {
    login: function() {
      // if((/^(?=.*\d+)(?=.*_+)(?=.*[a-zA-Z]+)(?=*\W+).{6,16}$/igm).test(this.password)){
      //   this.$notify.error({
      //     title: "错误",
      //     message: "密码不和规矩"
      //   });
      // }
      if (this.loginuser.id == "" || this.loginuser.password == "") {
        this.$notify.error({
          title: "错误",
          message: "请输入账号密码"
        });
      } else {
        HTTP.postData("/BackEndServer/autologin", {
          id: this.loginuser.id,
          password: this.loginuser.password
        }).then(res => {
          console.log(res)
          if (res.ok) {
            this.$notify({
              title: "成功",
              message: "登陆成功！",
              type: "success"
            });
            sessionStorage.setItem('nickname',res.userview[0].nickname);
            sessionStorage.setItem('avatar',res.userview[0].avatar);
            store.state.loginview = res.userview;
            this.$router.push({ path: "/main" });
          } else {
            this.$notify.error({
              title: "错误",
              message: "账号或者密码错误！"
            });
          }
        });
      }
    }
  }
};
</script>
<style>
#login {
  position: absolute;
  top: 0;
  left: 0%;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.myinput{
  width: 100%;
}
.boardLogin {
  width: 16.8%;
  min-width: 200px;
  margin: 0 auto;
  position: relative;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -moz-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  -o-transform: translateY(-50%);
  transform: translateY(-50%);
}
.boardLogin .logo {
  display: block;
  margin-bottom: 40px;
  text-align: center;
}
.boardLogin .logo img {
  width: 100%;
  max-width: 326px;
}

.boardLogin .inpGroup {
  height: 30px;
  padding: 8px 24px 8px 52px;
  background: #2a658a;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  position: relative;
}
.boardLogin .inpGroup .icon {
  display: block;
  width: 20px;
  height: 20px;
  position: absolute;
  top: 14px;
  left: 24px;
}
.boardLogin .inpGroup span.loginIco1 {
  background: url(../../assets/img/pic1.png);
}
.boardLogin .inpGroup span.loginIco2 {
  background: url(../../assets/img/pic2.png);
}
.boardLogin .inpGroup input {
  display: block;
  width: 100%;
  height: 30px;
  line-height: 30px;
  color: #fff;
  background-color: transparent;
  border: 0px;
}
.boardLogin .inpGroup input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #fff;
  opacity: 1;
}

.boardLogin .inpGroup input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #fff;
  opacity: 1;
}

.boardLogin .inpGroup input:-ms-input-placeholder {
  color: #fff;
  opacity: 1;
}

.boardLogin .inpGroup input::-webkit-input-placeholder {
  color: #fff;
  opacity: 1;
}
.boardLogin .prompt {
  min-height: 20px;
  padding: 5px 24px 10px 24px;
}
.boardLogin p {
  line-height: 16px;
  font-size: 12px;
  display: none;
}
.boardLogin p.error {
  color: #f60;
}
.boardLogin p.success {
  color: #449d44;
}
.boardLogin .login {
  width: 100%;
  box-sizing: border-box;
  display: block;
  height: 40px;
  line-height: 38px;
  text-align: center;
  border: 1px solid #01d1f2;
  border-radius: 20px;
  color: #fff;
  cursor: pointer;
  background-color: transparent;
}
.boardLogin .login:hover {
  background: #01d1f2;
}
</style>
