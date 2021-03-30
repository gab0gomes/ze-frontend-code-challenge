export default {
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
