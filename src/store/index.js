import Vue from 'vue'
import Vuex from 'vuex'

import requests from './requests'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    requests
  }
})
