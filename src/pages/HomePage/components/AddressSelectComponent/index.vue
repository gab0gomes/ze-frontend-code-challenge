<template>
  <div class="select-container">
    <multiselect
      v-model="value"
      placeholder="Insira o endereço para ver produtos"
      label="text"
      track-by="value"
      :allow-empty="false"
      :options="options"
      :searchable="true"
      :loading="loadingGetAddresses"
      :internal-search="false"
      :close-on-select="true"
      :options-limit="10"
      :show-no-results="true"
      :show-labels="false"
      @search-change="findCandidates"
      @select="onSelectHandler"
    >
      <template #noResult>Nenhum resultado encontrado. :(</template>
      <template #noOptions>Sem opções.</template>
    </multiselect>
    <p v-if="failedGetAddresses" class="error-label">
      Oops... não foi possível buscar os endereços. Tente novamente.
    </p>
  </div>
</template>
<script>
import Multiselect from 'vue-multiselect'
import { mapState, mapActions } from 'vuex'

export default {
  components: { Multiselect },

  data() {
    return {
      value: null,
      options: [],
      debounceId: null
    }
  },

  computed: {
    ...mapState('requests/geocoding', {
      loadingGetAddresses: ({ getAddresses }) => getAddresses.isFetching,
      failedGetAddresses: ({ getAddresses }) => getAddresses.hasFailed,
      succeededGetAddresses: ({ getAddresses }) => getAddresses.hasSucceeded
    })
  },

  methods: {
    ...mapActions('requests/geocoding', ['getAddresses']),

    findCandidates(address) {
      if (this.debounceId) {
        clearTimeout(this.debounceId)
      }

      if (address) {
        this.debounceId = setTimeout(() => {
          this.getAddresses(address).then((data) => {
            this.options = data.results.map((candidate) =>
              this.getOption(candidate)
            )
            this.debounceId = null
          })
        }, 500)
      }
    },

    getOption(data) {
      return {
        text: data.formatted_address,
        value: data.geometry.location
      }
    },

    onSelectHandler(data) {
      this.$emit('select', data)
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.select-container {
  width: 100%;
  max-width: 560px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

::v-deep .multiselect__tags,
::v-deep .multiselect__content-wrapper {
  border-color: #56556e;
}

::v-deep .multiselect__select::before {
  color: #56556e;
  border-color: #68686b transparent transparent;
}

::v-deep .multiselect__option--highlight {
  background-color: #bbd196;
  color: #3c2946;
}
::v-deep .multiselect__option--selected.multiselect__option--highlight {
  background-color: #e2bcb7;
  color: #3c2946;
}

::v-deep .multiselect__spinner::after,
::v-deep .multiselect__spinner::before {
  border-color: #3c2946 transparent transparent;
}

.error-label {
  color: #e2bcb7;
  background-color: #3c2946;
  padding: 0.5rem;
}
</style>
