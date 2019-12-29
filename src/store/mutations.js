import {
  ISOK,
  LOGIN
} from './types'
const mutations = {
  [LOGIN] (state, res) {
    state.token = res
  },
  [ISOK] (state, res) {
    state.page = res
  }
}

export default mutations
