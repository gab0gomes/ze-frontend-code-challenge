<template>
  <div>{{ getPoc }}</div>
</template>

<script>
import gql from 'graphql-tag'
import { mapState } from 'vuex'
import pocSearchMethod from '@/core/graphQL/queries/pocSearchMethod'

export default {
  data() {
    return {
      getPoc: ''
    }
  },

  apollo: {
    getPoc: {
      query: gql`
        ${pocSearchMethod}
      `,
      variables() {
        return {
          algorithm: 'NEAREST',
          lat: `${this.location.lat}`,
          long: `${this.location.lng}`,
          now: new Date().toISOString()
        }
      }
    }
  },

  computed: {
    ...mapState('address', {
      location: (state) => state.location
    })
  }
}
</script>

<style></style>
