import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    leftId: ''
  },
  mutations: {
    service (state, data) {
      state.leftId = data
    }
  }
})

export default store
