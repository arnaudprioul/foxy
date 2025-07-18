import { mount } from '@vue/test-utils'
import Foxydatatablefooter from './FoxyDataTableFooter.vue'

describe('Spec Foxydatatablefooter', function () {
	it('mounts', () => {
		const wrapper = mount(Foxydatatablefooter)
		expect(wrapper)
			.toBeTruthy()
	})
})
