import { mount } from '@vue/test-utils'
import Foxuidatatablerow from './FoxuiDataTableRow.vue'

describe('Spec Foxuidatatablerow', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuidatatablerow)
		expect(wrapper)
			.toBeTruthy()
	})
})
