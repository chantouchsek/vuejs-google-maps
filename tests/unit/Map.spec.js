import { shallowMount } from '@vue/test-utils'
import Map from './lib/components/Map.vue'

describe('Map.vue', () => {
  it.skip('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Map, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
