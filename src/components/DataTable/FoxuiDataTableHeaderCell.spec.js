import { mount } from '@vue/test-utils'
import Foxuidatatableheadercell from './FoxuiDataTableHeaderCell.vue'

describe('Spec Foxuidatatableheadercell', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuidatatableheadercell)
		expect(wrapper)
			.toBeTruthy()
	})
})
