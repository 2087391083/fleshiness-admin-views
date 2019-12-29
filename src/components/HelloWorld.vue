<template>
  <div id="main">
	<div v-if="!islogin">
		<loginview></loginview>
	</div>
  </div>
</template>

<script>
import store from '../store/stroeindex'
export default {
  name: "HelloWorld",
  components: {
    loginview: resolve => {
      require(["./login/login"], resolve);
    }
  },
  data() {
	  return {
		  islogin:''
	  }
  },
  created() {
	  console.log(store.state.loginview)
	  this.islogin = store.state.loginview
  },
};
</script>
<style>
#main {
  position: absolute;
  top: 0;
  left: 0%;
  width: 100%;
  height: 100%;
  z-index: 1;
}

