import { mount } from '@vue/test-utils'
import Foxydatatableheaders from './FoxyDataTableHeaders.vue'

describe('Spec Foxydatatableheaders', function () {
  it('mounts', () => {
    const wrapper = mount(Foxydatatableheaders)
    expect(wrapper)
        .toBeTruthy()
  })
})
