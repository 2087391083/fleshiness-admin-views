import axios from 'axios'
var HTTP = axios.create({
  baseURL: 'http://luoyi:4000',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  transformRequest: [function (data) {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }]
})
export default {
  getData: (url, params) => {
    return new Promise((resolve, reject) => {
      HTTP.get(url, params).then((res) => {
        resolve(res.data)
      }).catch((err) => {
        console.log(err)
        reject(err)
      })
    })
  },
  postData: (url, params) => {
    return new Promise((resolve, reject) => {
      HTTP.post(url, params).then((res) => {
        resolve(res.data)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}
