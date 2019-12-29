import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'HelloWorld',
      component: resolve => require(['@/components/HelloWorld'], resolve)
    },
    {
      path: '/main',
      component: resolve => require(['@/components/center/autormain'], resolve)
    },
    {
      path: '/add',
      component: resolve => require(['@/components/center/userdom/addkinds'], resolve)
    }
  ]
})
