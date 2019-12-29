<template>
  <div class="navbar cf">
    <div class="navbar-left fl">
      <img src="../../assets/img/logopic.png" alt />
    </div>
    <div class="navbar-right fl">
      <div class="usertap cf">
        <img v-bind:src="avator" class="fl" />
        <div class="view fl">
          <span>你好管理员：{{nickname}}</span>
          <el-divider direction="vertical"></el-divider>
          <span class="head">设置</span>
          <el-divider direction="vertical"></el-divider>
          <span @click="logout" class="head">退出</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../store/stroeindex";
export default {
  name: "navbar",
  data() {
    return {
      nickname: "",
      avator: ""
    };
  },
  methods: {
    logout: function() {
      sessionStorage.setItem("avatar", "");
      sessionStorage.setItem("nickname", "");
      this.$router.push("/");
    }
  },
  created() {
    if (sessionStorage.getItem("nickname")) {
      this.nickname = sessionStorage.getItem("nickname");
      this.avator = sessionStorage.getItem("avatar");
      console.log(this.avator);
    } else {
      this.$router.push("/");
    }
  }
};
</script>
<style>
.fl {
  float: left;
}
.head {
  cursor: pointer;
}
.view{
  height: 100%;
  line-height: 30px;
  margin: 0 10px;
}
.cf {
  content: "";
  display: block;
  clear: both;
}
.navbar {
  height: 100px;
  width: 100%;
  box-sizing: border-box;
  background-image: url(../../assets/img/back.jpg);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.navbar-left {
  height: 100%;
  width: 500px;
}
.navbar-left img {
  width: 100%;
  margin-top: 20px;
  margin-left: 20px;
}
.navbar-right {
  height: 100%;
  width: calc(100% - 500px);
}
.el-tabs--left {
  background-color: rgb(239, 239, 241);
  min-width: 1000px;
}
.usertap {
  width: auto;
  float: right;
  text-align: right;
  height: 45px;
  text-align: right;
  padding: 10px 35px;
  box-sizing: border-box;
  margin-top: 55px;
  border-radius: 20px;
  background-color: rgba(37, 157, 231, 0.6);
}
.usertap img {
  height: 30px;
  width: 30px;
  border-radius: 50%;
}
</style>
