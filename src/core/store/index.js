import Vue from 'vue'
import Vuex from 'vuex'

import requests from './requests'
import address from './address'
import cart from './cart'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    requests,
    address,
    cart
  }
})
