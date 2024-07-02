import { mount } from '@vue/test-utils'
import Foxyparallaxcontainer from './FoxyParallax.vue'

describe('Spec Foxyparallaxcontainer', function () {
  it('mounts', () => {
    const wrapper = mount(Foxyparallaxcontainer)
    expect(wrapper)
        .toBeTruthy()
  })
})
