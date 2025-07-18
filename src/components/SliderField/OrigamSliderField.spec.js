import { mount } from '@vue/test-utils'
import Origamslider from './OrigamSliderField.vue'

describe('Spec Origamslider', function () {
	it('mounts', () => {
		const wrapper = mount(Origamslider)
		expect(wrapper)
			.toBeTruthy()
	})
})
