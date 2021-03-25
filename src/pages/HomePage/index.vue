<template>
  <div>
    <h1>You are in HomePage</h1>
    <h2>This is the Foo component</h2>
    <address-input />
  </div>
</template>

<script>
import AddressInput from './components/AddressInputComponent'

export default {
  components: {
    AddressInput
  }
}
</script>
