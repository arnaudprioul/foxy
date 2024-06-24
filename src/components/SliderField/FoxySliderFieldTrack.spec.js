import { mount } from '@vue/test-utils'
import Foxyslidertrack from './FoxySliderFieldFieldTrack.vue'

describe('Spec Foxyslidertrack', function () {
  it('mounts', () => {
    const wrapper = mount(Foxyslidertrack)
    expect(wrapper)
        .toBeTruthy()
  })
})
