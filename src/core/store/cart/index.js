import Vue from 'vue'

export default {
  namespaced: true,

  state: {
    products: {},
    quantities: {}
  },

  mutations: {
    addProduct(state, product) {
      const stateProduct = state.quantities[product.id]

      if (stateProduct) {
        Vue.set(state.quantities, product.id, stateProduct + 1)
      } else {
        Vue.set(state.quantities, product.id, 1)
        Vue.set(state.products, product.id, { ...product })
      }
    },

    removeProduct(state, product) {
      const stateProduct = state.quantities[product.id]
      if (stateProduct > 1) {
        Vue.set(state.quantities, product.id, stateProduct - 1)
      } else if (stateProduct === 1) {
        const products = { ...state.products }
        delete products[product.id]
        state.products = products

        const quantities = { ...state.quantities }
        delete quantities[product.id]
        state.quantities = quantities
      }
    }
  },

  getters: {
    getProductQuantity: (state) => (productId) => state.quantities[productId],

    getTotalPrice: (state) =>
      Object.keys(state.quantities).reduce((acc, productId) => {
        return (
          acc +
          state.products[productId].productVariants[0].price *
            state.quantities[productId]
        )
      }, 0),

    getFormattedTotalPrice: (state, getters) =>
      new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL'
      }).format(getters.getTotalPrice)
  }
}
