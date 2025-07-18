import { mount } from '@vue/test-utils'
import Foxuiparallax from './FoxuiParallax.vue'

describe('Spec Foxuiparallax', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuiparallax)
		expect(wrapper)
			.toBeTruthy()
	})
})
