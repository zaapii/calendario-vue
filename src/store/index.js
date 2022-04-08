import Vue from 'vue'
import Vuex from 'vuex'
import currentUser from './currentUser'
import  createPersistedState  from  'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    currentUser
  },
  plugins: [createPersistedState()]
})
