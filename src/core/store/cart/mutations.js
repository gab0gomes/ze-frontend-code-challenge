import Vue from 'vue'

export default {
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
}
