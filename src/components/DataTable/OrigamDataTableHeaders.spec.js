import { mount } from '@vue/test-utils'
import Origamdatatableheaders from './OrigamDataTableHeaders.vue'

describe('Spec Origamdatatableheaders', function () {
	it('mounts', () => {
		const wrapper = mount(Origamdatatableheaders)
		expect(wrapper)
			.toBeTruthy()
	})
})
