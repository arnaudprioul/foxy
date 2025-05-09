import { mount } from '@vue/test-utils'
import Foxyparallax from './FoxyParallax.vue'

describe('Spec Foxyparallax', function () {
	it('mounts', () => {
		const wrapper = mount(Foxyparallax)
		expect(wrapper)
			.toBeTruthy()
	})
})
