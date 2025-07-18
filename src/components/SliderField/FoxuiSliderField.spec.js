import { mount } from '@vue/test-utils'
import Foxuislider from './FoxuiSliderField.vue'

describe('Spec Foxuislider', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuislider)
		expect(wrapper)
			.toBeTruthy()
	})
})
