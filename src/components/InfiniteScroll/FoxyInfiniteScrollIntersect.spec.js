import { mount } from '@vue/test-utils'
import Foxyinfinitescrollintersect from './FoxyInfiniteScrollIntersect.vue'

describe('Spec Foxyinfinitescrollintersect', function () {
  it('mounts', () => {
    const wrapper = mount(Foxyinfinitescrollintersect)
    expect(wrapper)
        .toBeTruthy()
  })
})
