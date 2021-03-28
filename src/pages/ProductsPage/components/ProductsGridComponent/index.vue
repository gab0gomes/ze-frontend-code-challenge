<template>
  <section>
    <h2>{{ title }}</h2>
    <div class="grid-container">
      <product-card
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>
</template>

<script>
import ProductCard from '../ProductCardComponent'

export default {
  components: {
    ProductCard
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    products: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 1fr;
  column-gap: 1rem;
  grid-template-areas: '. . . .';
}
</style>
