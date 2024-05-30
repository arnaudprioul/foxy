import { mount } from '@vue/test-utils'
import Foxyselectioncontrolgroup from './FoxySelectionControlGroup.vue'

describe('Spec Foxyselectioncontrolgroup', function () {
  it('mounts', () => {
    const wrapper = mount(Foxyselectioncontrolgroup)
    expect(wrapper)
        .toBeTruthy()
  })
})
