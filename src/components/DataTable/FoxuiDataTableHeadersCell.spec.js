import { mount } from '@vue/test-utils'
import Foxuidatatableheaderscell from './FoxuiDataTableHeadersCell.vue'

describe('Spec Foxuidatatableheaderscell', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuidatatableheaderscell)
		expect(wrapper)
			.toBeTruthy()
	})
})
