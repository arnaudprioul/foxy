import { mount } from '@vue/test-utils'
import Foxydatatableheaderscell from './FoxyDataTableHeadersCell.vue'

describe('Spec Foxydatatableheaderscell', function () {
	it('mounts', () => {
		const wrapper = mount(Foxydatatableheaderscell)
		expect(wrapper)
			.toBeTruthy()
	})
})
