import { mount } from '@vue/test-utils'
import Origamdatatablerows from './OrigamDataTableRows.vue'

describe('Spec Origamdatatablerows', function () {
	it('mounts', () => {
		const wrapper = mount(Origamdatatablerows)
		expect(wrapper)
			.toBeTruthy()
	})
})
