import mutations from './mutations'
import getters from './getters'
import state from './state'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  mutations,
  getters,
  state
})
