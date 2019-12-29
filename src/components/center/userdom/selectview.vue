<template>
  <div class="center">
    <dir v-if="changeid">
      <changeview :changeid="changeid" v-on:getback="childback"></changeview>
    </dir>
    <div v-if="!changeid" class="add">
      <div class="selectview">
        <div class="bigfont">商品信息管理</div>
        <div class="select">
          <el-input v-model="selectid" placeholder="请输入商品id" @change="change"></el-input>或
          <el-input v-model="selectname" placeholder="请输入商品名称" @change="change"></el-input>
          <el-button type="primary" @click="getviews">查询商品</el-button>
        </div>
        <el-button type="success" @click="getviews">刷新</el-button>
      </div>
      <div class="showtable">
        <table>
          <tr class="toptr">
            <td>商品编号</td>
            <td>商品名称</td>
            <td>商品种类</td>
            <td>商品图片</td>
            <td>商品价格</td>
            <td>修改</td>
            <td>删除</td>
          </tr>
          <tr v-for="(item, index) in selectview" :key="index">
            <td>{{item.pid}}</td>
            <td v-html="$options.filters.repalcename(item.pname,selectname)"></td>
            <td>{{item.kidnsname}}</td>
            <td>
              <img v-bind:src="item.imgsrc" />
            </td>
            <td>{{item.price}}</td>
            <td>
              <el-button type="info" @click="updateone(item.pid)">修改</el-button>
            </td>
            <td>
              <el-button type="danger" @click="deleteone(item.pid)">删除</el-button>
            </td>
          </tr>
        </table>
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="page"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="alllength"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HTTP from "../../fetch/api";
export default {
  data() {
    return {
      changeid: 0,
      selectid: "",
      selectname: "",
      selectview: [],
      page: 1,
      alllength: 0
    };
  },
  filters: {
    repalcename: function(str, kw) {
      if (!kw) {
        return str;
      }
      return str.replace(
        new RegExp(kw, "igm"),
        `<span style='color:red'>${kw}</span>`
      );
    }
  },
  methods: {
    getviews: function() {
      HTTP.postData("/BackEndServer/selectview", {
        page: this.page,
        selectname: this.selectname,
        selectid: this.selectid
      }).then(res => {
        this.selectview = res.selectview;
        console.log(this.selectview)
      });
      this.getlength();
    },
    getlength: function() {
      HTTP.postData("/BackEndServer/getlength").then(res => {
        this.alllength = res.length[0]["COUNT(pid)"];
      });
    },
    change: function() {
      this.getviews();
    },
    handleSizeChange: function() {},
    handleCurrentChange: function() {
      console.log(this.page);
      this.getviews();
    },
    childback: function() {
      this.changeid = 0;
    },
    updateone: function(id) {
      this.changeid = id;
      console.log(id);
    },
    deleteone: function(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          HTTP.postData("/BackEndServer/deletview", {
            id: id
          }).then(res => {
            if (res.isok == 1) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getviews();
            } else {
              this.$message({
                type: "info",
                message: "删除失败"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.getviews();
  },
  components: {
    changeview: resolve => {
      require(["./changeview"], resolve);
    }
  }
};
</script>
<style>
.add {
  height: 100%;
  width: 100%;
}
.bigfont {
  font-weight: 700;
  font-size: 20px;
  color: black;
}
.showtable ul li {
  list-style: none;
}
.select .el-input {
  width: 30%;
}
.showtable table {
  width: 100%;
}
.showtable table tr {
  width: 100%;
  display: block;
  padding: 10px 0;
  border-bottom: 1px solid rgb(177, 177, 177);
  cursor: pointer;
}
.showtable table tr:hover {
  background-color: rgb(211, 208, 208);
}
.showtable table tr td img {
  height: 30px;
  width: 30px;
}
.showtable table tr td {
  display: inline-block;
  width: 13%;
  font-size: 16px;
  text-align: center;
}
.selectview,
.showtable {
  box-sizing: border-box;
  padding: 20px;
  background-color: white;
}
.select {
  margin: 20px 0;
}
.toptr {
  font-size: 18px;
  color: rgb(138, 137, 137);
  background-color: rgb(211, 208, 208);
}
</style>