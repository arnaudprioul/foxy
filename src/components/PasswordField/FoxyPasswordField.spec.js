import { mount } from '@vue/test-utils'
import Foxypasswordfield from './FoxyPasswordField.vue'

describe('Spec Foxypasswordfield', function () {
  it('mounts', () => {
    const wrapper = mount(Foxypasswordfield)
    expect(wrapper)
        .toBeTruthy()
  })
})
