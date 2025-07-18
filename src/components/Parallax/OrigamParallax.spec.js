import { mount } from '@vue/test-utils'
import Origamparallax from './OrigamParallax.vue'

describe('Spec Origamparallax', function () {
	it('mounts', () => {
		const wrapper = mount(Origamparallax)
		expect(wrapper)
			.toBeTruthy()
	})
})
