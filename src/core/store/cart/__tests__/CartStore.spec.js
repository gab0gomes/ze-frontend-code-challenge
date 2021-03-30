import mutations from '../mutations'
import getters from '../getters'

const productA = {
  id: '8868',
  title: 'Skol 269ml - Unidade',
  rgb: false,
  images: [
    {
      url:
        'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/8868_205f958d-2e51-48a3-b4d5-a2998765571a.jpg',
      __typename: 'ProductImage'
    }
  ],
  productVariants: [
    {
      availableDate: '2018-10-31T00:00:00',
      productVariantId: '8502',
      price: 2.09,
      inventoryItemId: '80149',
      shortDescription: null,
      title: 'Skol 269ml - Unidade',
      published: null,
      volume: '0,00269',
      volumeUnit: null,
      description: null,
      subtitle: 'Cervejas',
      components: [],
      __typename: 'ProductVariant'
    }
  ],
  __typename: 'Product'
}

const productB = {
  id: '8869',
  title: 'Skol 269ml - Pack com 15 Unidades',
  rgb: false,
  images: [
    {
      url:
        'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/products/8503.png',
      __typename: 'ProductImage'
    }
  ],
  productVariants: [
    {
      availableDate: '2018-10-31T00:00:00',
      productVariantId: '8503',
      price: 31.35,
      inventoryItemId: '80151',
      shortDescription: null,
      title: 'Skol 269ml - Pack com 15 Unidades',
      published: null,
      volume: '0,04035',
      volumeUnit: null,
      description: null,
      subtitle: 'Cervejas',
      components: [],
      __typename: 'ProductVariant'
    }
  ],
  __typename: 'Product'
}

describe('CartStore', () => {
  it('should add a product correctly', () => {
    const state = {
      products: {},
      quantities: {}
    }

    mutations.addProduct(state, productA)

    expect(state.products[productA.id]).toEqual(productA)
    expect(state.quantities[productA.id]).toBe(1)

    mutations.addProduct(state, productA)
    expect(state.quantities[productA.id]).toEqual(2)

    mutations.addProduct(state, productB)
    expect(state.products[productB.id]).toEqual(productB)
    expect(state.quantities[productB.id]).toBe(1)

    mutations.addProduct(state, productB)
    expect(state.quantities[productB.id]).toEqual(2)

    expect(state.quantities[productA.id]).toEqual(2)
  })

  it('should remove a product correctly', () => {
    const state = {
      products: {
        [productA.id]: productA,
        [productB.id]: productB
      },
      quantities: {
        [productA.id]: 2,
        [productB.id]: 1
      }
    }

    mutations.removeProduct(state, productA)
    expect(state.quantities[productA.id]).toBe(1)

    mutations.removeProduct(state, productB)
    expect(state.quantities[productB.id]).toBeUndefined()
    expect(state.products[productB.id]).toBeUndefined()

    mutations.removeProduct(state, productA)
    expect(state.quantities[productB.id]).toBeUndefined()
    expect(state.products[productB.id]).toBeUndefined()

    expect(Object.keys(state.quantities).length).toBe(0)
    expect(Object.keys(state.products).length).toBe(0)
  })

  it('should return a product quantity correctly', () => {
    const state = {
      products: {
        [productA.id]: productA,
        [productB.id]: productB
      },
      quantities: {
        [productA.id]: 2,
        [productB.id]: 1
      }
    }

    expect(getters.getProductQuantity(state)(productA.id)).toBe(2)
    expect(getters.getProductQuantity(state)(productB.id)).toBe(1)

    mutations.removeProduct(state, productA)
    expect(getters.getProductQuantity(state)(productA.id)).toBe(1)

    mutations.removeProduct(state, productB)
    expect(getters.getProductQuantity(state)(productB.id)).toBeUndefined()

    mutations.removeProduct(state, productA)
    expect(getters.getProductQuantity(state)(productA.id)).toBeUndefined()
  })

  it('should return a totalPrice correctly', () => {
    const state = {
      products: {
        [productA.id]: productA,
        [productB.id]: productB
      },
      quantities: {
        [productA.id]: 2,
        [productB.id]: 1
      }
    }

    expect(getters.getTotalPrice(state)).toBe(35.53)

    mutations.removeProduct(state, productA)
    expect(getters.getTotalPrice(state)).toBe(33.44)

    mutations.removeProduct(state, productB)
    expect(getters.getTotalPrice(state)).toBe(2.09)

    mutations.removeProduct(state, productA)
    expect(getters.getTotalPrice(state)).toBe(0)

    mutations.addProduct(state, productB)
    expect(getters.getTotalPrice(state)).toBe(31.35)
  })

  it('should return a formattedTotalPrice correctly', () => {
    const state = {
      products: {
        [productA.id]: productA,
        [productB.id]: productB
      },
      quantities: {
        [productA.id]: 2,
        [productB.id]: 1
      }
    }

    expect(
      getters.getFormattedTotalPrice(state, {
        getTotalPrice: getters.getTotalPrice(state)
      })
    ).toBe('R$ 35,53')
  })
})
