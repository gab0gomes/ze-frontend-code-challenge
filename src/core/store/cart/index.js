import mutations from './mutations'
import getters from './getters'

export default {
  namespaced: true,

  state: {
    products: {},
    quantities: {}
  },

  mutations,

  getters
}
