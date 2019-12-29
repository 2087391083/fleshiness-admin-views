<template>
  <div class="main">
    <div class="main-head">
      <navhead></navhead>
    </div>
    <div class="main-center">
      <el-tabs :tab-position="tabPosition">
        <el-tab-pane index="1" label="商品信息">
          <selectview></selectview>
        </el-tab-pane>
        <el-tab-pane index="2" label="新增商品">
          <addview></addview>
        </el-tab-pane>
        <el-tab-pane index="3" label="公告">
          <gonggaoview></gonggaoview>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="main-button">
      <navfoot></navfoot>
    </div>
  </div>
</template>
<style>
.el-tabs__nav-scroll {
  overflow: hidden;
}
.el-tabs__content {
  height: 95%;
  width: calc(100% - 220px);
  box-sizing: border-box;
  margin: 11px 10px;
  padding: 15px;
  border-radius: 15px;
  border: 1px solid black;
  overflow: scroll;
}
.el-tabs__content::-webkit-scrollbar {
  width: 0 !important;
}
[class^="el-icon-"] {
  color: black;
}
.main {
  height: 100%;
  width: 100%;
  position: absolute;
}
.main-center {
  height: 100%;
  min-height: 400px;
  width: 100%;
}
.el-tabs--left {
  height: 100%;
}
.el-tabs--left .el-tabs__header.is-left {
  width: 200px;
  height: 100%;
  background-color: rgba(95, 159, 214, 0.816);
}
.el-tabs__item:hover {
  color: rgb(255, 255, 255);
  background-color: rgba(79, 27, 13, 0.353);
}
.el-tabs__item.is-active {
  color: rgb(255, 255, 255);
  background-color: rgba(79, 27, 13, 0.442);
}
.el-tabs__item {
  color: white;
}
.el-tabs__active-bar {
  background-color: rgb(250, 63, 11);
}
</style>
<script>
export default {
  data() {
    return {
      tabPosition: "left"
    };
  },
  components: {
    navhead: resolve => {
      require(["../common/navbar"], resolve);
    },
    navfoot: resolve => {
      require(["../common/bottom"], resolve);
    },
    addview: resolve => {
      require(["../center/userdom/addkinds"], resolve);
    },
    selectview: resolve => {
      require(["../center/userdom/selectview"], resolve);
    },
    gonggaoview: resolve => {
      require(["../center/userdom/gonggaoview"], resolve);
    }
  }
};
</script>