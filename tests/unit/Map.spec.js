import { shallowMount } from '@vue/test-utils'
import Map from '../../lib/components/Map.vue'

describe('Map.vue', () => {
  it('Map prop center', () => {
    const center = {
      lat: 34.734004,
      lng: 135.73660
    }
    const wrapper = shallowMount(Map, {
      propsData: { center }
    })
    expect(wrapper.find('.vue-google-map').exists()).toBe(true)
    expect(wrapper.vm.center).toBe(center)
  })
})
