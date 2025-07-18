import { mount } from '@vue/test-utils'
import Origamdatatableheadercell from './OrigamDataTableHeaderCell.vue'

describe('Spec Origamdatatableheadercell', function () {
	it('mounts', () => {
		const wrapper = mount(Origamdatatableheadercell)
		expect(wrapper)
			.toBeTruthy()
	})
})
