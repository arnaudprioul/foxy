import { mount } from '@vue/test-utils'
import Foxydatatableheadercell from './FoxyDataTableHeaderCell.vue'

describe('Spec Foxydatatableheadercell', function () {
	it('mounts', () => {
		const wrapper = mount(Foxydatatableheadercell)
		expect(wrapper)
			.toBeTruthy()
	})
})
