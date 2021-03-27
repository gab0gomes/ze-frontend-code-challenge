import { shallowMount, createLocalVue } from '@vue/test-utils'

import Header from '../index'

const localVue = createLocalVue()

describe('HeaderComponent', () => {
  it('render correctly', async () => {
    const wrapper = shallowMount(Header, {
      localVue
    })

    expect(wrapper.element).toMatchSnapshot()

    wrapper.destroy()
  })
})
