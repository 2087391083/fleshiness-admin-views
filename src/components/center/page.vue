<template>
  <div class="mytable">
    <input type="text" name="getone" v-model="kw" @change="change"/>
    <tr v-for="(item, index) in books" :key="index">
      <td>{{item.bookid}}</td>
      <td v-html="$options.filters.repalcename(item.bookname,kw)"></td>
      <td>{{item.bookautor}}</td>
    </tr>
    <button @click="tiaozhuan">点击按钮</button>
    <button @click="xiugai">修改</button>
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
    
  </div>
</template>

<script>
import HTTP from '../fetch/api'
import store from '../../store/stroeindex'
export default {
  name: 'mytable',
  data () {
    return {
      books: [],
      kw: ''
    }
  },
  filters: {
    repalcename: function (str, kw) {
      if (!kw) {
        return str
      }
      return str.replace(new RegExp(kw, 'igm'), `<span style='color:red'>${kw}</span>`)
    }
  },
  created () {
    this.selectview()
  },
  methods: {
    change: function () {
      this.selectview()
    },
    tiaozhuan: function () {
      console.log(store.getters.getPage)
    },
    xiugai: function () {
      store.state.page = store.state.page + 1
    },
    selectview: function () {
      HTTP.postData('/FrontEndServer/getbookkinds', {kw: this.kw}).then(
        (res) => {
          this.books = res.bookkinds
        }
      )
    }
  }
}
</script>
<style >
.mytable tr {
  font-size: 0px;
}
.mytable tr td {
  border: 1px solid black;
}
.mytable tr td {
  font-size: 12px;
}
</style>
