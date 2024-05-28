import { mount } from '@vue/test-utils'
import Foxyform from './FoxyForm.vue'

describe('Spec Foxyform', function () {
  it('mounts', () => {
    const wrapper = mount(Foxyform)
    expect(wrapper)
        .toBeTruthy()
  })
})
