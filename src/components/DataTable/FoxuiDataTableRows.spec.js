import { mount } from '@vue/test-utils'
import Foxuidatatablerows from './FoxuiDataTableRows.vue'

describe('Spec Foxuidatatablerows', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuidatatablerows)
		expect(wrapper)
			.toBeTruthy()
	})
})
