<template>
  <div class="table">
    <div class="addgonggao">
      <el-button type="success" @click="dialog = true">添加公告</el-button>
      <el-drawer
        title="发布一个新公告！"
        :before-close="handleClose"
        :visible.sync="dialog"
        direction="rtl"
        custom-class="demo-drawer"
        ref="drawer"
      >
        <div class="demo-drawer__content">
          <el-form :model="form">
            <el-form-item label="公告标题" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="公告内容" :label-width="formLabelWidth">
              <textarea name id cols="30" rows="10" v-model="form.world"></textarea>
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button @click="dialog = false">取 消</el-button>
            <el-button
              type="primary"
              @click="$refs.drawer.closeDrawer()"
              :loading="loading"
            >{{ loading ? '提交中 ...' : '确 定' }}</el-button>
          </div>
        </div>
      </el-drawer>
    </div>
    <div class="showtable02">
      <table>
        <tr class="toptr">
          <td>公告编号</td>
          <td>发布日期</td>
          <td>标题</td>
          <td>内容</td>
          <td>删除</td>
        </tr>
        <tr v-for="(item, index) in tableData" :key="index">
          <td>{{item.nid}}</td>
          <td>{{item.addtimes}}</td>
          <td>{{item.title}}</td>
          <td>{{item.content}}</td>
          <td>
            <el-button type="danger" @click="deleteone(item.nid)">删除</el-button>
          </td>
        </tr>
      </table>
    </div>
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
</template>

<script>
import HTTP from "../../fetch/api";
export default {
  data() {
    return {
      tableData: [],
      alllength: 20,
      page: 1,
      dialog: false,
      loading: false,
      form: {
        name: "",
        world: ""
      },
      formLabelWidth: "80px"
    };
  },
  methods: {
    handleSizeChange: function() {},
    handleCurrentChange: function() {},
    getgonggao: function() {
      HTTP.postData("/BackEndServer/gonggaoviews", {
        page: this.page
      }).then(res => {
        this.tableData = res.gonggaoviews;
      });
    },
    getsize: function() {
      HTTP.postData("/BackEndServer/getalllength").then(res => {
        this.alllength = res.length[0]["COUNT(nid)"];
      });
    },
    handleClose(done) {
      this.$confirm("确定要提交表单吗？")
        .then(_ => {
          console.log(this.form.name);
          console.log(this.form.world);
          var newDate = new Date();
          var year = newDate.getFullYear();
          var month =
            newDate.getMonth() + 1 < 10
              ? "0" + (newDate.getMonth() + 1)
              : newDate.getMonth() + 1;
          var day =
            newDate.getDate() < 10
              ? "0" + newDate.getDate()
              : newDate.getDate();
          var hours =
            newDate.getHours() < 10
              ? "0" + newDate.getHours()
              : newDate.getHours();
          var minuts =
            newDate.getMinutes() < 10
              ? "0" + newDate.getMinutes()
              : newDate.getMinutes();
          var seconds =
            newDate.getSeconds() < 10
              ? "0" + newDate.getSeconds()
              : newDate.getSeconds();
          var nowtime =
            year +
            "-" +
            month +
            "-" +
            day +
            " " +
            hours +
            ":" +
            minuts +
            ":" +
            seconds;

          if (this.form.name == "") {
            this.$message({
              showClose: true,
              message: "标题不能为空哦！",
              type: "error"
            });
          } else if (this.form.world == "") {
            this.$message({
              showClose: true,
              message: "内容不能为空哦",
              type: "error"
            });
          } else {
            HTTP.postData("/BackEndServer/addgonggao", {
              title: this.form.name,
              world: this.form.world,
              time: nowtime
            }).then(res => {
              if (res.isok) {
                this.getgonggao();
                this.getsize();
              }
            });
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              done();
            }, 1000);
          }
        })
        .catch(_ => {
          this.dialog = false;
        });
    },
    deleteone(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          HTTP.postData("/BackEndServer/deletgonggao", {
            id: id
          }).then(res => {
            if (res.isok == 1) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getgonggao();
              this.getsize();
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
    this.getgonggao();
    this.getsize();
  }
};
</script>
<style>
.table {
  box-sizing: border-box;
  background-color: white;
  padding: 35px;
}
.addgonggao {
  box-sizing: border-box;
  padding: 10px;
}
.block {
  box-sizing: border-box;
  padding: 10px;
}
.demo-drawer__footer {
  box-sizing: border-box;
  padding: 10px 40px;
}
.el-button + .el-button {
  margin-left: 40px;
}
.el-button--small {
  padding: 10px 30px;
}
.showtable02 ul li {
  list-style: none;
}
.select .el-input {
  width: 30%;
}
.showtable02 table {
  width: 100%;
}
.showtable02 table tr {
  width: 100%;
  display: block;
  padding: 10px 0;
  border-bottom: 1px solid rgb(177, 177, 177);
  cursor: pointer;
}
.showtable02 table tr:hover {
  background-color: rgb(211, 208, 208);
}
.showtable02 table tr td img {
  height: 30px;
  width: 30px;
}
.showtable02 table tr td {
  display: inline-block;
  width: 17%;
  font-size: 16px;
  text-align: center;
}
</style>