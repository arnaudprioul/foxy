import { mount } from '@vue/test-utils'
import Foxyparallaxelement from './FoxyParallaxElement.vue'

describe('Spec Foxyparallaxelement', function () {
  it('mounts', () => {
    const wrapper = mount(Foxyparallaxelement)
    expect(wrapper)
        .toBeTruthy()
  })
})
