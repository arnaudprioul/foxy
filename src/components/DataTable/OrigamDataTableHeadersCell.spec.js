import { mount } from '@vue/test-utils'
import Origamdatatableheaderscell from './OrigamDataTableHeadersCell.vue'

describe('Spec Origamdatatableheaderscell', function () {
	it('mounts', () => {
		const wrapper = mount(Origamdatatableheaderscell)
		expect(wrapper)
			.toBeTruthy()
	})
})
