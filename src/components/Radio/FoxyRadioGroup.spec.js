import { mount } from '@vue/test-utils'
import Foxyradiogroup from './FoxyRadioGroup.vue'

describe('Spec Foxyradiogroup', function () {
  it('mounts', () => {
    const wrapper = mount(Foxyradiogroup)
    expect(wrapper)
        .toBeTruthy()
  })
})
