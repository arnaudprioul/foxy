import { mount } from '@vue/test-utils'
import Origamdatatablefooter from './OrigamDataTableFooter.vue'

describe('Spec Origamdatatablefooter', function () {
	it('mounts', () => {
		const wrapper = mount(Origamdatatablefooter)
		expect(wrapper)
			.toBeTruthy()
	})
})
