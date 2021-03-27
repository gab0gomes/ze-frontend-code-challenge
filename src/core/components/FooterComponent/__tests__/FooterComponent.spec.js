import { shallowMount, createLocalVue } from '@vue/test-utils'

import Footer from '../index'

const localVue = createLocalVue()

describe('FooterComponent', () => {
  it('render correctly', async () => {
    const wrapper = shallowMount(Footer, {
      localVue
    })

    expect(wrapper.element).toMatchSnapshot()

    wrapper.destroy()
  })
})
