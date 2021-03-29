<template>
  <div class="full-height">
    <header-component />
    <router-view />
    <footer-component />
  </div>
</template>

<script>
import HeaderComponent from '@/core/components/HeaderComponent'
import FooterComponent from '@/core/components/FooterComponent'

import { mapMutations } from 'vuex'

export default {
  components: {
    HeaderComponent,
    FooterComponent
  },

  created() {
    this.loadAddressStore()
  },

  methods: {
    ...mapMutations('address', ['setAddress']),

    loadAddressStore() {
      const previousLocation = JSON.parse(
        window.localStorage.getItem('location')
      )
      const previousFancyAddress = window.localStorage.getItem('fancyAddress')

      if (previousLocation && previousFancyAddress) {
        this.setAddress({
          fancyAddress: previousFancyAddress,
          location: previousLocation
        })
      }
    }
  }
}
</script>
