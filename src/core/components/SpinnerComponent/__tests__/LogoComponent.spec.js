import { mount, createLocalVue } from '@vue/test-utils'

import Spinner from '../index'

const localVue = createLocalVue()

describe('SpinnerComponent', () => {
  it('render correctly', async () => {
    const wrapper = mount(Spinner, {
      localVue
    })

    expect(wrapper.element).toMatchSnapshot()

    wrapper.destroy()
  })
})
