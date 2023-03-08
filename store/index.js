import Vue from 'vue'
import Vuex from 'vuex'
import { state, getters, mutations, actions } from './entities/index'

Vue.use (Vuex)

export default () => new Vuex.Store({
  modules: {
    entities: {
      namespaced: true,
      state,
      getters,
      mutations,
      actions,
    }
  }
})
