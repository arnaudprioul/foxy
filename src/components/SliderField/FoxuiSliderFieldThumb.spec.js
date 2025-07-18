import { mount } from '@vue/test-utils'
import Foxuisliderfieldthumb from './FoxuiSliderFieldThumb.vue'

describe('Spec Foxuisliderfieldthumb', function () {
	it('mounts', () => {
		const wrapper = mount(Foxuisliderfieldthumb)
		expect(wrapper)
			.toBeTruthy()
	})
})
