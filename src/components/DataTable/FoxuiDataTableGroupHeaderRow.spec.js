import { mount } from '@vue/test-utils'
import Foxuidatatablegroupheaderrow from './FoxuiDataTableGroupHeaderRow.vue'

describe('Spec Foxuidatatablegroupheaderrow', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuidatatablegroupheaderrow)
		expect(wrapper)
			.toBeTruthy()
	})
})
