import { mount } from '@vue/test-utils'
import Foxydatatablerows from './FoxyDataTableRows.vue'

describe('Spec Foxydatatablerows', function () {
    it('mounts', () => {
        const wrapper = mount(Foxydatatablerows)
        expect(wrapper)
          .toBeTruthy()
    })
})
