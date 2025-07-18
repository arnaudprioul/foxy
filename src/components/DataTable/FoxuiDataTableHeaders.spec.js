import { mount } from '@vue/test-utils'
import Foxuidatatableheaders from './FoxuiDataTableHeaders.vue'

describe('Spec Foxuidatatableheaders', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuidatatableheaders)
		expect(wrapper)
			.toBeTruthy()
	})
})
