<template>
  <main>
    <section class="container">
      <address-select />
    </section>
  </main>
</template>

<script>
import AddressSelect from './components/AddressSelectComponent'

export default {
  components: {
    AddressSelect
  }
}
</script>

<style scoped>
main {
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  height: 480px;
  background-size: cover;
  background-image: url('../../../static/images/home-background.jpg');
  display: flex;
  justify-content: center;
  align-items: center;
}

@media only screen and (max-width: 560px) {
  main {
    height: 320px;
  }
}

section {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
