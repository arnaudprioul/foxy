import { mount } from '@vue/test-utils'
import Foxydatatablegroupheaderrow from './FoxyDataTableGroupHeaderRow.vue'

describe('Spec Foxydatatablegroupheaderrow', function () {
  it('mounts', () => {
    const wrapper = mount(Foxydatatablegroupheaderrow)
    expect(wrapper)
        .toBeTruthy()
  })
})
