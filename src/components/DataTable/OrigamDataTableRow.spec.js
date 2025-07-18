import { mount } from '@vue/test-utils'
import Origamdatatablerow from './OrigamDataTableRow.vue'

describe('Spec Origamdatatablerow', function () {
	it('mounts', () => {
		const wrapper = mount(Origamdatatablerow)
		expect(wrapper)
			.toBeTruthy()
	})
})
