<template>
  <main>
    <section class="container">
      <address-select @select="handleAddressSelection" />
      <typing-animation />
    </section>
  </main>
</template>

<script>
import { mapMutations } from 'vuex'

import AddressSelect from './components/AddressSelectComponent'
import TypingAnimation from './components/TypingAnimationComponent'

export default {
  components: {
    AddressSelect,
    TypingAnimation
  },

  methods: {
    ...mapMutations('address', ['setAddress']),

    handleAddressSelection(data) {
      this.setAddress({
        fancyAddress: data.text,
        location: data.value
      })

      window.localStorage.setItem('fancyAddress', data.text)
      window.localStorage.setItem('location', JSON.stringify(data.value))

      this.$router.push('/products')
    }
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
