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
    <div v-else-if="poc.products && allCategory">
      <product-grid
        v-for="category in allCategory"
        :key="category.id"
        :title="category.title"
        :products="categorizedProducts[category.title]"
      />
    </div>
  </main>
</template>

<script>
import gql from 'graphql-tag'
import { mapState } from 'vuex'

import pocSearchQuery from '@/core/graphQL/queries/pocSearch'
import pocQuery from '@/core/graphQL/queries/poc'
import allCategory from '@/core/graphQL/queries/allCategory'

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
      poc: '',
      allCategory: ''
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
    },
    allCategory: {
      query: gql`
        ${allCategory}
      `,
      variables() {
        return this.params
      },
      skip() {
        return !this.params
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
        return this.poc.products.reduce((acc, product) => {
          let key = product.productVariants[0].subtitle || 'Outros'
          const accumulator = { ...acc }

          if (accumulator[key]) {
            accumulator[key].push(product)
          } else {
            accumulator[key] = [product]
          }

          return accumulator
        }, {})
      }
      return {}
    }
  }
}
</script>

<style scoped>
main {
  height: 100%;
}
</style>
