<template>
  <div class="cart-container">
    <img :src="cart" alt="uma figura de um carrinho de compras" />
    <p>
      {{ getFormattedTotalPrice }}
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import cart from '../../../../../static/images/cart.png'

export default {
  data() {
    return {
      cart
    }
  },
  computed: {
    ...mapGetters('cart', ['getFormattedTotalPrice'])
  }
}
</script>

<style scoped>
.cart-container {
  border-radius: 8px;
  height: 48px;
  max-width: 128px;
  border: 1px solid #3c2946;
  position: fixed;
  bottom: 32px;
  right: 16px;
  padding: 8px;
  display: flex;
  justify-content: center;
  background-color: #ffd571;
  align-items: center;
  color: #3c2946;
  box-shadow: 4px 4px #3c2946;
  z-index: 999;
}

.cart-container img {
  max-width: 24px;
}

.cart-container p {
  margin: 0;
  margin-left: 8px;
}
</style>
