import { mount } from '@vue/test-utils'
import Foxydatatablerow from './FoxyDataTableRow.vue'

describe('Spec Foxydatatablerow', function () {
    it('mounts', () => {
        const wrapper = mount(Foxydatatablerow)
        expect(wrapper)
          .toBeTruthy()
    })
})
