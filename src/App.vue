<template>
  <div>
    <header-component />
    <router-view />
  </div>
</template>

<script>
import HeaderComponent from '@/core/components/HeaderComponent'

export default {
  components: {
    HeaderComponent
  }
}
</script>
