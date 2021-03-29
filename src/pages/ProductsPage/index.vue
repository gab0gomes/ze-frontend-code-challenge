<template>
  <main class="container">
    <spinner v-if="toggleSpinner" />
    <state
      v-else-if="!params"
      src="../static/images/map.png"
      alt-text="uma figura de um mapa"
    >
      <p>Nenhum endereço selecionado.</p>
      <p>
        <router-link to="/"
          >Clique aqui para selecionar um endereço.</router-link
        >
      </p>
    </state>
    <state
      v-else-if="toggleNoPocState"
      src="../static/images/shop.png"
      alt-text="uma figura de um supermercado"
    >
      <p>Desculpe, mas não atendemos nessa área ainda... :(</p>
      <p>
        Talvez você queira
        <router-link to="/">escolher outro endereço?</router-link>
      </p>
    </state>
    <div v-else-if="categorizedProducts">
      <product-grid
        v-for="(products, category) in categorizedProducts"
        :key="category"
        :title="category"
        :products="products"
      />
    </div>
  </main>
</template>

<script>
import gql from 'graphql-tag'
import { mapState } from 'vuex'

import pocSearchQuery from '@/core/graphQL/queries/pocSearch'
import pocQuery from '@/core/graphQL/queries/poc'

import State from './components/StateComponent'
import ProductGrid from './components/ProductsGridComponent'
import Spinner from '@/core/components/SpinnerComponent'

export default {
  components: {
    State,
    ProductGrid,
    Spinner
  },

  data() {
    return {
      pocSearch: '',
      poc: ''
    }
  },

  apollo: {
    pocSearch: {
      query: gql`
        ${pocSearchQuery}
      `,
      variables() {
        return this.params
      },
      skip() {
        return !this.params
      }
    },
    poc: {
      query: gql`
        ${pocQuery}
      `,
      variables() {
        return {
          id: this.pocSearch[0]?.id,
          search: '',
          categoryId: null
        }
      },
      skip() {
        return !this.pocSearch[0]?.id
      }
    }
  },

  computed: {
    ...mapState('address', {
      location: (state) => state.location
    }),

    params() {
      if (this.location.lat && this.location.lng) {
        return {
          algorithm: 'NEAREST',
          lat: `${this.location.lat}`,
          long: `${this.location.lng}`,
          now: new Date().toISOString()
        }
      }

      return undefined
    },

    toggleNoPocState() {
      return typeof this.pocSearch !== 'string' && !this.pocSearch.length
    },

    toggleSpinner() {
      return this.$apollo.loading
    },

    categorizedProducts() {
      if (this.poc.products) {
        const groups = this.poc.products.reduce((acc, product) => {
          let key = product.productVariants[0].subtitle || 'Outros'
          const accumulator = { ...acc }

          if (accumulator[key]) {
            accumulator[key].push(product)
            accumulator[key] = this.sortArrayByKey(accumulator[key], 'title')
          } else {
            accumulator[key] = [product]
          }

          return accumulator
        }, {})

        return this.sortObjectByKeys(groups)
      }
      return {}
    }
  },

  methods: {
    sortObjectByKeys(unsorted) {
      return Object.keys(unsorted)
        .sort()
        .reduce((obj, key) => {
          obj[key] = unsorted[key]
          return obj
        }, {})
    },

    sortArrayByKey(unsortedArray, key) {
      return unsortedArray.sort((a, b) => {
        if (a[key] > b[key]) {
          return 1
        }
        if (a[key] < b[key]) {
          return -1
        }
        return 0
      })
    }
  }
}
</script>

<style scoped>
main {
  min-height: 100%;
}
</style>
