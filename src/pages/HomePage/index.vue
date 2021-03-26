<template>
  <main>
    <section class="container">
      <address-select />
      <typing-animation />
    </section>
  </main>
</template>

<script>
import AddressSelect from './components/AddressSelectComponent'
import TypingAnimation from './components/TypingAnimationComponent'

export default {
  components: {
    AddressSelect,
    TypingAnimation
  }
}
</script>

<style scoped>
main {
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  height: 100vh;
  background-size: cover;
  background-image: url('../../../static/images/home-background.jpg');
  display: flex;
  justify-content: center;
  align-items: center;
}

section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
