<template>
  <div class="addkinds">
    <div class="top">添加花卉信息</div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="花卉名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="花卉种类">
        <el-select v-model="form.region" placeholder="请选择花卉种类">
          <li v-for="(item, index) in kindstap" :key="index">
            <el-option v-bind:label="item.kidnsname" v-bind:value="item.kid"></el-option>
          </li>
        </el-select>
        <el-button type="primary" plain @click="addkinds">添加种类</el-button>
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
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import HTTP from "../../fetch/api";
export default {
  data() {
    return {
      form: {
        name: "",
        region: "",
        price: ""
      },
      kindstap: [],
      imageUrl: "",
      outputhead: "",
      fileList: []
    };
  },
  methods: {
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
        var name = this.form.name;
        var region = this.form.region;
        var price = this.form.price;
        var headimg = this.imageUrl;
        var imglist = "";
        var len = this.fileList.length;
        console.log(this.fileList)
        for (let i = 0; i < len; i++) {
          imglist += "," + this.fileList[i].url;
        }
        HTTP.postData("/BackEndServer/addproduce", {
          name: name,
          region: region,
          price: price,
          headimg: headimg,
          imglist: imglist
        }).then(res => {
          if (res.addok == 1) {
            this.$message({
              type: "success",
              message: "添加成功！"
            });
            this.form.name = "",
            this.form.region = "",
            this.form.price = "",
            this.imageUrl = "",
            this.fileList = []
          } else {
            this.$message({
              type: "info",
              message: "添加失败！"
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
    addkinds: function() {
      this.$prompt("请输入添加的种类", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          HTTP.postData("/BackEndServer/addkinds", {
            addvalue: value
          }).then(res => {
            if (res.addok == 1) {
              this.$message({
                type: "success",
                message: value + "添加成功！",
              });
              this.getkinds();
            } else {
              this.$message({
                type: "info",
                message: "添加失败！"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消添加！"
          });
        });
      },
      getkinds:function(){
        HTTP.postData("/BackEndServer/getkinds").then(res => {
          this.kindstap = res.kindstap;
        });
      }
  },
  created() {
    this.getkinds();
  }
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.add {
  height: 100%;
  width: 100%;
}
.el-form-item__content {
  width: 60%;
  max-width: 80%;
}
.addkinds {
  border-radius: 20px;
  overflow: hidden;
  margin: 10px;
}
.el-input {
  width: 50%;
}
.top {
  font-weight: 700;
  font-size: 20px;
  color: black;
  margin: 10px;
  padding: 10px 30px;
  border-radius: 10px;
  background-color: white;
}
.el-form {
  margin: 10px;
  border-radius: 10px;
  padding: 10px;
  background-color: white;
}
.el-select > .el-input {
  width: 100%;
}
</style>