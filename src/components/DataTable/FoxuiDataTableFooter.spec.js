import { mount } from '@vue/test-utils'
import Foxuidatatablefooter from './FoxuiDataTableFooter.vue'

describe('Spec Foxuidatatablefooter', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuidatatablefooter)
		expect(wrapper)
			.toBeTruthy()
	})
})
