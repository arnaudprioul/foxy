import { mount } from '@vue/test-utils'
import Foxydatatablecolumncell from './FoxyDataTableColumnCell.vue'

describe('Spec Foxydatatablecolumncell', function () {
  it('mounts', () => {
    const wrapper = mount(Foxydatatablecolumncell)
    expect(wrapper)
        .toBeTruthy()
  })
})
