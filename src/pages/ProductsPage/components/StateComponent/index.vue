<template>
  <section class="full-height">
    <div class="state-container">
      <img :src="src" :alt="altText" />
      <slot class="slot-content" />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    altText: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
section {
  display: flex;
  justify-content: center;
  align-items: center;
}
.state-container {
  width: 100%;
  min-height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid #3c2946;
  color: #3c2946;
  border-radius: 0.5rem;
  padding: 1rem;
}

.state-container .slot-content {
  margin-bottom: 0;
  text-align: center;
}

.state-container img {
  width: 128px;
}
</style>
