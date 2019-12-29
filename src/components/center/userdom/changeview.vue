<template>
  <div>
    <div class="changeviews">
      <el-button @click="back(0)" type="info" class="backbutton" plain>返回</el-button>
      <div class="top">修改花卉信息</div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="花卉名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="花卉种类">
          <el-select v-model="form.region" :placeholder="kinds">
            <li v-for="(item, index) in kindstap" :key="index">
              <el-option v-bind:label="item.kidnsname" v-bind:value="item.kid"></el-option>
            </li>
          </el-select>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="商品头像">
          <el-upload
            class="avatar-uploader"
            action="http://luoyi:4000/BackEndServer/upmoremydata"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="详情图片">
          <el-upload
            class="upload-demo"
            action="http://luoyi:4000/BackEndServer/upmoremydata"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :on-success="AvatarSuccess"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import HTTP from "../../fetch/api";
export default {
  props: ["changeid"],
  data() {
    return {
      form: {
        name: "",
        region: "",
        price: ""
      },
      kindstap: [],
      imageUrl: "",
      kinds: "",
      outputhead: "",
      fileList: [],
      selectid: this.changeid
    };
  },
  methods: {
    back: function(a) {
      if (a) {
        this.$emit("getback");
      } else {
        this.$confirm(
          "检测到未保存的内容，是否在离开页面前保存修改？",
          "确认信息",
          {
            distinguishCancelAndClose: true,
            confirmButtonText: "继续修改",
            cancelButtonText: "放弃修改"
          }
        )
          .then(() => {
            
          })
          .catch(action => {
            this.$emit("getback");
          });
      }
    },
    onSubmit() {
      if (this.form.name == "") {
        this.$message.error("错了哦，名称不能为空！");
      } else if (this.form.region == "") {
        this.$message.error("错了哦，种类不能为空！");
      } else if (this.form.price == "") {
        this.$message.error("错了哦，价格不能为空！");
      } else if (this.outputhead == "") {
        this.$message.error("错了哦，头像不能为空！");
      } else {
        var selectid = this.selectid;
        var name = this.form.name;
        var region = this.form.region;
        var price = this.form.price;
        var headimg = this.imageUrl;
        var imglist = "";
        var len = this.fileList.length;
        for (let i = 0; i < len; i++) {
          imglist += "," + this.fileList[i].url;
        }
        console.log(this.form.region)
        HTTP.postData("/BackEndServer/changeproduce", {
          selectid: selectid,
          name: name,
          region: region,
          price: price,
          headimg: headimg,
          imglist: imglist
        }).then(res => {
          if (res.addok == 1) {
            this.$message({
              type: "success",
              message: "修改成功！"
            });
            this.back(1);
          } else {
            this.$message({
              type: "info",
              message: "修改失败！"
            });
          }
        });
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.outputhead = file.response.names;
    },
    AvatarSuccess(res, file, fileList) {
      this.fileList = fileList;
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
    handlePreview(file) {
      this.fileList = fileList;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    getkinds: function() {
      HTTP.postData("/BackEndServer/getkinds").then(res => {
        this.kindstap = res.kindstap;
      });
    },
    getidview() {
      HTTP.postData("/BackEndServer/getidview", { id: this.selectid }).then(
        res => {
          this.form.name = res.kindstap[0].pname;
          this.kinds = res.kindstap[0].kindsname;
          this.form.price = res.kindstap[0].price;
          this.imageUrl = res.kindstap[0].imgsrc;
          this.outputhead = res.kindstap[0].imgsrc;
          var oldimglist = res.kindstap[0].prodetails.split(",");
          var oldlist = [];
          for (var i = 1; i < oldimglist.length; i++) {
            var one = {};
            one.url = oldimglist[i];
            one.name = "传入的图片";
            oldlist.push(one);
          }
          this.fileList = oldlist;
        }
      );
    }
  },
  created() {
    this.getkinds();
    this.getidview();
  }
};
</script>
<style>
.backbutton {
  height: 100%;
  width: 100px;
  position: absolute;
  margin-left: -100px;
}
.changeviews {
  margin-left: 100px;
  position: relative;
}
</style>