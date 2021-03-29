import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import flushPromises from 'flush-promises'

import ProductCard from '../index'

const localVue = createLocalVue()

const product = () => ({
  id: '8877',
  title: 'Brahma 269ml - Unidade',
  rgb: false,
  images: [
    {
      url:
        'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00008877_02c7ebe9-c23a-405c-8af8-8f0988f276c7.jpg',
      __typename: 'ProductImage'
    }
  ],
  productVariants: [
    {
      availableDate: '2018-10-31T00:00:00',
      productVariantId: '8511',
      price: 19.9,
      inventoryItemId: '80139',
      shortDescription: null,
      title: 'Brahma 269ml - Unidade',
      published: null,
      volume: '0,00269',
      volumeUnit: null,
      description: null,
      subtitle: null,
      components: [],
      __typename: 'ProductVariant'
    }
  ],
  __typename: 'Product'
})

describe('ProductCardComponent', () => {
  it('render correctly', async () => {
    const wrapper = shallowMount(ProductCard, {
      localVue,
      propsData: {
        product: product()
      }
    })
    await flushPromises()

    expect(wrapper.element).toMatchSnapshot()

    wrapper.destroy()
  })

  it('price format works as expected', async () => {
    const wrapper = mount(ProductCard, {
      localVue,
      propsData: {
        product: product()
      }
    })

    await flushPromises()
    expect(wrapper.vm.formattedPrice).toBe('R$ 19,90')

    wrapper.destroy()
  })
})
