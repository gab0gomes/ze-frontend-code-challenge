<template>
  <section class="products-grid">
    <h2>{{ title }}</h2>
    <hr />
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
.products-grid {
  margin-bottom: 48px;
}

.products-grid .grid-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
  column-gap: 1rem;
  row-gap: 1rem;
  grid-template-areas: '. . . . .';
}

@media only screen and (max-width: 768px) {
  .products-grid .grid-container {
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas: '. . . .';
  }
}
@media only screen and (max-width: 576px) {
  .products-grid .grid-container {
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas: '. . .';
  }
}
@media only screen and (max-width: 480px) {
  .products-grid .grid-container {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas: '. .';
  }
}

.products-grid h2 {
  color: #3c2946;
  margin-bottom: 0;
}

.products-grid hr {
  color: #3c2946;
  margin-bottom: 1rem;
}
</style>
