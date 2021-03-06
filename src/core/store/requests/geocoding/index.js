import makeRequestStore from '@/utils/makeRequestStore'

import { getAddresses } from '@/core/services/geocoding'

const modules = [{ getAddresses }]

export default {
  namespaced: true,

  modules: modules.reduce(
    (acc, module) => ({
      ...acc,
      ...makeRequestStore(module)
    }),
    {}
  )
}
