import { mount } from '@vue/test-utils'
import Foxuidatatablecolumncell from './FoxuiDataTableColumnCell.vue'

describe('Spec Foxuidatatablecolumncell', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuidatatablecolumncell)
		expect(wrapper)
			.toBeTruthy()
	})
})
