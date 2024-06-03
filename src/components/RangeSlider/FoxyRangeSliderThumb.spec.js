import { mount } from '@vue/test-utils'
import Foxyrangesliderthumb from './FoxyRangeSliderThumb.vue'

describe('Spec Foxyrangesliderthumb', function () {
  it('mounts', () => {
    const wrapper = mount(Foxyrangesliderthumb)
    expect(wrapper)
        .toBeTruthy()
  })
})
