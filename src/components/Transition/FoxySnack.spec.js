import { mount } from '@vue/test-utils'
import FoxySnack from './FoxySnack.vue'

describe('Spec Foxysnack', function () {
  it('mounts', () => {
    const wrapper = mount(FoxySnack)
    expect(wrapper)
        .toBeTruthy()
  })
})
