import { mount } from '@vue/test-utils'
import Foxyrangeslidertrack from './FoxyRangeSliderTrack.vue'

describe('Spec Foxyrangeslidertrack', function () {
  it('mounts', () => {
    const wrapper = mount(Foxyrangeslidertrack)
    expect(wrapper)
        .toBeTruthy()
  })
})
