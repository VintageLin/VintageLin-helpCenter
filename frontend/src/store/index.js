import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
  username: '',
  token: '',
  uid: ''
}

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})

export default store
