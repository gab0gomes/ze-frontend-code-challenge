<template>
  <div>
    <multiselect
      v-model="value"
      placeholder="Insira o endereço e o número"
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
      <template #noResult>
        Nenhum resultado encontrado. :( Por favor, tente com outro critério de
        busca.
      </template>
      <template #noOptions>Sem opções.</template>
    </multiselect>
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
      this.$emit('select', data[0])
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
