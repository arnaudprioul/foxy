import { mount } from '@vue/test-utils'
import Origamdatatablegroupheaderrow from './OrigamDataTableGroupHeaderRow.vue'

describe('Spec Origamdatatablegroupheaderrow', function () {
	it('mounts', () => {
		const wrapper = mount(Origamdatatablegroupheaderrow)
		expect(wrapper)
			.toBeTruthy()
	})
})
