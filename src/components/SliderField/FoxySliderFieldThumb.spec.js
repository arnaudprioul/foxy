import { mount } from '@vue/test-utils'
import Foxysliderthumb from './FoxySliderFieldFieldThumb.vue'

describe('Spec Foxysliderthumb', function () {
  it('mounts', () => {
    const wrapper = mount(Foxysliderthumb)
    expect(wrapper)
        .toBeTruthy()
  })
})
