<template>
  <div>
    <h5>{{ product.title }}</h5>
    <img :src="product.images[0].url" />
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
img {
  max-width: 48px;
}
</style>
