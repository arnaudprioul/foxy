import { mount } from '@vue/test-utils'
import Foxyslider from './FoxySliderField.vue'

describe('Spec Foxyslider', function () {
	it('mounts', () => {
		const wrapper = mount(Foxyslider)
		expect(wrapper)
			.toBeTruthy()
	})
})
