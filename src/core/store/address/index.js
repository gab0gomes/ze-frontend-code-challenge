export default {
  namespaced: true,

  state: {
    fancyAddress: null,
    location: {}
  },

  mutations: {
    setAddress(state, data) {
      Object.keys(data).forEach((key) => {
        if (data[key] && state.hasOwnProperty(key)) {
          state[key] = data[key]
        }
      })
    }
  }
}
