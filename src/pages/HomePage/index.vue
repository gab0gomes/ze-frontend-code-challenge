<template>
  <div>
    <h1>You are in HomePage</h1>
    <h2>This is the Foo component</h2>
    <address-select />
  </div>
</template>

<script>
import AddressSelect from './components/AddressSelectComponent'

export default {
  components: {
    AddressSelect
  }
}
</script>
