<template>
  <div class="product-card">
    <div class="product-description">
      <span v-if="getProductQuantity(product.id)">
        {{ getProductQuantity(product.id) }}
      </span>
      <img :src="product.images[0].url" />
      <h5>{{ product.productVariants[0].title }}</h5>
    </div>
    <div class="product-shop">
      <p class="price">{{ formattedPrice }}</p>
      <div class="controls">
        <button
          class="button remove"
          alt="Remover uma unidade do carrinho"
          @click="removeProduct(product)"
        >
          -
        </button>
        <button
          class="button add"
          alt="Adicionar uma unidade ao carrinho"
          @click="addProduct(product)"
        >
          +
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },

  computed: {
    ...mapGetters('cart', ['getProductQuantity']),

    formattedPrice() {
      return `R$ ${this.product.productVariants[0].price.toLocaleString(
        'pt-br',
        { minimumFractionDigits: 2 }
      )}`
    }
  },

  methods: {
    ...mapMutations('cart', ['addProduct', 'removeProduct'])
  }
}
</script>

<style scoped>
.product-card {
  color: #3c2946;
  border-radius: 0.5rem;
  border: 1px solid #3c2946;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}

.product-card .product-description {
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  position: relative;
}

.product-card .product-description span {
  position: absolute;
  top: 8px;
  right: 9px;
  padding: 0.5rem;
  border: 1px solid #3c2946;
  font-size: 0.725rem;
  border-radius: 8px;
  color: #3c2946;
}

.product-card .product-description img {
  max-width: 64px;
}

.product-card .product-description h5 {
  margin: 0;
  margin-top: 0.5rem;
  text-align: center;
  font-weight: 400;
}

.product-card .product-shop {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

.product-shop .price {
  margin: 0;
  margin-bottom: 0.5rem;
}

.product-shop .controls {
  margin-bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-top: 1px solid #3c2946;
}
.product-shop .controls .button {
  width: 50%;
  height: 2rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.5s ease;
}

.product-shop .controls .button:not(:last-child) {
  border-right: 1px solid #3c2946;
}

.product-shop .controls .button.add {
  border-bottom-right-radius: 8px;
}
.product-shop .controls .button.add:hover {
  background-color: #bbd196;
}

.product-shop .controls .button.remove {
  border-bottom-left-radius: 8px;
}
.product-shop .controls .button.remove:hover {
  background-color: #e2bcb7;
}
</style>
