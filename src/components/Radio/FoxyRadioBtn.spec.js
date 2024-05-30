import { mount } from '@vue/test-utils'
import Foxyradiobtn from './FoxyRadioBtn.vue'

describe('Spec Foxyradiobtn', function () {
  it('mounts', () => {
    const wrapper = mount(Foxyradiobtn)
    expect(wrapper)
        .toBeTruthy()
  })
})
