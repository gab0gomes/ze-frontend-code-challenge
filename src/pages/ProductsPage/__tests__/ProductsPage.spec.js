import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'
import VueRouter from 'vue-router'

import ProductsPage from '../index'

import addressStore from '@/core/store/address'

import routes from '@/core/routes'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

const store = (withAddress = true) =>
  new Vuex.Store({
    modules: {
      address: {
        ...addressStore,
        ...(withAddress
          ? {
              state: {
                fancyAddress: 'R. Fradique Coutinho, 1632 - Pinheiros',
                location: {
                  lat: -23.5536452,
                  lng: -46.694965
                }
              }
            }
          : {})
      }
    }
  })

const router = () =>
  new VueRouter({
    routes,
    linkActiveClass: 'active',
    mode: 'abstract'
  })

jest.mock('@/core/services/geocoding')

const data = (withPoc = true, withProducts = true) => ({
  ...(withProducts
    ? {
        poc: {
          id: '532',
          products: [
            {
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
            },
            {
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
            },
            {
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
                  price: 1.99,
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
            },
            {
              id: '9214',
              title: 'Guaraná 350ml - Pack com 12 Unidades',
              rgb: false,
              images: [
                {
                  url:
                    'https://courier-images-codechallenge.s3-us-west-2.amazonaws.com/product/00009214_9e6b60c7-b7f2-47d0-aecd-bb702a9a07b0.jpg',
                  __typename: 'ProductImage'
                }
              ],
              productVariants: [
                {
                  availableDate: '2018-10-31T00:00:00',
                  productVariantId: '8848',
                  price: 29.88,
                  inventoryItemId: '80185',
                  shortDescription: null,
                  title: 'Guaraná 350ml - Pack com 12 Unidades',
                  published: null,
                  volume: '0,042',
                  volumeUnit: null,
                  description: null,
                  subtitle: 'Não Alcóolicos',
                  components: [],
                  __typename: 'ProductVariant'
                }
              ],
              __typename: 'Product'
            }
          ],
          __typename: 'POC'
        }
      }
    : { poc: { id: '532', __typename: 'POC', products: [] } }),
  ...(withPoc
    ? { pocSearch: [{ id: '532', __typename: 'POC' }] }
    : { pocSearch: [] })
})

describe('PoductsPage', () => {
  it('render correctly', async () => {
    const wrapper = mount(ProductsPage, {
      localVue,
      store: store(),
      router: router(),
      mocks: {
        $apollo: {
          loading: false
        }
      }
    })

    wrapper.setData({
      ...data()
    })

    await flushPromises()

    expect(wrapper.element).toMatchSnapshot()

    wrapper.destroy()
  })

  it('should show a spinner if graphql is loading', async () => {
    const wrapper = mount(ProductsPage, {
      localVue,
      store: store(),
      router: router(),
      mocks: {
        $apollo: {
          loading: true
        }
      }
    })

    wrapper.setData({
      ...data()
    })

    await flushPromises()

    expect(wrapper.findAll('.spinner-container').length).toBe(1)

    wrapper.destroy()
  })

  it('should show a no address state if none address was provided', async () => {
    const wrapper = mount(ProductsPage, {
      localVue,
      store: store(false),
      router: router(),
      mocks: {
        $apollo: {
          loading: false
        }
      }
    })

    wrapper.setData({
      ...data()
    })

    await flushPromises()

    expect(wrapper.text().includes('Nenhum endereço selecionado.')).toBe(true)

    wrapper.destroy()
  })

  it('should show a no poc state if none poc is returned', async () => {
    const wrapper = mount(ProductsPage, {
      localVue,
      store: store(),
      router: router(),
      mocks: {
        $apollo: {
          loading: false
        }
      }
    })

    wrapper.setData({
      ...data(false)
    })

    await flushPromises()

    expect(
      wrapper
        .text()
        .includes('Desculpe, mas não atendemos nessa área ainda... :(')
    ).toBe(true)

    wrapper.destroy()
  })

  it('should show a no products state if poc.products is empty', async () => {
    const wrapper = mount(ProductsPage, {
      localVue,
      store: store(),
      router: router(),
      mocks: {
        $apollo: {
          loading: false
        }
      }
    })

    wrapper.setData({
      ...data(true, false)
    })

    await flushPromises()

    expect(wrapper.text().includes('Nenhum produto encontrado! :(')).toBe(true)

    wrapper.destroy()
  })

  it('should categorize and sort products', async () => {
    const wrapper = mount(ProductsPage, {
      localVue,
      store: store(),
      router: router(),
      mocks: {
        $apollo: {
          loading: false
        }
      }
    })

    wrapper.setData({
      ...data()
    })

    await flushPromises()

    const expectedData = {
      Cervejas: [
        { title: 'Skol 269ml - Pack com 15 Unidades' },
        { title: 'Skol 269ml - Unidade' }
      ],
      'Não Alcóolicos': [{ title: 'Guaraná 350ml - Pack com 12 Unidades' }],
      Outros: [{ title: 'Brahma 269ml - Unidade' }]
    }

    expect(wrapper.vm.categorizedProducts).toMatchObject(expectedData)

    wrapper.destroy()
  })
})
