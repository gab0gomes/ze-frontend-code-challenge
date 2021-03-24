import { mount, createLocalVue } from '@vue/test-utils'

import Foo from '../index'

const localVue = createLocalVue()

describe('Foo', () => {
  it('render correctly', async () => {
    const wrapper = mount(Foo, { localVue })

    expect(wrapper.element).toMatchSnapshot()

    wrapper.destroy()
  })
})
